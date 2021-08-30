const brain = require('brain.js');
const { Client, Intents } = require('discord.js');
const { main } = require('./general/token.json');
const { SPT } = require('./general/sample.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// create configuration for training
const config = {
  iterations: 20000,
  log: true,
  logPeriod: 100,
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