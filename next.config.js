require('dotenv').config()

module.exports = {
  env: {
    dbCharacters: 'https://ellies-quest.firebaseio.com/characters.json',
    dbEnemies: 'https://ellies-quest.firebaseio.com/monsters.json',
    dbItems: 'https://ellies-quest.firebaseio.com/items.json',
    debug: true,
    playAudio: false,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    dbUrl: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messageSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    appUrl: process.env.APP_URL,
  },
}
