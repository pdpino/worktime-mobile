import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import CategoryFormComponent from '../../components/categories/form';
import { upsertCategory, deleteCategory } from '../../redux/actions';
import { HeaderActions } from '../../shared/UI/headers';

class CategoryForm extends React.Component {
  static navigationOptions({ navigation }) {
    const category = navigation.getParam('category');
    if (category) {
      const actions = [
        {
          enabled: true,
          icon: 'delete',
          handlePress: navigation.getParam('handleDeleteCategory'),
        },
      ];

      return {
        title: category.name,
        headerRight: <HeaderActions actions={actions} />,
      };
    }

    return {
      title: 'New Category',
    };
  }

  constructor(props) {
    super(props);

    const { name, alias, description } = this.props.category || {};

    this.state = {
      name,
      alias,
      description,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCategory = this.handleSubmitCategory.bind(this);

    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);

    this.props.navigation.setParams({
      handleDeleteCategory: this.handleDeleteCategory,
    });
  }

  isInputValid() {
    const { name } = this.state;
    return name && name.trim();
  }

  handleChange(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  handleSubmitCategory() {
    if (!this.isInputValid()) {
      return;
    }

    const { name, alias, description } = this.state;
    const data = {
      name: name.trim(),
      alias: alias && alias.trim(),
      description: description && description.trim(),
    };

    if (this.props.category) {
      data.id = this.props.category.id;
    }

    this.props.upsertCategory(data);
    this.props.navigation.goBack();
  }

  handleDeleteCategory() {
    const { category } = this.props;
    if (!category) {
      return;
    }
    // DICTIONARY
    Alert.alert(
      'Confirmation',
      `Delete ${category.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            this.props.deleteCategory(category.id);
            this.props.navigation.goBack();
          },
        },
      ],
    );
  }

  render() {
    const { name, alias, description } = this.state;
    const canSubmit = this.isInputValid();

    return (
      <CategoryFormComponent
        name={name}
        alias={alias}
        description={description}
        onChangeName={this.handleChange('name')}
        onChangeAlias={this.handleChange('alias')}
        onChangeDescription={this.handleChange('description')}
        onSubmit={this.handleSubmitCategory}
        canSubmit={canSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  category: ownProps.navigation.getParam('category'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  upsertCategory,
  deleteCategory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
