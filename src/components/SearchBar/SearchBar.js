import React from 'react';
import { Formik } from 'formik';
import {
  Header,
  Button,
  ButtonLabel,
  Placeholder,
  Input,
  FormStyled,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const initialValues = { query: '' };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.query);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <FormStyled>
          <Button type="submit">
            <ButtonLabel />
          </Button>
          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            as={Placeholder}
          />
        </FormStyled>
      </Formik>
    </Header>
  );
};

export default SearchBar;
