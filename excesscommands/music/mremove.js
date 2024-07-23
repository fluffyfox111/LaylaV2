module.exports = {
    name: 'mremove',
    description: 'Remove a song from the queue by its index',
    async execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        const index = parseInt(args[0]);
        if (isNaN(index) || index < 1 || index > player.queue.size) {
            return message.reply('Please provide a valid track number.');
        }

        const removed = player.queue.remove(index - 1);
        message.reply(`Removed \`${removed[0].title}\` from the queue.`);
    }
};
