module.exports = {
    name: 'mpause',
    description: 'Pause the current song',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        player.pause(true);
        message.reply('Paused the current track.');
    }
};
