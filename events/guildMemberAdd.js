const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const welcomeMessage = require('../message.json');
function getOrdinalSuffix(number) {
    if (number === 11 || number === 12 || number === 13) {
        return 'th';
    }
    const lastDigit = number % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}
module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        console.log(`New member added: ${member.user.tag} in guild: ${member.guild.name}`);

        const guildId = member.guild.id;
        const settings = config.guilds[guildId];

        if (settings && settings.status) {
            const welcomeChannel = member.guild.channels.cache.get(settings.welcomeChannelId);
            if (welcomeChannel) {
               
                const memberCount = member.guild.memberCount;
                const suffix = getOrdinalSuffix(memberCount);
                const embed = new EmbedBuilder()
                    .setTitle(welcomeMessage.title)
                    .setDescription(welcomeMessage.description)
                    .setImage(welcomeMessage.image)
                    .setFooter({ text: welcomeMessage.footer, iconURL: welcomeMessage.footerURL })
                    .setColor(welcomeMessage.color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setAuthor({
                        name: welcomeMessage.authorName,
                        iconURL: welcomeMessage.authorIcon,
                        url: welcomeMessage.authorURL
                    })
                    .setTimestamp();

               
                    welcomeChannel.send({
                        content: `${member}! You are the **${memberCount}${suffix}** member of our server!`,
                        embeds: [embed]
                    });
            } else {
                console.log(`Welcome channel not found for guild: ${member.guild.name}`);
            }
        } else {
            console.log(`Welcome messages are disabled for guild: ${member.guild.name}`);
        }
    });
};
