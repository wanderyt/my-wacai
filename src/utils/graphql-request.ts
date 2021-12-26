import Axios, { AxiosError, AxiosResponse } from 'axios';

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
    (err: AxiosError) => {
      console.log('sendGraphqlRequest error: ', err);
      throw err.response;
    }
  );
};

export { sendGraphqlRequest };
