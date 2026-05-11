const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;
  
  try {
    await axios.post(WEBHOOK_URL, { message: message.content });
    await message.react('✅');
  } catch (error) {
    console.error(error);
    await message.react('❌');
  }
});

client.login(process.env.DISCORD_TOKEN);
