import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default function asModalWithButton(ButtonComponent, ModalComponent) {
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
      const { disabled } = this.props;

      return (
        <View style={{ flex: 0 }}>
          <TouchableOpacity
            style={{ flex: 0 }}
            disabled={disabled}
            onPress={this.openModal}
          >
            <ButtonComponent {...this.props} />
          </TouchableOpacity>
          <Modal
            isVisible={modalVisible}
            onBackButtonPress={this.closeModal}
            onBackdropPress={this.closeModal}
          >
            <ModalComponent
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
