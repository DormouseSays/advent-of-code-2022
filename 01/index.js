const fs = require('fs');

const star1 = async (input) => {
  let val = 0;

  const elves = input.replace(/\r/g, "").split("\n\n");

  let totals = elves.map(e => e.split("\n").reduce( (acc,v) => acc + parseInt(v), 0 ) );

  totals = totals.sort( (a,b) => b-a )


  return totals[0];
}

const star2 = async (input) => {
  let val = 0;

  const elves = input.replace(/\r/g, "").split("\n\n");

  let totals = elves.map(e => e.split("\n").reduce( (acc,v) => acc + parseInt(v), 0 ) );

  totals = totals.sort( (a,b) => b-a )


  return totals[0] + totals[1] + totals[2];
}

exports.star1 = star1;
exports.star2 = star2;
