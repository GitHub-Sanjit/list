const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    // error handling code here
    // throw new Error(err)
    console.log(err);
  }

  console.log(filenames);
});
