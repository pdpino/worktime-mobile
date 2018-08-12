import React, { Component } from 'react';
import MenuComponent from '../components/Menu';

const options = [
  {
    key: 'subjects',
    title: 'Manage Subjects', // DICTIONARY
  },
  {
    key: 'workSelectSubject',
    title: 'Work', // DICTIONARY
  },
];

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handlePressOption = this.handlePressOption.bind(this);
  }

  handlePressOption(key) {
    const { navigation } = this.props;
    navigation.navigate(key);
  }

  render() {
    return (
      <MenuComponent
        options={options}
        onPressOption={this.handlePressOption}
      />
    );
  }
}

export default Menu;
