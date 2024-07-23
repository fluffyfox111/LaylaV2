const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const anime = require('anime-actions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bully')
        .setDescription('Intimider quelqu\'un !')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('L\'utilisateur à intimider')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
            // Exécution de la commande slash
            const sender = interaction.user;
            const bulliedUser = interaction.options.getUser('user');
            const bullyGif = await anime.bully();

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setDescription(`${sender} intimide ${bulliedUser} ! 😡`)
                .setImage(bullyGif)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            // Exécution de la commande avec préfixe
            const sender = interaction.author;
            const targetUser = interaction.mentions.users.first();
            const bullyGif = await anime.bully();

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setDescription(`${sender} intimide ${targetUser || 'l\'air'} ! 😡`)
                .setImage(bullyGif);

            interaction.reply({ embeds: [embed] });
        }
    },
};
