module.exports = {
    name: "pause",
    description: "Pause the music. Bool type.",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        if (!player) return message.reply("There is no player in this guild")

        if (!player.paused) {
            player.pause(true);
            return message.reply("Paused on request.")
        } else {
            player.pause(false);
        }
    }
};