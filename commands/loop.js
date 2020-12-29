module.exports = {
    name: "loop",
    description: "Loop the track (current playing)",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id)

        if (player.playing && !player.trackRepeat) {
            message.reply("Enabled track repeat"); player.setTrackRepeat(true)
        } else {
            message.reply("Disabled track repeat"); player.setTrackRepeat(false)
        }
    }
}