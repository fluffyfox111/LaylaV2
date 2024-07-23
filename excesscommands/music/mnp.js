const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mnp',
    description: 'Display the currently playing song',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        const track = player.queue.current;
        const embed = new EmbedBuilder()
            .setTitle('Now Playing')
            .setDescription(`🎶 | Now playing **${track.title}** by **${track.author}**`)
            .setColor('#FF00FF');

        message.channel.send({ embeds: [embed] });
    }
};
