const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Affiche des informations détaillées sur un utilisateur')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('L\'utilisateur dont vous voulez obtenir les informations')
                .setRequired(false)),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        const roles = member.roles.cache.filter(role => role.name !== '@everyone');
        const highestRole = member.roles.highest;

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('👤 Informations sur l\'utilisateur')
            .setThumbnail(targetUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setDescription(`
                **Nom d'utilisateur :** ${targetUser.tag}
                **ID de l'utilisateur :** ${targetUser.id}
                **Inscrit sur Discord :** ${targetUser.createdAt.toUTCString()}
                **A rejoint le serveur :** ${member.joinedAt.toUTCString()}
                **Rôles :** ${roles.map(role => role.name).join(', ') || 'Aucun'}
                **Rôle le plus élevé :** ${highestRole.name}
                **Est un bot :** ${targetUser.bot ? 'Oui' : 'Non'}
            `)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
