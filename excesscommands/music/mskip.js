module.exports = {
    name: 'mskip',
    description: 'Skip the current song',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        console.log('Skipping track...');
        player.stop();

        if (player.queue.size > 0) {
            const nextTrack = player.queue[0];
            console.log(`Next track: ${nextTrack.title} by ${nextTrack.author}`);
        } else {
            console.log('No more tracks in the queue.');
        }

        message.reply('Skipped the current song.');
    }
};
