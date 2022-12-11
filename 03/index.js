const fs = require('fs');
const { validateHeaderName } = require('http');

const getPriority = (c) => {
  let val = c.charCodeAt();

  if(val >= 97 & val <= 122) {
    val -= 96;
  } else if(val >= 65 & val <= 90) {
    val -= 38;
  }

  return val;
}

const star1 = async(input) => {
  const lines = input.replace(/\r/g, "").split("\n").filter( l => !!l);
  console.log('input')
  let parts = lines.map(l => [l.slice(0, l.length / 2).split(''), l.slice(l.length / 2).split('') ]);
  const dupes = parts.map(p => p[0].find(c => p[1].includes(c)));

  const priorities = dupes.map(p => getPriority(p));

  const total = priorities.reduce( (a,b) => a + b, 0 )

  return total;
}

const star2 = async(input) => {
  const lines = input.replace(/\r/g, "").split("\n").filter( l => !!l);
  console.log('input')
  //let parts = lines.map(l => [l.slice(0, l.length / 2).split(''), l.slice(l.length / 2).split('') ]);
  let parts = lines.map(l => l.split(''));

  let total = 0;

  for(let i = 0; i < parts.length; i += 3) {
    const badge = parts[i].find( c => parts[i + 1].find(c1 => c1 === c) && parts[i + 2].find(c2 => c2 == c));
    const badgePriority = getPriority(badge);
    total += badgePriority
  }

  return total;
}

exports.star1 = star1;
exports.star2 = star2;