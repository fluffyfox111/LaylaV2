module.exports = {
    name: 'mplay',
    description: 'Play a song from YouTube or Spotify',
    async execute(message, args) {
        const { channel } = message.member.voice;

        if (!channel) return message.reply('You need to join a voice channel first!');
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.reply('I cannot connect to your voice channel, make sure I have the proper permissions!');
        if (!permissions.has('SPEAK')) return message.reply('I cannot speak in this voice channel, make sure I have the proper permissions!');

        const player = message.client.manager.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id,
        });

        if (player.state !== 'CONNECTED') player.connect();

        const search = args.join(' ');
        let res;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw new Error(res.exception.message);
            }
        } catch (err) {
            return message.reply(`There was an error while searching: ${err.message}`);
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return message.reply('No results found!');
            case 'TRACK_LOADED':
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused && !player.queue.size) player.play();
                return message.reply(`Enqueuing \`${res.tracks[0].title}\`.`);
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
                return message.reply(`Enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
            case 'SEARCH_RESULT':
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused && !player.queue.size) player.play();
                return message.reply(`Enqueuing \`${res.tracks[0].title}\`.`);
        }
    }
};
