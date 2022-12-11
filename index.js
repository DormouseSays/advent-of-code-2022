require('dotenv').config()

const axios = require('axios');
const fs = require('fs');

const DEFAULT_RESULTS = {
  "sample1": null,
  "sample2": null,
  "star1": null,
  "star2": null
};

const postAnswer = async (sessionToken, day, answer, starLevel) => {
  if(!answer) {
    console.log('no answer to send')
    return;
  }
  const saveUrl = `https://adventofcode.com/2022/day/${parseInt(day)}/answer`;
  const params = new URLSearchParams({
    level: starLevel,
    answer: answer
  });

  const options = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Cookie: `session=${sessionToken}`
    }
  }

  console.log(`posting ${answer} for level ${starLevel} to ${saveUrl}`);

  const saveResult = await axios.post(saveUrl, params, options);

  //TODO do some HTML parsing here

  if (saveResult.data.includes("day-success")) {
    return true;
  } else {
    console.log("problem with answer, got", saveResult)
  }

  return false;
}


const runDay = async (day) => {


  const sessionToken = process.env.SESSION_TOKEN;

  let input = null;

  if (!fs.existsSync(day)) {
    fs.mkdirSync(day);
  }
  

  if (fs.existsSync(`${day}/input.txt`)) {
    input = fs.readFileSync(`${day}/input.txt`, 'utf8')
  } else {
    const inputUrl = `https://adventofcode.com/2022/day/${parseInt(day)}/input`;
    console.log(`Downloading input from ${inputUrl}`)
    const result = await axios.request({
      method: 'GET',
      url: inputUrl,
      headers: {
        Cookie: `session=${sessionToken}`
      }
    });



    fs.writeFileSync(`${day}/input.txt`, result.data);
    fs.writeFileSync(`${day}/sample.txt`, "");
    fs.writeFileSync(`${day}/results.json`, JSON.stringify(DEFAULT_RESULTS));

    input = result.data;
  }

  const results = require(`./${day}/results.json`);

  //dynamic require for current day
  if (!fs.existsSync(`${day}/index.js`)) {
    console.log(`Creating code file ${day}/index.js`)
    fs.writeFileSync(`${day}/index.js`, "const fs = require('fs');\n\nconst star1 = async() => {}\n\nexports.star1 = star1;");
  }

  const dayFunctions = require(`./${day}/index.js`);





  if (results.star1) {
    console.log(`Already solved star1 with ${results.star1}`);
  } else {

    const sample1Input = fs.readFileSync(`${day}/sample.txt`, 'utf8');

    const sample1Result = await dayFunctions.star1(sample1Input);

    if (!results.sample1 || sample1Result != results.sample1) {
      console.log(`ERROR star1 test expected ${results.sample1} but got ${sample1Result}`)
      return;
    }

    console.log(`star 1 test good with ${sample1Result}`)

    const star1Answer = await dayFunctions.star1(input);

    console.log(`star 1 got ${star1Answer}`)

    const star1Correct = await postAnswer(sessionToken, day, star1Answer, 1)

    if (star1Correct) {
      results.star1 = star1Answer;
      fs.writeFileSync(`${day}/results.json`, JSON.stringify(results));
    } else {
      return;
    }
  }

  if (results.star2) {
    console.log(`Already solved star2 with ${results.star2}`);
  } else {

    const sample2Input = fs.readFileSync(`${day}/sample.txt`, 'utf8');

    //TODO check first for a sample2.text, otherwise fall back to default sample

    const sample2Result = await dayFunctions.star2(sample2Input);

    if (sample2Result != results.sample2) {
      console.log(`ERROR star1 test expected ${results.sample2} but got ${sample2Result}`)
      return;
    }

    const star2Answer = await dayFunctions.star2(input);

    console.log(`star 2 got ${star2Answer}`)

    const star2Correct = await postAnswer(sessionToken, day, star2Answer, 2)

    if (star2Correct) {
      results.star2 = star2Answer;
      fs.writeFileSync(`${day}/results.json`, JSON.stringify(results));
    } else {
      return;
    }
  }
}

let setDay = null;

const today = new Date();
today.setHours(today.getHours() - 5); //EST offset
setDay = today.toISOString().split('T')[0].split('-')[2];

//allow overriding date from command line args
const commandLineArgs = process.argv.slice(2);

if(commandLineArgs.length > 0 ) {
  setDay = commandLineArgs[0];
}


console.log(' ** Advent of Code 2022 ** ');
console.log(`Running day ${setDay}`)
runDay(setDay);
console.log('Done!');