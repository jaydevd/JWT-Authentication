import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBtTZxVIg3DoLTF1eqWpzeLNhYun8dQrG8",
    authDomain: "push-notification-1874a.firebaseapp.com",
    projectId: "push-notification-1874a",
    storageBucket: "push-notification-1874a.firebasestorage.app",
    messagingSenderId: "914824646317",
    appId: "1:914824646317:web:39d402ce3d81a67e2e8024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body
    });
});

// Add the public key generated from the console here.
// getToken(messaging, { vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0" });

export default function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // getToken(messaging, { vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0" }).then((currentToken) => {
            //     if (currentToken) {
            //         // Send the token to your server and update the UI if necessary
            //         console.log(currentToken);
            //         fetch("/api/send-notification", {

            //             // Adding method type
            //             method: "POST",

            //             // Adding body or contents to send
            //             body: JSON.stringify({
            //                 token: currentToken,
            //                 title: "New Notification",
            //                 body: "This is a test notification sent from server",
            //             }),

            //             // Adding headers to the request
            //             headers: {
            //                 "Content-type": "application/json; charset=UTF-8"
            //             }
            //         })
            //         // ...
            //     } else {
            //         // Show permission request UI
            //         console.log('No registration token available. Request permission to generate one.');
            //         // ...
            //     }
            // }).catch((err) => {
            //     console.log('An error occurred while retrieving token. ', err);
            //     // ...
            // });
        }
    })
}