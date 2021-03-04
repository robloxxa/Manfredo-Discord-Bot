const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
client.on("ready", () => {
    console.log("Manfredo ready");
});
let asciify = require("asciify-image");

let options = {
    fit: "none",
    width: 33,
    height: 28,
    format: "string",
    color: false,
};
    
// function findManfredo(message) {
//     let manfredo = [];
//     try {
//         message.guild.emojis.cache.forEach((emojis) => {
//             if (emojis.name.toLowerCase().includes("manfredo")) {
//                 manfredo.push(emojis);
//             }
//         });
//     } catch (e) {
//         return [];
//     }
//     return manfredo;
// }

function hasEmout(message){
    let emout = message.toString()
    let emoutfinal
    if (emout.includes("<") && emout.includes(">")){
        emout = emout.slice(emout.indexOf('<')-1, emout.indexOf('>'))
        emoutfinal = emout.slice(emout.lastIndexOf(':')+1, emout.length)
        return emoutfinal
    }
    return false
}
const ManfredoEmout = '<:Manfredo:812703711427559445>'
client.on("message", (message) => {
    let content = message.content.toLowerCase();
    if (message.author.bot) return;
    if (!content.startsWith("!")) {
        if (content.includes(`@!${process.env.BOT_CLIENT}`)) {
            message.channel.send(ManfredoEmout);
        }
        if (content.includes("manfredo") || content.includes("мэнфредо")) {
            message.react(ManfredoEmout);
        }
    }
    else {
        if (content.startsWith("!manfredo")) {
            asciify("./737418513773363281.png", options, function (err, asciified) {
                if (err) throw err;
                //asciified.map((line) => console.log(line.join("")));
                message.channel.send("```" + asciified + "```");
            });
        }
        if (content.startsWith("!asciifredo")) {
            let image;
            if(message.attachments.first() !== undefined){
                image = message.attachments.first().attachment;
            }
            else if(hasEmout(message)){
                image = `https://cdn.discordapp.com/emojis/${hasEmout(message)}.png`
            }
            else return
            asciify(image, options, function (err, asciified) {
                if (err) throw err
                message.channel.send("```" + asciified + "```");
            });
        }
    }
});

client.on('messageReactionAdd', message =>{
  let emoji = message._emoji
  if (message.me) return
  if(
    emoji.name.toLowerCase().includes('manfredo')
  )
  {
    message.message.react(emoji)
  }
})

process.on('uncaughtException', (error => console.log(error)))
client.login(process.env.BOT_TOKEN);
