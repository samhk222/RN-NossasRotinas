# Esse projeto está diferente

Não estou usando o expo, estou usando apenas

# Usuário e senha do Expo

Usuário: samhk222  
Senha: cE (sem arroba)

# Para gerar o build de produção

⚙️ Etapas para gerar o APK ou AAB no Expo

1. Tenha o Expo CLI instalado

Se ainda não tiver, instale com:

    npm install -g expo-cli

2. Faça login na sua conta Expo

   npx expo login

3. Configure o eas.json (se ainda não tiver feito)

Crie o arquivo eas.json na raiz do projeto com o seguinte conteúdo básico:

```JSON
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"  // ou "aab" se quiser gerar AAB para Play Store
      }
    }
  }
}
```

4. Inicie o build com o EAS (Expo Application Services)

Para gerar um APK (arquivo instalável manualmente):

    npx eas build -p android --profile production

Se quiser gerar um AAB (Android App Bundle, exigido pelo Google Play):

    npx eas build -p android --profile production

O buildType dentro do eas.json define se será APK ou AAB.

5. Espere o build terminar

O processo será feito na nuvem, e ao fim você verá um link para baixar o APK/AAB, como este:

✔ Build finished
🔗 Open this link to download the build: https://expo.dev/accounts/seu-usuario/projects/seu-projeto/builds/...

Você pode acompanhar o progresso pelo site: https://expo.dev/builds

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
