const antisetup = require('../antisetup.json');

const antiRaid = (client) => {
    const joinMap = new Map();
    console.log('\x1b[36m[ SÉCURITÉ ]\x1b[0m', '\x1b[32mSystème Anti-Raid Actif ✅\x1b[0m');
    client.on('guildMemberAdd', (member) => {
        const guild = member.guild;
        const settings = antisetup[guild.id]?.antiRaid;
        if (!settings?.enabled) return;

        const currentTime = Date.now();
        const newMembers = joinMap.get(guild.id) || [];

        newMembers.push({ id: member.id, joinedAt: currentTime });
        joinMap.set(guild.id, newMembers);

        const recentJoins = newMembers.filter(m => currentTime - m.joinedAt < settings.timeWindow);

        const logChannel = guild.channels.cache.get(antisetup[guild.id].logChannelId);

        if (recentJoins.length > settings.joinLimit) {
            recentJoins.forEach(async (m) => {
                const raidMember = guild.members.cache.get(m.id);
                if (raidMember) {
                    await raidMember[settings.action]('Anti-raid : Rejoindre rapidement');
                    logChannel?.send(`L'utilisateur ${raidMember.user.tag} a été expulsé/banni pour avoir rejoint rapidement.`);
                }
            });

            guild.owner.send('Une tentative de raid a été détectée et empêchée.');
        }
    });
};

module.exports = antiRaid;
