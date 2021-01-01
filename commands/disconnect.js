const { MessageEmbed } = require("discord.js");

module.exports = {
    name:"disconnect",
    description: "Disconnect from the VC even when queue is not empty",
    aliases: ['dc'],
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);

        const embed = new MessageEmbed()
            .setDescription("Diconnected on request.")
            .setFooter(`Requested By: ${message.author.username}`, message.author.avatarURL())

        if (player) {
            await message.channel.send(embed)
            player.destroy();
        } else {
            embed.setDescription("404 Player Not Found.")
            await message.channel.send(embed)
        }
    }
}