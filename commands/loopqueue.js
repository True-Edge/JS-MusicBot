module.exports = {
    name: "loopqueue",
    description: "Loop the queue",
    async execute(client, message, args) { 
        const player = message.client.Music.get(message.guild.id);
        
        if (player.playing && !player.queueRepeat) { 
            message.reply("Queue repeat enabled"); player.setQueueRepeat(true) 
        } else { 
            message.reply("Queue repeat disabled"); player.setQueueRepeat(false) 
        }
    }
}