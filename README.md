# Odom

An electric vehicle mileage tracking application that doesn't use your location information and doesn't store any personal information.

At release, this app will only support Tesla. I will  work towards other EV providers after release.
Development has been paused on this repo since I no longer have access to a Tesla that I can test with.

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

1. Start the dev server

    ```bash
    ngrok http --host-header=localhost 8081
    ```

    - If you are prompted to create an ngrok account, follow the instructions to do so

1. Start the app in a separate terminal

    ```bash
    EXPO_PACKAGER_PROXY_URL=<YOUR-NGROK-URL> npx expo start --lan
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
