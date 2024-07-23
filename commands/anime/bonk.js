const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const anime = require('anime-actions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Donne un coup sur la tête à quelqu\'un !')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('L\'utilisateur à bonker')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
            // Exécution de la commande slash
            const sender = interaction.user;
            const bonkedUser = interaction.options.getUser('user');
            const bonkGif = await anime.bonk();

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setDescription(`${sender} donne un coup sur la tête à ${bonkedUser} ! 🤦‍♂️`)
                .setImage(bonkGif)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            // Exécution de la commande avec préfixe
            const sender = interaction.author;
            const targetUser = interaction.mentions.users.first();
            const bonkGif = await anime.bonk();

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setDescription(`${sender} donne un coup sur la tête à ${targetUser || 'l\'air'} ! 🤦‍♂️`)
                .setImage(bonkGif);

            interaction.reply({ embeds: [embed] });
        }
    },
};
