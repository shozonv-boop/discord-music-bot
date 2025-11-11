require('dotenv').config(); // .env প্রথমে load হবে

const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const distube = new DisTube(client, { emitNewSongOnly: true });

client.on('ready', () => console.log(`✅ Logged in as ${client.user.tag}`));

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    if (!message.member.voice.channel) return message.reply('🔊 Join a voice channel first!');
    distube.play(message.member.voice.channel, args.join(' '), { textChannel: message.channel, member: message.member });
  }

  if (command === 'skip') distube.skip(message);
  if (command === 'stop') distube.stop(message);
});

client.login(process.env.BOT_TOKEN); // পরিবর্তন করতে হলে MD Shozon স্যারের থেকে অনুমতি নিয়ে নিবেন ন
