const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche des informations détaillées sur le serveur'),
    async execute(interaction) {
        const server = interaction.guild;
        const emojis = server.emojis.cache;
        const roles = server.roles.cache;
        const textChannels = server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
        const voiceChannels = server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
        const verificationLevels = ['Aucun', 'Faible', 'Moyen', 'Élevé', 'Très Élevé'];
        const defaultNotifications = ['Tous les Messages', 'Seulement les Mentions'];

        try {
            const owner = await server.members.fetch(server.ownerId);
            if (!owner) {
                throw new Error('Propriétaire du serveur non trouvé.');
            }

            const boosters = server.premiumSubscriptionCount;
            const boostLevel = server.premiumTier;

            const embed = new EmbedBuilder()
                .setColor('#FFFFFF')
                .setTitle('📊 Informations sur le Serveur')
                .setThumbnail(server.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .setDescription(`
                    **Nom du Serveur:** ${server.name}
                    **ID du Serveur:** ${server.id}
                    **Propriétaire:** ${owner.user.tag}
                    **Créé le:** ${server.createdAt.toUTCString()}
                    **Membres:** ${server.memberCount}
                    **Boosters:** ${boosters} (Niveau ${boostLevel})
                    **Émojis:** ${emojis.size} émojis
                    **Rôles:** ${roles.size} rôles
                    **Salons Textuels:** ${textChannels}
                    **Salons Vocaux:** ${voiceChannels}
                    **Niveau de Vérification:** ${verificationLevels[server.verificationLevel]}
                    **Notifications par Défaut:** ${defaultNotifications[server.defaultMessageNotifications]}
                `)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération des informations du serveur :', error);
            await interaction.reply('Une erreur est survenue lors de la récupération des informations du serveur.');
        }
    },
};
