const antisetup = require('../antisetup.json');

const antiLink = (client) => {
    const linkMap = new Map();
    console.log('\x1b[36m[ SÉCURITÉ ]\x1b[0m', '\x1b[32mSystème Anti-Lien Actif ✅\x1b[0m');
    client.on('messageCreate', (message) => {
        if (!message.guild) return;
        const settings = antisetup[message.guild.id]?.antiLink;
        if (!settings?.enabled) return;

        const { author, content, channel } = message;
        if (author.bot) return;

        const linkRegex = /https?:\/\/\S+/gi;
        const logChannel = message.guild.channels.cache.get(antisetup[message.guild.id].logChannelId);

        if (linkRegex.test(content)) {
            if (settings.mode === 'full') {
                message.delete();
                channel.send(`${author}, la publication de liens n'est pas autorisée !`);
                logChannel?.send(`L'utilisateur ${author.tag} a posté un lien et le message a été supprimé.`);
            } else if (settings.mode === 'partial') {
                const currentTime = Date.now();
                const lastLinkTime = linkMap.get(author.id) || 0;

                if (currentTime - lastLinkTime < settings.linkInterval) {
                    message.delete();
                    channel.send(`${author}, vous ne pouvez publier des liens que toutes les ${settings.linkInterval / 1000} secondes !`);
                    logChannel?.send(`L'utilisateur ${author.tag} a posté un lien trop tôt et le message a été supprimé.`);
                } else {
                    linkMap.set(author.id, currentTime);
                }
            }
        }
    });
};

module.exports = antiLink;
