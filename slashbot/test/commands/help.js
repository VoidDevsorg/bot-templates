module.exports = {
    name: "help",
    description: "Help",
    options: [],
    run: async (client, interaction) => {
        return interaction.reply('help')
    }
}