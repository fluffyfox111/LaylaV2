const db = require('../database/autoroledb');
const config = require('../config.json');

module.exports = (client) => {
    client.on('guildMemberAdd', async member => {
        const guildId = member.guild.id;

        db.getAutoRole(guildId, (settings) => {
            if (settings && settings.status) {
                const role = member.guild.roles.cache.get(settings.roleId);
                if (role) {
                    member.roles.add(role)
                        .then(() => console.log(`Assigned role ${role.name} to user ${member.user.tag}`))
                        .catch(err => console.log(`Failed to assign role: ${err}`));
                } else {
                    console.log(`Role not found for guild: ${member.guild.name}`);
                }
            } else {
                console.log(`Autorole is disabled for guild: ${member.guild.name}`);
            }
        });
    });
};
