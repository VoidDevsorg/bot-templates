# @botcreator/empty

### Usage

```js
const Client = require('@botcreator/empty');
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
    options: [],
    run: async (client, interaction) => {
        return interaction.reply('help')
    }
});

$.init();
```
