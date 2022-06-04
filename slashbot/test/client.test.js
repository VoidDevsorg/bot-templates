require('dotenv').config()

const { Intents } = require("discord.js");
const Client = require('../');

const $ = new Client({ 
    token: process.env.token,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

$.client.on('ready', () => {
    console.log('\n-[ Client Ready ]-')
    console.log(`(!): Logged as a ${$.client.user.username}#${$.client.user.discriminator}`)
    console.log(`(!): Developed with ❤️\ \ by clqu.`)
    console.log(`(!): Total ${$.commands.length} commands loaded.`)
    try {
        $.client.user.setPresence({
            activities: [
                {
                    name: `❤️ clqu`,
                    type: 'PLAYING'
                }
            ],
            status: 'ONLINE'
        });
    } catch (err) {
        console.error(err.message);
    };
});

console.log('-[ Commands Loading ]-')
$.commandLoader('./test/commands/', '.js', (cmd) => {
    console.log(`(!): ${cmd} command loaded.`)
});

$.init();

module.exports = $;