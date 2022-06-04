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

$.init();
```

### Command Loader
```js
// path, extension, callback
$.commandLoader('./test/commands/', '.js', (cmd) => {
    console.log(`(!): ${cmd} command loaded.`)
});
```

### Custom Loader
```js
const { fromDir } = require('@voiddevs.org/slashbot');

fromDir('./test/commands/', '.js', (files) => {
    files.forEach((file) => {
        const cmd = require(process.cwd()+'/'+file.split('./')[1]);
        console.log(`(!): ${cmd.name} command loaded.`)
        $.setCommand(cmd)
    })
});

```

### Set Command
```js
$.setCommand({
    name: "help",
    description: "Help",
    options: [],
    run: async (client, interaction) => {
        return interaction.reply('help')
    }
});
```

---
<h6 align="center">Developed with ❤️ by Void Development</h6>
