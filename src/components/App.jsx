import { PureComponent } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { Notify } from 'notiflix';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends PureComponent {
  state = {
    searchValue: '',
    isOpenModal: false,
    modalImage: '',
  };
  onSubmitForm = value => {
    if (value.trim() !== '') {
      this.setState({ searchValue: value.toLowerCase() });
    } else {
      Notify.failure('Input something!');
    }
  };

  onToggleModal = () => {
    this.setState(prev => ({ isOpenModal: !prev.isOpenModal }));
  };

  setModalImage = img => {
    this.setState({ modalImage: img, isOpenModal: true });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSubmitForm} />
        <ImageGallery
          searchValue={this.state.searchValue}
          setModalImage={this.setModalImage}
        />
        {this.state.isOpenModal && (
          <Modal onToggleModal={this.onToggleModal}>
            <img src={this.state.modalImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
