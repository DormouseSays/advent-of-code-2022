const fs = require('fs');

const contains = (p1, p2) => {
  if(p1[0] <= p2[0] && p1[1] >= p2[1]) {
    return true;
  }

  if(p2[0] <= p1[0] && p2[1] >= p1[1]) {
    return true;
  }

  return false;
}

const overlaps = (p1, p2) => {
  if(p1[0] >= p2[0] && p1[0] <= p2[1]) {
    return true;
  }

  if(p1[1] >= p2[0] && p1[1] <= p2[1]) {
    return true;
  }

  if(p2[0] >= p1[0] && p2[0] <= p1[1]) {
    return true;
  }

  if(p2[1] >= p1[0] && p2[1] <= p1[1]) {
    return true;
  }

  return false;
}

const star1 = async(input) => {
  const lines = input.replace(/\r/g, "").split("\n").filter( l => !!l);
  const groups = lines.map(l => l.split(',').map(p => p.split('-').map(n => parseInt(n))) )

  let total = 0;

  for(let i = 0; i < groups.length; i++) {
    if(contains(...groups[i])) {
      total++;
    }
  }

  return total;
}

const star2 = async(input) => {
  const lines = input.replace(/\r/g, "").split("\n").filter( l => !!l);
  const groups = lines.map(l => l.split(',').map(p => p.split('-').map(n => parseInt(n))) )

  let total = 0;

  for(let i = 0; i < groups.length; i++) {
    console.log(`overlap ${groups[i][0].join(',')}-${groups[i][1].join(',')} = ${overlaps(...groups[i])}`);
    if(overlaps(...groups[i])) {
      total++;
    }
  }

  return total;
}

exports.star1 = star1;
exports.star2 = star2;