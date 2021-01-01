const { MessageEmbed } = require("discord.js");

module.exports = {
    name:"disconnect",
    description: "Disconnect from the VC even when queue is not empty",
    aliases: ['dc'],
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);

        const embed = new MessageEmbed()
            .setDescription("Diconnected on request.")

        if (player) {
            await message.channel.send(embed)
            player.destroy();
        } else {
            embed.setDescription("404 Player Not Found.")
                .setFooter(`Requested By: ${message.author.username}`, message.author.avatarURL())
            await message.channel.send(embed)
        }
    }
}