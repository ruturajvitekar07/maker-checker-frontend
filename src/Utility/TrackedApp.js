// import track from 'react-tracking';
// import App from '../App';
// import UserAppService from '../Service/UserAppService';

// const localStorageToken = sessionStorage.getItem("access_token");
// const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

// const TrackedApp = track({
//   dispatch: (data) => {
//     // Send the tracking data to the backend using axios
//     console.log(data);
//     // UserAppService.setUsersActivities(data, header)
//     //   .then((response) => {
//     //     console.log(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   })
//   }
// })(App);

// export default TrackedApp;

import track from 'react-tracking';
import App from '../App';
import UserAppService from '../Service/UserAppService';

const localStorageToken = sessionStorage.getItem("access_token");
const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

const TrackedApp = track({
  dispatch: (data) => {
    // Send the tracking data to the backend using axios
    console.log(data);
    console.log(header);
    UserAppService.setUsersActivities(data, header)
      .then((response) => {
        console.log('Data sent to server');
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Data not sent to server'); 
        console.log(error);
      })
  }
})(App);

export default TrackedApp;

