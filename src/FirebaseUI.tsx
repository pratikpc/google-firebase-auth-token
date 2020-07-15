import React from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import * as firebaseui from 'firebaseui';

export default function FirebaseUI(props: {
    uiconfig: firebaseui.auth.Config,
    signedIn: (x: boolean) => void
  } = { uiconfig: {}, signedIn: () => { } }) {
    console.log(firebase.apps);
    if (firebase.apps.length === 0)
      return <div />;
    console.log(firebase.apps);
    // Configure FirebaseUI.
    const uiConfig: firebaseui.auth.Config = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => { props.signedIn(true); return false; }
      },
      ...props.uiconfig
    };
    return <div style={{ display: "inline-block", height: "50%", width: "70%" }}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>;
  
  }
  