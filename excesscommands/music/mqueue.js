module.exports = {
    name: 'mqueue',
    description: 'Display the current music queue',
    async execute(message) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        const queue = player.queue;
        if (!queue.size) return message.reply('The queue is currently empty.');

        let queueString = '';
        for (let i = 0; i < queue.length; i++) {
            queueString += `${i + 1}. ${queue[i].title} - ${queue[i].author}\n`;
        }

        message.channel.send(`**Current Queue:**\n${queueString}`);
    }
};
