module.exports = {
    name: 'mvolume',
    description: 'Adjust the volume of the music',
    async execute(message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply('No music is currently being played in this guild.');

        if (!args[0]) return message.reply(`Current volume is ${player.volume}`);
        if (isNaN(args[0])) return message.reply('Please provide a valid number.');

        const volume = Math.max(Math.min(parseInt(args[0]), 100), 0);
        player.setVolume(volume);
        message.reply(`Volume set to ${volume}`);
    }
};
