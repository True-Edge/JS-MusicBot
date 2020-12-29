module.exports = {
    name: "remove",
    description: "remove one of the track in queue (excluding current)",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id)

        if (player.queue == 0) {
            return message.reply("Queue Empty!")
        } else {
            player.queue.remove(parseInt(args))
            message.reply("Removed track from queue!")
        }
    }
}