const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    description: 'play {args}',
    async execute(client, message, args) {
        if (!args) {return message.channel.send("Args cannot be empty!")};
        if (!message.member.voice) {return message.channel.send("You're not in a voice channel!")};

        const player = client.Music.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
            volume: 50
        });
        
        const res = await player.search(
            args.join(' '),
            message.author
        );

        if (player.state != 'CONNECTED') { await player.connect();}

        const embed = new MessageEmbed();
        
        if (res.loadType == 'LOAD_FAILED') {
            if (!player.queue.current) {player.destroy()};
            message.reply("There was an error occured during loading track.");
        } else if (res.loadType == 'NO_MATCHES') {
            if (!player.queue.current) {player.destroy()};
            message.reply("No result found.");
        } else if (res.loadType = 'TRACK_LOADED') {
            player.queue.add(res.tracks[0]);

            embed.setDescription(`Enqueuing [${res.tracks[0].title}](${res.tracks[0].uri})`)
                
            if (!player.playing && !player.queue.size) {player.play()};
            message.channel.send(embed);
        } else if (res.loadType = 'PLAYLIST_LOADED') {
            player.queue.add(res.tracks);

            embed.setDescription(`Enqueuing [${res.playlist.name}](${res.playlist.uri}) with total tracks of ${res.tracks.length}`);
                
            if (!player.playing && player.queue.totalSize === res.tracks.length) {player.play()};
            message.channel.send(embed);
        }
    }
};