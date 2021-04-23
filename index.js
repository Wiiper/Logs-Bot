const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
console.clear();
const { Collection } = require("discord.js");
client.on('ready', () => {console.log("Client started!")})

//Message event
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


/*

[]

``

||

*/


client.on('message', message => {
    if(message.author.bot)return;
    if(message.channel.type === "dm") return;
    const prefix = "BOT PREFIX"

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;
    if(!message.content.startsWith(prefix))return;

    if(client.commands,has(cmd)){
        command = client.commands.get(cmd);
    }else {
        command = client.commands.get(client.aliaes.get(cmd))
    }
    if(command) command.run(client, message, args);
})


//Command handler
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if(jsfiles.length <= 0) return console.log("No commands to load!");

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name)
        });
    });
});


//Logs.

client.on('messageDelete', async message => {
    const channel = client.channels.cache.get("CHANNEL ID")
    channel.send(
        new Discord.MessageEmbed()
        .setDescription(`
        Message deleted in channel **${channel.name}**
        Message deleted by **${message.author.tag}**
        Deleted message is: **${message.content}**
        `)
    )
})

client.on('roleCreate', async role => {
    const channel = client.channels.cache.get("CHANNEL ID");

    channel.send(
        new Discord.MessageEmbed()
        .setDescription(`
        Created role with name **${role.name}**
        `)
    )
})

client.on('roleDelete', async role => {
    const channel = client.channels.cache.get("CHANNEL ID");
    channel.send(
        new Discord.MessageEmbed()
        .setDescription(
            `Deleted role with name **"${role.name}"**`
        )
    )
})
 
client.on('channelCreate', async channel => {
    const logs = client.channels.cache.get("CHANNEL ID");

    logs.send(
        new Discord.MessageEmbed()
        .setDescription(
            `Created channel with name **${channel.name}**`
        )
    )
})

client.on('channelDelete', async channel => {
    const logs = client.channels.cache.get("CHANNEL ID");
    logs.send(
        new Discord.MessageEmbed()
        .setDescription(
            `Deleted channel with name **"${channel.name}"**` 
        )
    )
})

//All more logs in next video! Thanks for watching! <3
client.login("BOT TOKEN")