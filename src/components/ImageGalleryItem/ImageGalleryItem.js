import React from 'react';
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, onClick, id }) => {
  const getId = event => {
    onClick(event.target.id);
  };
  return (
    <ImageGalleryItemStyled onClick={getId}>
      <ImageGalleryItemImage src={webformatURL} alt="" id={id} />
    </ImageGalleryItemStyled>
  );
};
