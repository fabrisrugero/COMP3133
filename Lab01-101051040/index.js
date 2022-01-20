const fs = require("fs");
const csv = require("csv-parser");
const Transform = require("stream").Transform;
const PassThrough = require("stream").PassThrough;
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "country", title: "country" },
    { id: "year", title: "year" },
    { id: "population", title: "population" },
  ],
});

class CountryCSV extends Transform {
  constructor(options, country) {
    super(options);
    this.country = country;
  }

  _transform(chunk, encoding, next) {
    let isMatch = false;
    for (let key in chunk) {
      if (
        key === "country" &&
        chunk[key].toLowerCase() === this.country.toLowerCase()
      ) {
        isMatch = true;
        break;
      }
    }

    if (isMatch) this.push(csvStringifier.stringifyRecords([chunk]));
    next();
  }
}
const USAstream = new PassThrough();
const CanadaStream = new PassThrough();
const canadaStats = new CountryCSV({ writableObjectMode: true }, "Canada");
const usaStats = new CountryCSV({ writableObjectMode: true }, "United States");
const readStream = fs.createReadStream("./input_countries.csv");
readStream.pipe(CanadaStream);
readStream.pipe(USAstream);
// we create two pass-through that are like "clones" and read the data there
// I assume we are not reading the entire file into memory twice. but just cloning a stream, not sure

fs.unlink("./Canada.csv", function (err) {
  let abort = false;
  if (err && err.code == "ENOENT")
    console.log("Canada.csv doesn't exist, one will be created.");
  else if (err) {
    // other errors, e.g. maybe we don't have enough permission
    console.error("Error occurred while trying to remove Canada.csv");
    abort = true;
  } else console.log(`removed Canada.csv, a new one will be created`);
  if (!abort) {
    const CanadaWriteStream = fs.createWriteStream("./Canada.csv");
    //write header
    CanadaWriteStream.write(csvStringifier.getHeaderString());
    CanadaStream.pipe(csv())
      .pipe(canadaStats)
      .pipe(CanadaWriteStream)
      .on("finish", () => {
        console.log("finished writting to Canada.csv");
      })
      .on("error", (error) => {
        console.log(error);
      });
  }
});

fs.unlink("./United States.csv", function (err) {
  let abort = false;
  if (err && err.code == "ENOENT")
    console.log("United States.csv doesn't exist, One will be created");
  else if (err) {
    // other errors, e.g. maybe we don't have enough permission
    console.error(
      "Error occurred while trying to remove Uniteds States.csv, operation aborted"
    );
    abort = true;
  } else console.log(`removed United States.csv, a new one will be created`);
  if (!abort) {
    const USAwriteStream = fs.createWriteStream("./United States.csv");
    //write header
    USAwriteStream.write(csvStringifier.getHeaderString());
    USAstream.pipe(csv())
      .pipe(usaStats)
      .pipe(USAwriteStream)
      .on("finish", () => {
        console.log("finished writing to United Stated.csv");
      });
  }
});
