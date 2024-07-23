const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Affiche des informations détaillées sur un salon')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon dont vous voulez obtenir des informations')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) {
            // Exécution de la commande slash
            const channel = interaction.options.getChannel('channel');

            const embed = new EmbedBuilder()
                .setColor('#3498db')
                .setAuthor({ 
                    name: "Informations sur le salon", 
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1256596058683736175/info.png?ex=668157c6&is=66800646&hm=dfa8e8b7b2500f1fc49aaf1de6ee8b9e17a6f824150742ee20e0a8475c63c935&" ,
                    url: "https://discord.gg/xQF9f9yUEM"
                })
                .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .setDescription(`
                    **Nom du salon :** ${channel.name}
                    **ID du salon :** ${channel.id}
                    **Type :** ${channel.type}
                    **Créé le :** ${channel.createdAt.toUTCString()}
                    **Sujet :** ${channel.topic || 'Aucun'}
                    **NSFW :** ${channel.nsfw ? 'Oui' : 'Non'}
                    **Position :** ${channel.position}
                    **Catégorie :** ${channel.parent ? channel.parent.name : 'Aucune'}
                `)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            // Exécution de la commande avec préfixe
            const channel = interaction.mentions.channels.first();

            if (!channel) {
                return interaction.reply('Veuillez mentionner un salon valide.');
            }

            const embed = new EmbedBuilder()
                .setColor('#3498db')
                .setAuthor({ 
                    name: "Informations sur le salon", 
                    iconURL: "https://cdn.discordapp.com/attachments/1246408947708072027/1256596058683736175/info.png?ex=668157c6&is=66800646&hm=dfa8e8b7b2500f1fc49aaf1de6ee8b9e17a6f824150742ee20e0a8475c63c935&" ,
                    url: "https://discord.gg/xQF9f9yUEM"
                })
                .setThumbnail(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .setDescription(`
                    **Nom du salon :** ${channel.name}
                    **ID du salon :** ${channel.id}
                    **Type :** ${channel.type}
                    **Créé le :** ${channel.createdAt.toUTCString()}
                    **Sujet :** ${channel.topic || 'Aucun'}
                    **NSFW :** ${channel.nsfw ? 'Oui' : 'Non'}
                    **Position :** ${channel.position}
                    **Catégorie :** ${channel.parent ? channel.parent.name : 'Aucune'}
                `)
                .setTimestamp();

            interaction.reply({ embeds: [embed] });
        }
    },
};
