import Axios from "axios"

type SendGraphqlRequestType<T> = (
  options: object,
  isQuery?: boolean
) => Promise<T>;

const sendGraphqlRequest: <T> (
  options: string,
  isQuery?: boolean
) => Promise<T> = (query = '{}', isQuery = true) => {
  return Axios.post(`/api/graphql`, {
    query,
  }).then(({data}) => {
    return data.data;
  }, (err) => {
    return err
  });
};

export {
  sendGraphqlRequest,
};
