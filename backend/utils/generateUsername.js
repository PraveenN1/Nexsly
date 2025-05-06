const User = require('../models/user');

const words = [
  'vortex', 'zen', 'cyber', 'echo', 'pixel', 'astro',
  'lunar', 'byte', 'nova', 'rune', 'mind', 'orbit',
  'flux', 'glitch', 'spark', 'code', 'dream', 'wave'
];

async function generateUsername() {
  let username, isTaken = true;

  while (isTaken) {
    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    const number = Math.floor(1000 + Math.random() * 9000);
    username = `${word1}_${word2}_${number}`;

    const exists = await User.findOne({ username });
    if (!exists) isTaken = false;
  }

  return username;
}

module.exports={generateUsername};