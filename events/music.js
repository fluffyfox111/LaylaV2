const { Manager } = require('erela.js');
const Spotify = require('erela.js-spotify');
const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = (client) => {
    client.manager = new Manager({
        nodes: [
            {
                host: config.music.lavalink.host,
                port: config.music.lavalink.port,
                password: config.music.lavalink.password,
                secure: config.music.lavalink.secure
            }
        ],
        plugins: [
            new Spotify({
                clientID: config.spotifyClientId,
                clientSecret: config.spotifyClientSecret
            })
        ],
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });

    client.manager.on('nodeConnect', node => {
        console.log(`\x1b[34m[ LAVALINK CONNECTION ]\x1b[0m Node connected: \x1b[32m${node.options.identifier}\x1b[0m`);
    });

    client.manager.on('nodeError', (node, error) => {
        if (error.message.includes('Unexpected op "ready"')) {
            return;
        }
        console.error(`\x1b[31m[ERROR]\x1b[0m Node \x1b[32m${node.options.identifier}\x1b[0m had an error: \x1b[33m${error.message}\x1b[0m`);
    });

    // client.manager.on('nodeRaw', (node, data) => {
    //     console.log('Raw data from node:', data);
    // });

    client.manager.on('trackStart', (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new EmbedBuilder()
            .setTitle('Now Playing')
            .setDescription(`🎶 | Now playing **${track.title}** by **${track.author}**`)
            .setColor('#FF00FF');
        channel.send({ embeds: [embed] });
    });

    client.manager.on('queueEnd', player => {
        const channel = client.channels.cache.get(player.textChannel);
        const embed = new EmbedBuilder()
            .setTitle('Queue Ended')
            .setDescription('The queue has ended.')
            .setColor('#FFFF00');
        channel.send({ embeds: [embed] });
        player.destroy();
    });

    client.on('raw', d => client.manager.updateVoiceState(d));

    client.once('ready', () => {
        console.log('\x1b[35m[ MUSIC 2 ]\x1b[0m', '\x1b[32mLavalink Music System Active ✅\x1b[0m');
        client.manager.init(client.user.id);
    });
};
