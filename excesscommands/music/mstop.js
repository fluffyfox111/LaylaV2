module.exports = {
    name: 'mstop',
    description: 'Stop the music and clear the queue',
    async execute(message) {
        const player = message.client.manager.players.get(message.guild.id);

        if (!player || !player.queue.current) {
            return message.reply('No music is currently playing!');
        }

        player.destroy();
        message.reply('Stopped the music and cleared the queue.');
    }
};
