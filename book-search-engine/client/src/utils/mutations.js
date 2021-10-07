import { gql } from '@apollo/client';
// like writing routes
export const LOGIN_USER = gql`
  mutation loginUser($name: String!, $email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      name
      skills
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $description: String!, $bookId: String, $image: String, $link: String, $title: String!) {
    saveBook(bookId: $bookId, title: $title) {
      image
      bookId
      title
      description
      
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($authors: [String], $description: String!, $bookId: String, $image: String, $link: String, $title: String!) {
    removeBook(bookId: $bookId, title: $title) {
       image
      bookId
      title
      description
    }
  }
`;