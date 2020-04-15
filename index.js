const Discord = require('discord.js');
const client = new Discord.Client();
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./storage');

client.on('ready', () => {
    if (storage.getItem('counter') == undefined) {
        storage.setItem('counter', parseInt(0));
        console.log(`⏱ Reset the counter.`);
    }

    console.log(`✌ We're ready to roll.`);
});

client.on('message', msg => {
    if (msg.content.toLowerCase().includes("oml") && msg.author.id == '581164227948052500') {
        let counter = parseInt(storage.getItem('counter')) + 1
        storage.setItem('counter', counter)
        console.log(`👆 Increased counter- it's now at ${counter}.`);
    }

    let prefix = "~"
    let args = msg.content.slice(prefix.length).split(/\s+/)
    let command = args.shift().toLowerCase()

    if (~['oml', 'counter', 'omlcounter'].indexOf(command)) {
        client.users.fetch('581164227948052500').then(user => {
            let embed = new Discord.MessageEmbed()
                .setColor("#c35cff")
                .setDescription(`⏱ yeepu's oml counter.`)
                .addField(`Counter`, `${storage.getItem('counter')} times`, true)
                .setThumbnail(user.avatarURL())
            msg.channel.send(embed)
        })
    }
});

client.login('');