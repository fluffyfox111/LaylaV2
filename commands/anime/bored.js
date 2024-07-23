const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const anime = require('anime-actions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Action d\'ennui !'),
    async execute(interaction) {
        const sender = interaction.user;
        const boredGif = await anime.bored();

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setDescription(`${sender} s'ennuie ! 😐`)
            .setImage(boredGif)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
