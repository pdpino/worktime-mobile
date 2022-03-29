import React from 'react';
import { BackHandler, Vibration } from 'react-native';
import { getSelectionHeaderParams } from '../shared/UI/headers';

// FIXME:
// since react-navigation v6 upgrade (and all other libraries),
// this does not work as a hoc.
// It needs access to the array of "selectionActions" in the inner component **instance**,
// but can only access static properties of the inner component.
//
// Idea: transform this to a hook, to reuse all of this!
//
// In the meantime, copy this code into the inner component
export default function withItemSelection(Component) {
  class WithItemSelection extends React.Component {
    // static navigationOptions = ({ navigation }) => {
    //   const amountSelected = navigation.getParam('amountSelected', 0);
    //   if (amountSelected) {
    //     const actions = Component.getSelectionActions(
    //       navigation,
    //       amountSelected,
    //     );
    //     const handleUnselection = navigation.getParam('handleUnselection');

    //     return getSelectionHeaderParams({
    //       amountSelected,
    //       actions,
    //       handleUnselection,
    //     });
    //   }

    //   return Component.navigationOptions({ navigation });
    // }

    state = {
      selectedIds: {},
      amountSelected: 0,
    }

    componentDidMount() {
      this.addBackHandlerListener = this.props.navigation.addListener(
        'focus',
        () => BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      );

      this.removeBackHandlerListener = this.props.navigation.addListener(
        'blur',
        () => BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      );
    }

    componentDidUpdate(_prevProps, prevState) {
      const { amountSelected } = this.state;
      if (amountSelected && prevState.amountSelected === 0) {
        this.props.navigation.setOptions(getSelectionHeaderParams({
          amountSelected,
          actions: this.selectionActions, // required in child
          handleUnselection: this.handleUnselection,
        }));
      }
    }

    componentWillUnmount() {
      if (this.addBackHandlerListener) {
        this.addBackHandlerListener();
      }
      if (this.removeBackHandlerListener) {
        this.removeBackHandlerListener();
      }
    }

    getSelectionArray = () => {
      const { selectedIds } = this.state;
      return Object.keys(selectedIds).filter((id) => selectedIds[id]);
    }

    updateSelection = (selectedIds, amountSelected) => {
      this.setState({
        selectedIds,
        amountSelected,
      });
    }

    toggleSelection = (id) => {
      const { selectedIds, amountSelected } = this.state;
      const isSelected = selectedIds[id];
      const newAmountSelected = amountSelected + (isSelected ? -1 : 1);

      if (amountSelected === 0 && newAmountSelected === 1) {
        Vibration.vibrate(40);
      }

      this.updateSelection({
        ...selectedIds,
        [id]: !isSelected,
      }, newAmountSelected);
    }

    handleUnselection = () => {
      this.updateSelection({}, 0);
    }

    handleBackPress = () => {
      if (this.state.amountSelected > 0) {
        this.handleUnselection();
        return true;
      }
      return false;
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
