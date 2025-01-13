const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

const config = require("./config");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });

const commands = new Collection();

const folders = readdirSync("./commands");

const statuses = [
    '🚀 Powered by github.com/noahprm',
    '🎟 Advanced Ticket Bot',
];

folders.map((fol) => {
    console.log(`Loading ${fol} commands :`);
    const files = readdirSync(`./commands/${fol}/`);

    const filesName = files.map(file => file.replace(".js", ""));
    for (const fileName of filesName) {
        const command = require(`./commands/${fol}/${fileName}`);
        const data = new command();
        commands.set(data.name, data);
        console.log(`- ${data.name} loaded !`);
    }    
});

client.on("ready", () => {
    client.application.commands.set(commands.map(({ execute, ...data }) => data));
    console.log(client.user.tag);

    setStatus();

    setInterval(() => {
        setStatus();
    }, 15000);
});

function setStatus() {
    const currentStatusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[currentStatusIndex];

    client.user.setActivity(status);
    client.user.setStatus('idle');
}

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    if (!commands.has(interaction.commandName)) return;
    try {
        commands.get(interaction.commandName).execute(interaction, client);
    } catch (error) {
        console.error(error);
    }
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) return;
        if (!commands.has(interaction.commandName)) return;
        try {
            commands.get(interaction.commandName).execute(interaction, client);
        } catch (error) {
            console.error(error);
        }
    });

});
    
client.login(config.token);