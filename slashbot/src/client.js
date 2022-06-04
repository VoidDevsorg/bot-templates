const { Client, Intents, Message, MessageEmbed } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const glob = require('glob');
const fromDir = require('./fromDir');

module.exports.client = this.client;
module.exports.commands = this.commands;

module.exports = class ClquClient {
    /**
     * 
     * @param {string} token
     * @param {array} intents
     * 
     */
    constructor({ token, intents }) {
        if (!token || typeof token !== "string")
            throw new Error(`${moduleConfig.prefix}: [TOKEN_INVALID]: An invalid token was provided.`);
        if (!intents || !Array.isArray(intents))
            throw new Error(`${moduleConfig.prefix}: [INTENTS_INVALID]: An invalid intents was provided.`);
        this.token = token;
        this.commands = [];
        this.client = new Client({
            intents: intents
        });;
        global.config = this;
        return this;
    }

    init() {

        //------------------------------------------------------------------------------------//

        const rest = new REST({ version: "9" }).setToken(this.token);
        this.client.on("ready", () => {
            (async () => {
                try {
                    await rest.put(Routes.applicationCommands(this.client.user.id), {
                        body: await this.commands,
                    });
                } catch {};
            })();
        });

        this.client.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand()) return;
            let $command = this.commands.find(e => e.name === interaction.commandName);
            if($command) {
                $command.run(this.client, interaction)
            }
        });
        
        //------------------------------------------------------------------------------------//

        this.client.login(this.token);
    }

    commandLoader(startPath, extension, callback) {
        if(startPath.startsWith('../'))
            throw new Error(`${moduleConfig.prefix}: [PATH_INVALID]: Start path should start with ./ instead of ../`);

        fromDir(startPath, extension, (files) => {
            files.forEach((file) => {
                const $ = require(process.cwd()+'/'+file.split('./')[1]);
                callback($.name);
                this.setCommand($)
            })
        });
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