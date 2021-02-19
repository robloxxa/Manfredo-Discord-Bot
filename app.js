const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
client.on("ready", () => {
  console.log("Manfredo ready");
});
var asciify = require("asciify-image");

var options = {
  fit: "none",
  width: 33,
  height: 28,
  format: "string",
  color: false,
};

function findManfredo(message) {
  let manfredo = [];
  message.guild.emojis.cache.forEach((emojis) => {
    if (emojis.name.toLowerCase().includes("manfredo")) {
      manfredo.push(emojis);
    }
  });
  return manfredo;
}

client.on("message", (message) => {
  let manfredos = findManfredo(message);
  let content = message.content.toLowerCase();
  if (message.author.bot) return;
  if (!content.startsWith("!")) {
    if (manfredos.length) {
      if (content.includes(`@!${process.env.BOT_CLIENT}`)) {
        message.channel.send(`<:${manfredos[0].name}:${manfredos[0].id}>`);
      }
      if (content.includes("manfredo") || content.includes("мэнфредо")) {
        // for (let i in manfredos) {
        //     message.react(message.guild.emojis.cache.get(manfredos[i].id));
        // }
        message.react(message.guild.emojis.cache.get(manfredos[0].id));
      }
    }
    if (!manfredos.length) {
      if (content.includes(`@!${process.env.BOT_CLIENT}`)) {
        message.channel.send("🇲 🇦 🇳 🇫 🇷 🇪 🇩 🇴 😶");
      }
      if (content.includes("manfredo") || content.includes("мэнфредо")) {
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
  }
});

client.login(process.env.BOT_TOKEN);
