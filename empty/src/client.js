const { Client, Intents, Message, MessageEmbed } = require("discord.js");
const moduleConfig = require('../module.config.json');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports.client = this.client;

module.exports = class ClquClient {
    /**
     * 
     * @param {string} token
     * @param {object} fields
     * 
     */
    constructor({ token, intents }) {
        if (!token || typeof token !== "string")
            throw new Error(`${moduleConfig.prefix}: [TOKEN_INVALID]: An invalid token was provided.`);
        this.token = token;
        this.commands = [];
        this.client = new Client({
            intents: intents
        });;
        global.config = this;
        return this;
    }

    init() {

        function $(label) {
            if (this?.fields[label]) {
                return this.fields[label];
            } else if (moduleConfig.fields[label]) {
                return moduleConfig.fields[label];
            } else {
                return label;
            }
        };

        //------------------------------------------------------------------------------------//

        const rest = new REST({ version: "9" }).setToken(this.token);
        this.client.on("ready", () => {
            (async () => {
                try {
                    await rest.put(Routes.applicationCommands(this.client.user.id), {
                        body: await this.commands,
                    });
                    console.log(`${moduleConfig.prefix}: Total ${this?.commands?.length || 0} commands loaded.`)
                } catch { };
            })();
        });

        // =================================================================================== \\

        this.client.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand()) return;
            let $command = this.commands.find(e => e.name === interaction.commandName);
            if($command) {
                $command.run(this.client, interaction)
            }
        });
        //------------------------------------------------------------------------------------//

        this.client.on('ready', () => {
            console.log(`${moduleConfig.prefix}: Logged as a ${this.client.user.username}#${this.client.user.discriminator}`)
            console.log(`${moduleConfig.prefix}: Developed with ❤️\ \ by clqu.`)
        })
        this.client.login(this.token);
    }

    setCommand({ name, description, run, options }) {
        if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name))
            throw new Error(`${moduleConfig.prefix}: Command name is invalid. (${name})`);
        this.commands.push({
            name: name?.toLowerCase() ?? "invalidname",
            description: description ?? "n/a description",
            run: run ?? "interaction.reply('run function is empty')",
            options: options ?? []
        });
    }
}
