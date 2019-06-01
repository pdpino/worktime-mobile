import React from 'react';
import getSelectionHeader from '../shared/UI/headers/selection';

export default function withItemSelection(Component) {
  class WithItemSelection extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const amountSelected = navigation.getParam('amountSelected', 0);
      if (amountSelected) {
        const actions = Component.getSelectionActions(navigation, amountSelected);
        const handleUnselection = navigation.getParam('handleUnselection');

        return getSelectionHeader({
          amountSelected,
          actions,
          handleUnselection,
        });
      }

      return Component.navigationOptions();
    }

    constructor(props) {
      super(props);

      this.selectedIds = {};
      this.amountSelected = 0;

      this.getSelectionArray = this.getSelectionArray.bind(this);
      this.toggleSelection = this.toggleSelection.bind(this);
      this.handleUnselection = this.handleUnselection.bind(this);

      this.props.navigation.setParams({
        handleUnselection: this.handleUnselection,
      });
    }

    getSelectionArray() {
      return Object.keys(this.selectedIds).filter(id => this.selectedIds[id]);
    }

    toggleSelection(id) {
      const isSelected = this.selectedIds[id];
      const newAmountSelected = this.amountSelected + (isSelected ? -1 : 1);

      this.selectedIds = {
        ...this.selectedIds,
        [id]: !isSelected,
      };
      this.amountSelected = newAmountSelected;
      this.props.navigation.setParams({ amountSelected: newAmountSelected });
    }

    handleUnselection() {
      this.props.navigation.setParams({ amountSelected: 0 });
      this.amountSelected = 0;
      this.selectedIds = {};
    }

    render() {
      return (
        <Component
          {...this.props}
          amountSelected={this.amountSelected}
          selection={this.selectedIds}
          getSelectionArray={this.getSelectionArray}
          toggleSelection={this.toggleSelection}
          clearSelection={this.handleUnselection}
        />
      );
    }
  }

  return WithItemSelection;
}
