import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryFormComponent from '../../components/categories/form';
import { upsertCategory, deleteCategory } from '../../redux/actions';
import { HeaderActions } from '../../shared/UI/headers';
import { alertDelete } from '../../shared/alerts';
import i18n from '../../shared/i18n';

export class CategoryForm extends React.Component {
  // HACK: default-color hardcoded
  static defaultColor = 'gray';

  constructor(props) {
    super(props);

    const {
      name, alias, description, color,
    } = this.props.category || {};

    this.state = {
      name,
      alias,
      description,
      color: color || CategoryForm.defaultColor,
    };

    this.handleChangeName = this.getChangeHandler('name');
    this.handleChangeAlias = this.getChangeHandler('alias');
    this.handleChangeDescription = this.getChangeHandler('description');
    this.handleChangeColor = this.getChangeHandler('color');
  }

  componentDidMount() {
    const deleteCategoryAction = {
      icon: 'delete',
      handlePress: this.handleDeleteCategory,
    };

    this.props.navigation.setOptions({
      headerRight: () => <HeaderActions actions={[deleteCategoryAction]} />,
    });
  }

  getChangeHandler = (key) => (value) => {
    this.setState({ [key]: value });
  }

  isInputValid = () => {
    const { name } = this.state;
    return name && name.trim();
  }

  handleSubmitCategory = () => {
    if (!this.isInputValid()) {
      return;
    }

    const {
      name, alias, description, color,
    } = this.state;
    const data = {
      name: name.trim(),
      alias: alias && alias.trim(),
      description: description && description.trim(),
      color: color || CategoryForm.defaultColor,
    };

    if (this.props.category) {
      data.id = this.props.category.id;
    }

    this.props.upsertCategory(data);
    this.props.navigation.goBack();
  }

  handleDeleteCategory = () => {
    const { category } = this.props;
    if (!category) {
      return;
    }
    alertDelete({
      title: i18n.t('deletion.deleteElementQuestion', {
        element: category.name,
      }),
      toastMessage: i18n.t('deletion.elementDeleted', {
        element: category.name,
      }),
      onDelete: () => {
        this.props.navigation.navigate('base-subjectsCollection');
        this.props.deleteCategory(category.id);
      },
    });
  }

  render() {
    const {
      name, alias, description, color,
    } = this.state;
    const canSubmit = this.isInputValid();

    return (
      <CategoryFormComponent
        name={name}
        alias={alias}
        description={description}
        color={color}
        onChangeName={this.handleChangeName}
        onChangeAlias={this.handleChangeAlias}
        onChangeDescription={this.handleChangeDescription}
        onChangeColor={this.handleChangeColor}
        onSubmit={this.handleSubmitCategory}
        canSubmit={canSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  category: ownProps.route.params && ownProps.route.params.category,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  upsertCategory,
  deleteCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
