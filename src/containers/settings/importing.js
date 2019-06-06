import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import { importFromJson } from '../../redux/actions';
import { subjectsSelector, profileSelector } from '../../redux/selectors';
import {
  ImportingComponent, FileInput, LoadingPreview, ImportPreview, SubjectsPreview,
} from '../../components/settings/importing';
import { openFileSelector, openJsonFile } from '../../services/sharing';
import { getPreviewSubjects, getImportableSubjects } from '../../shared/porting';
import { sortByName } from '../../shared/utils';

class Importing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      isLoadingPreview: false,
      device: null,
      subjectsPreview: null,
      selectedSubjects: null,
      isImporting: false,
    };

    this.incomingSubjects = null;

    this.handlePressFile = this.handlePressFile.bind(this);
    this.handlePressSubject = this.handlePressSubject.bind(this);
    this.handlePressImport = this.handlePressImport.bind(this);
  }

  displayPreviewError(errorText) {
    Alert.alert(
      'Error',
      errorText,
      [
        { text: 'Ok' },
      ],
    );
    this.setState({
      path: null,
      isLoadingPreview: false,
      device: null,
      subjectsPreview: null,
      selectedSubjects: null,
    });
  }

  handlePressFile() {
    const currentDevice = this.props.profile.deviceName;
    const { subjects } = this.props;

    // DICTIONARY
    openFileSelector('Files').then((path) => {
      if (!path) {
        return;
      }

      this.setState({ path, isLoadingPreview: true }, () => {
        openJsonFile(path).then((fileContent) => {
          if (!fileContent) {
            this.displayPreviewError('Not a JSON file');
            return;
          }

          if (!fileContent.device || !fileContent.subjects) {
            this.displayPreviewError('JSON file does not specify data');
            return;
          }

          if (fileContent.device === currentDevice) {
            this.displayPreviewError('Can\'t import data from the same device');
            return;
          }

          const subjectsPreview = sortByName(getPreviewSubjects(
            subjects,
            fileContent.subjects,
          ));

          const selectedSubjects = {};
          subjectsPreview.forEach((subject) => {
            selectedSubjects[subject.name] = true;
          });

          this.setState({
            isLoadingPreview: false,
            device: fileContent.device,
            subjectsPreview,
            selectedSubjects,
          });

          this.incomingSubjects = fileContent.subjects;
        });
      });
    });
  }

  handlePressSubject(subjectName) {
    this.setState(state => ({
      selectedSubjects: {
        ...state.selectedSubjects,
        [subjectName]: !state.selectedSubjects[subjectName],
      },
    }));
  }

  handlePressImport() {
    const { subjects } = this.props;
    const { device, selectedSubjects } = this.state;

    if (!this.incomingSubjects || !device) {
      return;
    }

    this.setState({ isImporting: true }, () => {
      getImportableSubjects(
        subjects,
        this.incomingSubjects,
        selectedSubjects,
        device,
      ).then((importableSubjects) => {
        this.props.importFromJson(device, importableSubjects);
        this.props.navigation.goBack();
      });
    });
  }

  render() {
    const {
      path, isLoadingPreview, device, subjectsPreview, selectedSubjects,
      isImporting,
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
          lastImportedTimestamp={knownDevices[device]}
        />
        <SubjectsPreview
          subjectsPreview={subjectsPreview}
          selectedSubjects={selectedSubjects}
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
