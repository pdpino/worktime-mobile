import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BulkSubjectFormComponent from '../../components/subjects/bulkForm';
import { updateSubjects } from '../../redux/actions';
import { categoriesSelector } from '../../redux/selectors';
import i18n from '../../shared/i18n';

class BulkSubjectForm extends React.Component {
  static navigationOptions() {
    return {
      title: i18n.t('entities.editSubjects'),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      categoryId: -1,
    };

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCategory(categoryId) {
    this.setState({ categoryId });
  }

  handleSubmit() {
    const { subjects } = this.props;
    const { categoryId } = this.state;

    const subjectIds = subjects.map(subj => subj.id);

    this.props.updateSubjects(subjectIds, { category: categoryId });
    this.props.navigation.goBack();
  }

  render() {
    const { categoryId } = this.state;
    const { subjects, categories } = this.props;

    return (
      <BulkSubjectFormComponent
        subjects={subjects}
        categoryId={categoryId}
        categories={categories}
        onChangeCategory={this.handleChangeCategory}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  subjects: ownProps.navigation.getParam('subjects'),
  categories: categoriesSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BulkSubjectForm);
