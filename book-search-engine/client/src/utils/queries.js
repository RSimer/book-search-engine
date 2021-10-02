import { gql } from '@apollo/client';


// put in username, email, saved books (bookId, authors, image, link, description, title), 
export const QUERY_PROFILES = gql`
  query UserBooks {
    profiles {
      bookId
    }
  }
`;