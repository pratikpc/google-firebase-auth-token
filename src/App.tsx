import React from 'react';

import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import FirebaseUI from './FirebaseUI';

function App() {
  const [config, setConfig] = React.useState("");
  const [token, setToken] = React.useState("");
  const [reload, setReload] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);

  function Init() {
    try {
      setReload(false);
      console.log(config);
      const fb_config = JSON.parse(config);
      console.log("3", fb_config);
      firebase.initializeApp(fb_config);
      setReload(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <div>
        <h2>Firebase Config</h2>
        <textarea
          rows={5}
          cols={50}
          value={config}
          placeholder="Firebase Token"
          onChange={event => setConfig(event.target.value)} />
        <br />
        <button onClick={Init}>Check Config</button>
      </div>
      <div>
        {reload && <FirebaseUI uiconfig={{}} signedIn={setSignedIn} />}
      </div>
      <br />
      {
        firebase.apps.length !== 0 && signedIn ?
          <div>
            <div>
              Your Email is {firebase.auth().currentUser?.email}
            </div>
            <br />
            <button onClick={async () => {
              const token = await firebase.auth().currentUser?.getIdToken()!;
              setToken(token);
            }}>
              Get Token
        </button>
            <br />
            <textarea
              rows={5}
              cols={50}
              value={token}
              readOnly={true}
            />
          </div>
          : <div />
      }
    </div>
  );
}

export default App;
