import { Component } from 'react';
import { getImages } from 'services/pixabay-api';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader, Relative } from 'components/Loader/Loader.styled';
import { Button } from 'components/Button/Button';
export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'wait',
    page: 1,
    isLast: false,
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
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ isLast: false });
      this.statusChage('load');
      this.setState({ page: 1 });
      this.setState({
        images: (await getImages(this.props.searchValue, 1)).hits,
      });
      this.statusChage('ready');
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      const images = await getImages(this.props.searchValue, this.state.page);
      this.statusChage('load');
      this.setState(prev => {
        if ([...prev.images, ...images.hits].length === images.totalHits) {
          this.setState({ isLast: true });
        }
        return { images: [...prev.images, ...images.hits] };
      });
      this.statusChage('ready');
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
            {!this.state.isLast && <Button onClick={this.handlePage} />}
          </>
        );
      case 'error':
        <Relative>
          <p>Search something</p>
        </Relative>;
        break;
      default:
        console.log('Something went wrong');
    }
  }
}
