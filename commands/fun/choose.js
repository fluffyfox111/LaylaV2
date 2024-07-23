const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choisir')
        .setDescription('Choisit aléatoirement un élément parmi les options fournies')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Options séparées par des virgules')
                .setRequired(true)),

    async execute(interaction) {
        let sender = interaction.user;
        let options;

        if (interaction.isCommand && interaction.isCommand()) {
            // Exécution de la commande slash
            options = interaction.options.getString('options').split(',');
        } else {
            // Exécution de la commande avec préfixe
            const message = interaction;
            sender = message.author;
            const args = message.content.split(' ');
            args.shift(); // Supprimer le nom de la commande
            options = args.join(' ').split(',');
        }

        // Nettoyer et traiter les options
        options = options.map(option => option.trim());

        // Choisir une option aléatoire
        let chosenOption;
        if (options.length === 1 && options[0].includes(' ')) {
            // Si les options sont fournies comme une seule chaîne séparée par des espaces
            options = options[0].split(' ');
            chosenOption = options[Math.floor(Math.random() * options.length)];
        } else {
            // Cas normal : les options sont déjà divisées en tableau
            chosenOption = options[Math.floor(Math.random() * options.length)];
        }

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Générateur de choix aléatoire')
            .setDescription(`**Options :** ${options.join(', ')}\n**Option choisie :** ${chosenOption}`)
            .setTimestamp();

        if (interaction.isCommand && interaction.isCommand()) {
            // Répondre à l'interaction de commande slash
            await interaction.reply({ embeds: [embed] });
        } else {
            // Répondre à l'interaction de commande avec préfixe
            await interaction.reply({ embeds: [embed] });
        }
    },
};
