import { Component } from 'react';
import { getImages } from 'services/pixabay-api';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Notify } from 'notiflix';
import { Loader, Relative } from 'components/Loader/Loader.styled';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'wait',
    page: 1,
  };

  statusChage(value) {
    this.setState({ status: value });
  }

  handlePage = () => {
    this.setState(prev => {
      return {
        page: prev.page + 1,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const images = await getImages(this.props.searchValue, this.state.page);
    if (images.length === 0 && this.state.status !== 'error') {
      this.statusChage('error');
      Notify.failure('Input correct value');
    } else {
      if (prevProps.searchValue !== this.props.searchValue) {
        this.statusChage('load');
        this.setState({ images: images });
        this.statusChage('ready');
      }
      if (prevState.page !== this.state.page) {
        this.statusChage('load');
        this.setState(prev => ({ images: [...prev.images, ...images] }));
        this.statusChage('ready');
      }
    }
  }

  onClickImage = id => {
    this.props.setModalImage(
      this.state.images.find(img => Number(img.id) === Number(id)).largeImageURL
    );
  };

  render() {
    switch (this.state.status) {
      case 'wait':
        return (
          <Relative>
            <p>Search something</p>
          </Relative>
        );
      case 'load':
        return (
          <Relative>
            <Loader />
          </Relative>
        );
      case 'ready':
        return (
          <>
            <ImageList>
              {this.state.images.map(({ id, webformatURL }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  id={id}
                  onClick={this.onClickImage}
                />
              ))}
            </ImageList>
            <Button onClick={this.handlePage} />
          </>
        );
      case 'error':
        <Relative>
          <p>Search something</p>
        </Relative>;
    }
  }
}
