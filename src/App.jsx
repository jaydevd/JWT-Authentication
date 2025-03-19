import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import sendNotification from '../firebase-messaging-sw';
import './App.css';
import requestPermission from './firebaseConfig';

function App() {
  const [data, setData] = useState(0);

  return (
    <>
      <button className="btn btn-primary" onClick={requestPermission}>Enable Notification</button>
      <button className="btn btn-success" onClick={sendNotification}>Notify me</button>
    </>
  )
}

export default App;