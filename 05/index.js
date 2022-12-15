const fs = require("fs");

const parseCrates = (string) => {
  const crateLines = string.split("\n");

  const len = parseInt(
    crateLines[crateLines.length - 1].trim().split(/\s+/).pop()
  );

  const stacks = [...Array(len)].map((u, i) => []);

  for (let r = crateLines.length - 2; r >= 0; r--) {
    for (let c = 0; c < stacks.length; c++) {
      const val = crateLines[r][c * 4 + 1];
      if (val && val !== " ") {
        stacks[c].push(val);
      }
    }
  }

  return stacks;
};

const star1 = async (input) => {
  const parts = input.replace(/\r/g, "").split("\n\n");

  const stacks = parseCrates(parts[0]);

  const instructionLines = parts[1].split("\n").filter((l) => !!l);

  const instructions = [];

  for (let i = 0; i < instructionLines.length; i++) {
    const line = instructionLines[i].split(" ");
    const num = parseInt(line[1]);

    for (let n = 0; n < num; n++) {
      instructions.push([parseInt(line[3]), parseInt(line[5])]);
    }
  }

  console.log("got instructions", instructions);

  for (const inst of instructions) {
    console.log(`move ${inst[0]} to ${inst[1]}`);

    const moved = stacks[inst[0] - 1].pop();
    stacks[inst[1] - 1].push(moved);
  }

  const finals = stacks.map((s) => s[s.length - 1]);

  console.log(`got finals ${finals.join("")}`);

  return finals.join("");
};

const star2 = async (input) => {
  const parts = input.replace(/\r/g, "").split("\n\n");

  const stacks = parseCrates(parts[0]);

  const instructionLines = parts[1].split("\n").filter((l) => !!l);

  const instructions = [];

  for (let i = 0; i < instructionLines.length; i++) {
    const line = instructionLines[i].split(" ");

    instructions.push([
      parseInt(line[1]),
      parseInt(line[3]),
      parseInt(line[5]),
    ]);
  }

  console.log("got instructions", instructions);

  for (const inst of instructions) {
    console.log(`move ${inst[0]} crates from ${inst[1]} to ${inst[2]}`);

    const moved = stacks[inst[1] - 1].splice(stacks[inst[1] - 1].length - inst[0], inst[0])
    stacks[inst[2] - 1].splice(stacks[inst[2] - 1].length, 0, ...moved);
  }

  const finals = stacks.map((s) => s[s.length - 1]);

  console.log(`got finals ${finals.join("")}`);

  return finals.join("");
};

exports.star1 = star1;
exports.star2 = star2;
