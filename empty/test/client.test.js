require('dotenv').config()

const Client = require('../');

const $ = new Client({ token: process.env.token });

$.client.on('ready', () => {
    console.log('Bot is ready!')
    $.client.on("ready", () => {
        try {
            client.user.setPresence({
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