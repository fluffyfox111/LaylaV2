module.exports = {
    name: 'mresume',
    description: 'Resume the paused song',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        player.pause(false);
        message.reply('Resumed the current track.');
    }
};
