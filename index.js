#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const colors = require("@colors/colors");

// Method  #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    // error handling code here
    // throw new Error(err)
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(colors.red(filenames[index]));
    } else {
      console.log(colors.bold(filenames[index]));
    }
  }
});

// Method #1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
