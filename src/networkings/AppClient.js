import AxiosClient from './AxiosClient';
import {Platform} from 'react-native';

const axiosClient = AxiosClient.shared();

class AppClient {
  static userID = '';
  static userAccessToken = '';
  static defaultParams = {};

  static setup(userID, userAccessToken) {
    AppClient.userID = userID;
    AppClient.userAccessToken = userAccessToken;
    AppClient.defaultParams = {
      accessToken: AppClient.userAccessToken,
      os: Platform.OS,
    };
  }

  static sendAxiosRequest(
    axiosData,
    startRequest = () => {},
    endRequest = () => {},
  ) {
    return new Promise((resolve, reject) => {
      startRequest();
      axiosClient(axiosData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(Error(error.message));
        })
        .finally(endRequest());
    });
  }

  static sendFetchRequest(
    url,
    options = {},
    startRequest = () => {},
    endRequest = () => {},
  ) {
    return new Promise((resolve, reject) => {
      startRequest();
      fetch(url, {...options})
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        })
        .finally(endRequest());
    });
  }
}

export default AppClient;
