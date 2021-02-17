const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.on('ready', () =>{
    console.log('Manfredo ready');
})
let manfredo = []

function findManfredo(message) {
    let manfredo = [];
    message.guild.emojis.cache.forEach(emojis => {
        if (emojis.name.toLowerCase().includes('manfredo')){
            manfredo.push(emojis)
        }
    })
    return manfredo;
}
client.on('message', message => {
    let manfredos = findManfredo(message);
    let content = message.content.toLowerCase();
    if (message.author.bot) return;
    if (manfredos.length) {
        if (message.content.includes(`@!${process.env.BOT_CLIENT}`)) {
            message.channel.send(`<:${manfredos[0].name}:${manfredos[0].id}>`)
        }
        if (content.includes('manfredo') || content.includes(':Manfredo:') || content.includes('Мэнфредо')) {
            // for (let i in manfredos) {
            //     message.react(message.guild.emojis.cache.get(manfredos[i].id));
            // }
            message.react(message.guild.emojis.cache.get(manfredos[0].id));
        }
    }
})
client.login(process.env.BOT_TOKEN);