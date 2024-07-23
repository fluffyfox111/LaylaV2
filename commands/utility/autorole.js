const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../database/autoroledb');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autorole')
    .setDescription('Manage the autorole feature')
    .addSubcommand(subcommand =>
      subcommand
        .setName('on')
        .setDescription('Turn on autorole')
        .addRoleOption(option => option.setName('role').setDescription('Role to assign').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('off')
        .setDescription('Turn off autorole'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),   
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('You do not have permission to use this command.');
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const subcommand = interaction.options.getSubcommand();
    const guildId = interaction.guild.id;

    if (subcommand === 'on') {
      const role = interaction.options.getRole('role');
      config.autorole[guildId] = {
        roleId: role.id,
        status: true
      };
      db.saveAutoRole(guildId, role.id, 1); // Save to the database with status 1 (true)
      interaction.reply(`Autorole has been enabled and set to ${role.name}.`);
    } else if (subcommand === 'off') {
      config.autorole[guildId] = {
        roleId: null,
        status: false
      };
      db.saveAutoRole(guildId, null, 0); // Save to the database with status 0 (false)
      interaction.reply('Autorole has been disabled.');
    }
  }
};
