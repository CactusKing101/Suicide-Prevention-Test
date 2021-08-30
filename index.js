const brain = require('brain.js');
const { Client, Intents } = require('discord.js');
const { main } = require('./general/token.json');
const intents = new Intents(32767);
const client = new Client({ intents: intents });

// create configuration for training
const config = {
  iterations: 1500,
  log: true,
  logPeriod: 50,
  layers: [10],
};

// Replace this with a database collection that is structured like this retrain ai
const data = [
  { input: 'i want to end my self', output: 'Suicidal' },
  { input: 'i want to hang my self', output: 'Suicidal' },
  { input: 'i want play a game', output: 'Normal' },
  { input: 'do you want to play a game', output: 'Normal' },
];

const network = new brain.recurrent.LSTM();
network.train(data, config);

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  const output = network.run(msg.content);
  console.log(`${msg.content}: ${output}`);
  msg.channel.send(`${msg.content}: ${output}`);
});

client.login(main);