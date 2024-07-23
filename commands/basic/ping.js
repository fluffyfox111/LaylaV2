const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping!'),
    async execute(interaction) {
        const botLatency = Date.now() - interaction.createdTimestamp;


        const apiLatency = interaction.client.ws.ping;


        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Pong! 🏓')
            .setDescription(`Latence du Bot: ${botLatency}ms\nAPI Latence: ${apiLatency}ms`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
