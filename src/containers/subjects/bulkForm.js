import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BulkSubjectFormComponent from '../../components/subjects/bulkForm';
import { updateSubjects } from '../../redux/actions';
import { subjectsSliceSelector, categoriesSelector } from '../../redux/selectors';

export class BulkSubjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: -1,
    };
  }

  handleChangeCategory = (categoryId) => {
    this.setState({ categoryId });
  }

  handleSubmit = () => {
    const { subjects } = this.props;
    const { categoryId } = this.state;

    const subjectIds = subjects.map((subj) => subj.id);

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

const mapStateToProps = (state, { route }) => ({
  subjects: subjectsSliceSelector(state, {
    ids: route.params && route.params.subjectsIds,
  }),
  categories: categoriesSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateSubjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BulkSubjectForm);
