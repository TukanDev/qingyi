const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').setContexts(0, 1, 2).setIntegrationTypes(1),
    async execute(interaction) {
        await interaction.reply({content: "Pong!", flags: MessageFlags.Ephemeral});
    },
};
