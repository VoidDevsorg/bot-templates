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
    console.log('Bot is ready!')
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

$.setCommand({
    name: "help",
    description: "Help",
    admin: false,
    run: async (client, interaction) => {
        return interaction.reply('help')
    }
});

$.init();

module.exports = $;