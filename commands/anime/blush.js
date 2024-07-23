const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const anime = require('anime-actions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blush')
        .setDescription('Action de rougir !'),
    async execute(interaction) {
        const sender = interaction.user;
        const blushGif = await anime.blush();

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setDescription(`${sender} rougit ! ☺️`)
            .setImage(blushGif)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
