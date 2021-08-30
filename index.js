const brain = require('brain.js');
const { Client, Intents } = require('discord.js');
const { main } = require('./general/token.json');
const { SPT } = require('./general/sample.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

// create configuration for training
const config = {
  iterations: 1500,
  log: true,
  logPeriod: 50,
  layers: [10],
  errorThresh: 0.005,
};

const network = new brain.recurrent.LSTM();
network.train(SPT, config);

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  const output = network.run(msg.content);
  msg.channel.send(`${msg.content}: ${output}`);
});

client.login(main);