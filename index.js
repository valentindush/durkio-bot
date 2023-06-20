require('dotenv').config()
const { App } = require('@slack/bolt')

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    port: process.env.PORT || 3000
})


app.message(':wave:', async ({ message, say }) => {
    // Handle only newly posted messages here
    if (message.subtype === undefined
        || message.subtype === 'bot_message'
        || message.subtype === 'file_share'
        || message.subtype === 'thread_broadcast') {
        await say(`Hello, <@${message.user}>`);
    }
});

const run = async () => {
    await app.start();
    console.log('⚡️ Bolt app is running!');
}

run()
