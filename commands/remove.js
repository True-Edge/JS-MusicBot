module.exports = {
    name: "remove",
    description: "remove one of the track in queue (excluding current)",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id)

        if (player.queue == 0) {
            return message.reply("Queue Empty!")
        } else {
            try {
                player.queue.remove((parseInt(args) - 1))
                message.reply("Removed track from queue!")
            } catch (error) {
                message.channel.send("Track you're trying to remove is out of range!")
            }
        }
    }
}