import React from 'react';
import getSelectionHeaderParams from '../shared/UI/headers/selection';

export default function withItemSelection(Component) {
  class WithItemSelection extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const amountSelected = navigation.getParam('amountSelected', 0);
      if (amountSelected) {
        const actions = Component.getSelectionActions(
          navigation,
          amountSelected,
        );
        const handleUnselection = navigation.getParam('handleUnselection');

        return getSelectionHeaderParams({
          amountSelected,
          actions,
          handleUnselection,
        });
      }

      return Component.navigationOptions();
    }

    constructor(props) {
      super(props);

      this.state = {
        selectedIds: {},
        amountSelected: 0,
      };

      this.getSelectionArray = this.getSelectionArray.bind(this);
      this.toggleSelection = this.toggleSelection.bind(this);
      this.handleUnselection = this.handleUnselection.bind(this);

      this.props.navigation.setParams({
        handleUnselection: this.handleUnselection,
      });
    }

    getSelectionArray() {
      const { selectedIds } = this.state;
      return Object.keys(selectedIds).filter(id => selectedIds[id]);
    }

    updateSelection(selectedIds, amountSelected) {
      this.setState({
        selectedIds,
        amountSelected,
      });
      this.props.navigation.setParams({ amountSelected });
    }

    toggleSelection(id) {
      const { selectedIds, amountSelected } = this.state;
      const isSelected = selectedIds[id];
      const newAmountSelected = amountSelected + (isSelected ? -1 : 1);

      this.updateSelection({
        ...selectedIds,
        [id]: !isSelected,
      }, newAmountSelected);
    }

    handleUnselection() {
      this.updateSelection({}, 0);
    }

    render() {
      const { selectedIds, amountSelected } = this.state;

      return (
        <Component
          {...this.props}
          amountSelected={amountSelected}
          selection={selectedIds}
          getSelectionArray={this.getSelectionArray}
          toggleSelection={this.toggleSelection}
          clearSelection={this.handleUnselection}
        />
      );
    }
  }

  return WithItemSelection;
}
