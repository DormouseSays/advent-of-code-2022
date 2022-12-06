const fs = require('fs');

const values = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3
}

const getValue = (char) => {
  if(['A', 'X'].includes(char)) {
    return values.ROCK;
  } else if(['B', 'Y'].includes(char)) {
    return values.PAPER;
  } else if(['C', 'Z'].includes(char)) {
    return values.SCISSORS;
  }
  return null;
}

const getMove = (val, res) => {
  let move = 0;
  if(res === 'X') {
    move = val - 1;
    if(move < 1) {
      move = 3;
    }
  } else if(res === 'Y') {
    move = val;
  } else if (res === 'Z') {
    move = val + 1;
    if(move > 3) {
      move = 1;
    }
  }
  return move;
}

const star1 = async (input) => {

  const moves = input.replace(/\r/g, "").split("\n");

  let total = 0;

  for(const move of moves) {
    let roundScore = 0;
    const vals = move.split(' ');
    const val1 = getValue(vals[0]);

    const val2 = getMove(val1, vals[1]);

    if(val1 == null || val2 == null) {
      continue;
    }

    if(val2 === 3 && val1 === 1) {
      //do nothing
    } else if(val2 > val1 || (val2 === 1 && val1 === 3)) {
      roundScore += 6;
    } else if (val1 === val2) {
      roundScore += 3;
    }

    roundScore += val2;

    console.log(`${move} round score ${roundScore}`)

    total += roundScore
  }

  return total;

}

const star2 = async (input) => {

  const moves = input.replace(/\r/g, "").split("\n");

  let total = 0;

  for(const move of moves) {
    let roundScore = 0;
    const vals = move.split(' ');
    const val1 = getValue(vals[0]);
    const val2 = getMove(val1, vals[1]);

    if(val1 == null || val2 == null) {
      continue;
    }

    if(val2 === 3 && val1 === 1) {
      //do nothing
    } else if(val2 > val1 || (val2 === 1 && val1 === 3)) {
      roundScore += 6;
    } else if (val1 === val2) {
      roundScore += 3;
    }

    roundScore += val2;

    console.log(`${move} round score ${roundScore}`)

    total += roundScore
  }

  return total;

}


exports.star1 = star1;
exports.star2 = star2;
