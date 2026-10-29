# ITBC Connect — настройка Firebase

1. Откройте https://console.firebase.google.com/ и создайте проект `ITBC-Connect`.
2. В обзоре нажмите `</>`, зарегистрируйте приложение `ITBC Connect Web` и скопируйте объект `firebaseConfig`.
3. В папке `connect` создайте файл `firebase-config.js` со значениями из консоли:
```js
window.ITBC_FIREBASE_CONFIG = {
 apiKey: "ЗНАЧЕНИЕ_ИЗ_FIREBASE",
 authDomain: "ВАШ_PROJECT_ID.firebaseapp.com",
 projectId: "ВАШ_PROJECT_ID",
 storageBucket: "ЗНАЧЕНИЕ_ИЗ_FIREBASE",
 messagingSenderId: "ЗНАЧЕНИЕ_ИЗ_FIREBASE",
 appId: "ЗНАЧЕНИЕ_ИЗ_FIREBASE"
};
```
4. Firebase Console → Build → Authentication → Get started → Sign-in method → включите Email/Password. Не включайте публичную регистрацию.
5. Firebase Console → Build → Firestore Database → Create database, выберите Production mode и подходящий регион.
6. В Firestore → Rules вставьте содержимое `firestore.rules` и нажмите Publish.
7. Создайте коллекцию `groups`. Документ с ID-кодом группы, например `SCA-25A`, должен содержать `name` (string, `SCA-25A`) и `active` (boolean, `true`). Добавьте остальные группы.
8. В Authentication → Users → Add user создайте аккаунт куратора. Скопируйте UID. В Firestore создайте документ `users` с ID, равным UID, и полями: `displayName` (string), `role` (string, `curator`), `groupId` (string, код группы), `active` (boolean, `true`). Для администратора роль `admin`.
9. После сохранения `firebase-config.js`, правил, групп и профиля откройте GitHub Pages и проверьте вход и отправку сообщения на втором устройстве.

Конфигурация веб-приложения Firebase не является паролем сервисного аккаунта. Не публикуйте пароль Google или приватные ключи. Не устанавливайте открытые правила `allow read, write: if true;`.

Эта версия реализует вход и общую ленту позитивных сообщений. Игровые вызовы и месячный рейтинг — следующий этап. Все кураторы могут читать общую ленту; приватных переписок нет.
