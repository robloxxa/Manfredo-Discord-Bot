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

function findManfredo(message) {
  let manfredo = [];
  try {
    message.guild.emojis.cache.forEach((emojis) => {
      if (emojis.name.toLowerCase().includes("manfredo")) {
        manfredo.push(emojis);
      }
    });
  } catch (e) {
    return [];
  }
  return manfredo;
}

client.on("message", (message) => {
  let content = message.content.toLowerCase();
  if (message.author.bot) return;
  console.log();
  if (!content.startsWith("!")) {
    if (content.includes(`@!${process.env.BOT_CLIENT}`)) {
      let manfredos = findManfredo(message);
      if (manfredos.length)
        message.channel.send(`<:${manfredos[0].name}:${manfredos[0].id}>`);
      else message.channel.send("🇲 🇦 🇳 🇫 🇷 🇪 🇩 🇴 😶");
    }
    if (content.includes("manfredo") || content.includes("мэнфредо")) {
      // for (let i in manfredos) {
      //     message.react(message.guild.emojis.cache.get(manfredos[i].id));
      // }
      let manfredos = findManfredo(message);
      if (manfredos.length) {
        message.react(message.guild.emojis.cache.get(manfredos[0].id));
      } else {
        message.react("🇲");
        message.react("🇦");
        message.react("🇳");
        message.react("🇫");
        message.react("🇷");
        message.react("🇪");
        message.react("🇩");
        message.react("🇴");
        message.react("😶");
      }
    }
  } else {
    if (content.startsWith("!manfredo")) {
      asciify("./737418513773363281.png", options, function (err, asciified) {
        if (err) throw err;
        //asciified.map((line) => console.log(line.join("")));
        message.channel.send("```" + asciified + "```");
      });
    }
    if (content.startsWith("!asciifredo") && message.attachments.first() !== undefined) {
      let image = message.attachments.first();
      asciify(image.attachment, options, function (err, asciified) {
        if (err) throw err;
        //asciified.map((line) => console.log(line.join("")));
        console.log(asciified)
        message.channel.send("```" + asciified + "```");
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);
