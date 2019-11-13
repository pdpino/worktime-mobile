import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { importFromJson } from '../../redux/actions';
import { subjectsSelector, profileSelector } from '../../redux/selectors';
import {
  ImportingComponent, FileInput, LoadingPreview, ImportPreview, SubjectsPreview,
} from '../../components/settings/importing';
import { openFileSelector, openJsonFile } from '../../services/sharing';
import { processSubjects, getImportableSubjects } from '../../shared/porting';
import { alertError } from '../../shared/alerts';

class Importing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      isLoadingPreview: false,
      device: null,
      importStats: null,
      processedSubjects: null,
      subjectsSelection: null,
      isImporting: false,
    };

    this.incomingRawSubjects = null;

    this.handlePressFile = this.handlePressFile.bind(this);
    this.handlePressSubject = this.handlePressSubject.bind(this);
    this.handlePressImport = this.handlePressImport.bind(this);
  }

  displayPreviewError(errorText) {
    alertError({ message: errorText });
    this.setState({
      path: null,
      isLoadingPreview: false,
      device: null,
      importStats: null,
      processedSubjects: null,
      subjectsSelection: null,
    });
  }

  handlePressFile() {
    const { subjects } = this.props;

    // DICTIONARY
    openFileSelector('Files').then((path) => {
      if (!path) {
        return;
      }

      this.setState({ path, isLoadingPreview: true }, async () => {
        const fileContent = await openJsonFile(path);
        if (!fileContent) {
          this.displayPreviewError('Not a JSON file');
          return;
        }

        if (!fileContent.device || !fileContent.subjects) {
          this.displayPreviewError('JSON file does not specify data');
          return;
        }

        const { metadata, processedSubjects } = await processSubjects(
          subjects,
          fileContent.subjects,
          null,
        );

        const subjectsSelection = {};
        processedSubjects.forEach(({ data }) => {
          subjectsSelection[data.name] = true;
        });

        this.setState({
          isLoadingPreview: false,
          device: fileContent.device,
          processedSubjects,
          subjectsSelection,
          importStats: metadata,
        });

        this.incomingRawSubjects = fileContent.subjects;
      });
    });
  }

  handlePressSubject(subjectName) {
    if (!this.incomingRawSubjects) {
      return;
    }

    const { subjects } = this.props;
    const { subjectsSelection } = this.state;

    const newSelectedSubjects = {
      ...subjectsSelection,
      [subjectName]: !subjectsSelection[subjectName],
    };

    this.setState({
      isLoadingPreview: true,
      subjectsSelection: newSelectedSubjects,
    }, async () => {
      const { metadata, processedSubjects } = await processSubjects(
        subjects,
        this.incomingRawSubjects,
        newSelectedSubjects,
      );

      this.setState({
        isLoadingPreview: false,
        processedSubjects,
        importStats: metadata,
      });
    });
  }

  handlePressImport() {
    const { device, processedSubjects, subjectsSelection } = this.state;

    if (!processedSubjects || !device) {
      return;
    }

    this.setState({ isImporting: true }, () => {
      const importableSubjects = getImportableSubjects(
        processedSubjects,
        subjectsSelection,
      );
      this.props.importFromJson(device, importableSubjects);
      this.props.navigation.goBack();
    });
  }

  render() {
    const {
      path, isLoadingPreview, device, importStats,
      processedSubjects, subjectsSelection, isImporting,
    } = this.state;
    const { knownDevices } = this.props.profile;

    return (
      <ImportingComponent
        isImporting={isImporting}
        onPressImport={this.handlePressImport}
        canPressImport={path && device}
      >
        <FileInput
          path={path}
          onPressFile={this.handlePressFile}
        />
        <LoadingPreview
          isLoadingPreview={isLoadingPreview}
        />
        <ImportPreview
          device={device}
          importStats={importStats}
          lastImportedTimestamp={knownDevices[device]}
        />
        <SubjectsPreview
          processedSubjects={processedSubjects}
          subjectsSelection={subjectsSelection}
          onPressSubject={this.handlePressSubject}
        />
      </ImportingComponent>
    );
  }
}

const mapStateToProps = state => ({
  subjects: subjectsSelector(state, { archived: 'all' }),
  profile: profileSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  importFromJson,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Importing);
