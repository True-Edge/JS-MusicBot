require('dotenv').config()
const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client();

const { Manager } = require("erela.js")
client.Music = new Manager({
    nodes: [
        {
        host: process.env.LL_HOST,
        port: parseInt(process.env.LL_PORT),
        password: process.env.LL_PASS,
        region: process.env.LL_REGION,
        identifier: process.env.LL_IDEN,
    }],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload)
    },
});

client.Music.on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
client.Music.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
client.Music.on("trackStart", (player, track) => {
    client.channels.cache
    const v = client.channels.cache.get(player.textChannel)
    const embed = new MessageEmbed();
    embed.setDescription(`Now Playing: ${track.title}`);
    embed.setFooter(`Requseter: ${track.requester.username}`);
    v.send(embed);
    })
client.Music.on("queueEnd", (player) => {
    const embed = new MessageEmbed();
    var msg = client.channels.cache.get(player.textChannel)
    msg.send("Queue has ended.");
    player = client.Music.get(player.guild)
    if (player.queue.length == 0) {
        setTimeout(() => {
            if (player.queue.length != 0) {
                return;
            } else {
                embed.setDescription("Looks like the queue is empty after 5 mins.\nDisconnecting to save my bandwidth. Not cheap ya know?")
                msg.send("Disconneting to save bandwidth...")
                player.destroy();
            }
        }, 300000)
    }     
})

const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {console.log("Ready!"); client.Music.init(client.user.id)})
client.on("raw", (d) => client.Music.updateVoiceState(d));
client.on('message', message => {
    const prefix = "!"
    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase()
    
    if (!message.content.startsWith(prefix) || message.author.bot ) return;
    
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)
    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('There is an unexpected issue executing that command');
    }
});

client.login(process.env.TOKEN)