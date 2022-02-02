# AngularSocialNetworkWall Demo

This project was generated with:
                                        Angular: 12.1.2
                                        AngularFire: 6.1.5
                                        Firebase: 7.0 || 8.0

### Development server

1. Clone the project.

2. Run `npm install`

3. Create project in FireBase https://console.firebase.google.com/

4. Add Firebase config to environments variable

    Open /src/environments/environment.ts and add your Firebase configuration. You can find your project configuration in the Firebase Console. Click the Gear icon next to Project Overview, in the Your Apps section, create a new app and choose the type Web. Give the app a name and copy the config values provided.

    export const environment = {
      production: false,
      firebase: {
        apiKey: '<your-key>',
        authDomain: '<your-project-authdomain>',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>',
        messagingSenderId: '<your-messaging-sender-id>',
        appId: '<your-app-id>'
      }
    };

4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

5. Run mock-api in your terminal `json-server --watch mock-api/data.json`.
