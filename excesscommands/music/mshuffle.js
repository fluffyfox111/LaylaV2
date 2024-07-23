module.exports = {
    name: 'mshuffle',
    description: 'Shuffle the music queue',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        player.queue.shuffle();
        message.reply('Shuffled the queue.');
    }
};
