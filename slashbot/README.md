# @voiddevs.org/slashbot

### Usage

```js
const { Intents } = require("discord.js");
const Client = require('@voiddevs.org/slashbot');

const $ = new Client({ 
    token: process.env.token,
    intents: [
        Intents.FLAGS.GUILDS
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
    options: [],
    run: async (client, interaction) => {
        return interaction.reply('help')
    }
});

$.init();
```


---
<h6 align="center">Developed with ❤️ by Void Development</h6>
