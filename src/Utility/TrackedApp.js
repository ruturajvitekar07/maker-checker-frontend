import track from 'react-tracking';
import App from '../App';

const TrackedApp = track({
  dispatch: (data) => {
    // Send the tracking data to the backend using axios
    //   axios.post('/api/track', data);
    console.log(data);
  }
})(App);

export default TrackedApp;
