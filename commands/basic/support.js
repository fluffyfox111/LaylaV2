const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Serveur de support de ce bot'),
    async execute(interaction) {
        const supportServerLink = "https://discord.gg/aEHqZFTYGw";
        const githubLink = "https://github.com/fluffyfox111";
        const itchLink = "https://ny-the-fox.itch.io";
        const youtubeLink = "https://www.youtube.com/@ny-11195";

        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
                name: 'Serveur de Support',
                iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=6638ae28&is=66375ca8&hm=13e4a1b91a95b2934a39de1876e66c11711c7b30ac1a91c2a158f2f2ed1c2fc6&',
                url: 'https://discord.gg/aEHqZFTYGw'
            })
            .setDescription(`➡️ **Rejoignez notre serveur Discord pour du support et des mises à jour :**\n- Discord - ${supportServerLink}\n\n➡️ **Suivez-nous sur :**\n- GitHub - ${githubLink}\n- Itch - ${itchLink}\n- YouTube - ${youtubeLink}`)
            .setImage('https://cdn.discordapp.com/attachments/1229903388863365210/1263231796531691572/NY.png?ex=66997bca&is=66982a4a&hm=3ddfc1a4a6535233f32f3cf250a12611ba2fc461da543a973ccff31e654f6b0f&')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
