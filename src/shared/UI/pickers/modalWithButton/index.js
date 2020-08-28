import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import asOnlyVisible from './wrapper';

export default function asModalWithButton(
  ButtonComponent, ModalComponent, useVisibleWrapper = false,
) {
  const WrappedModel = useVisibleWrapper ? asOnlyVisible(ModalComponent) : ModalComponent;

  class AsModalWithButton extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        modalVisible: false,
      };

      this.setModalVisible = this.setModalVisible.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);
    }

    setModalVisible(modalVisible) {
      this.setState({ modalVisible });
    }

    closeModal() {
      this.setModalVisible(false);
    }

    openModal() {
      this.setModalVisible(true);
    }

    render() {
      const { modalVisible } = this.state;
      const { disabled, flex } = this.props;

      // HACK: hacky solution to pass flex as a prop.
      // If flex: 1, the button will use all the space available
      // If the container is oriented horizontally, flex should probably be 1
      // (see pickers/calendar)
      // If the container is oriented vertically, flex should probably be 0
      // (see work/subjectsPicker), otherwise it may use the whole height of
      // the screen.
      return (
        <View style={{ flex: flex || 0 }}>
          <TouchableOpacity
            style={{ flex: 0 }}
            disabled={disabled}
            onPress={this.openModal}
            delayPressIn={0}
          >
            <ButtonComponent {...this.props} />
          </TouchableOpacity>
          <Modal
            isVisible={modalVisible}
            onBackButtonPress={this.closeModal}
            onBackdropPress={this.closeModal}
          >
            <WrappedModel
              isVisible={modalVisible}
              closeModal={this.closeModal}
              {...this.props}
            />
          </Modal>
        </View>
      );
    }
  }

  return AsModalWithButton;
}
