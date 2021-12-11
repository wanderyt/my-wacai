import Axios from 'axios';

const buildRequestQuery = (query: string, isQuery: boolean): string => {
  return isQuery ? `{${query}}` : `mutation {${query}}`;
};

const sendGraphqlRequest: <T>(
  options: string,
  isQuery?: boolean
) => Promise<T> = (query = '', isQuery = true) => {
  return Axios.post(`/api/graphql`, {
    query: buildRequestQuery(query, isQuery),
  }).then(
    ({ data }) => {
      return data.data;
    },
    err => {
      return err;
    }
  );
};

export { sendGraphqlRequest };
