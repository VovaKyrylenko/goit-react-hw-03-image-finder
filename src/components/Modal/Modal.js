import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';

const portal = document.querySelector('#js-modal');

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose() {
    this.props.onToggleModal();
  }

  handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.handleClose();
    }
  }
  render() {
    console.log('this.props.onClose:', this.props);
    return createPortal(
      <Overlay className="overlay" onClick={this.handleClose}>
        <ModalStyled className="modal" onClick={e => e.stopPropagation()}>
          {this.props.children}
        </ModalStyled>
      </Overlay>,
      portal
    );
  }
}
