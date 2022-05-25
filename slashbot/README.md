# [@voiddevs.org/slashbot](https://npmjs.com/package/@voiddevs.org/slashbot)
[Do you need my help? Visit our Discord server.](https://voiddevs.org/discord)

![NPM Downloads](https://img.shields.io/npm/dm/@voiddevs.org/slashbot?style=for-the-badge)
![License](https://img.shields.io/npm/l/@voiddevs.org/slashbot?style=for-the-badge)

### Installation
```bash
npm i "@voiddevs.org/slashbot" --save
# or
yarn add "@voiddevs.org/slashbot"
```

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
