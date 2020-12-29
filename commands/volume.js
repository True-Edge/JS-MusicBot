module.exports = {
    name: "volume",
    description: "Control volume of music. Usage : (prefix)vol args",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);

        const volume = Number(args[0]);
        if (!volume || volume < 1 || volume > 100) { return message.reply("Volume cannot exceed 100 or below 0"); } else { player.setVolume(volume); return message.reply(`Volume set on ${volume} on request.`); }
    }
}