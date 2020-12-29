require('dotenv').config()
const { Client, Collection } = require('discord.js');
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
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
    })
client.Music.on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");
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