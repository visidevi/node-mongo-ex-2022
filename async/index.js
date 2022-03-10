// https://dog.ceo/api/breed/hound/images
const fs = require('fs');
const http = require('http').createServer();
const superagent = require('superagent');
// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(data, `Breed ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) console.error(err);
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
//         if (err) console.error(err);
//         console.log('File saved');
//       });
//     });
// });

// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(data, `Breed ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
//         if (err) console.error(err);
//         console.log('File saved');
//       });
//     })
//     .catch((error) => {
//       if (error) console.error(error);
//     });
// });

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve('OK');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((res) => {
    // Call external api
    console.log(`Breed---- ${res}`);
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((data) => {
    // Save img
    console.log(data.body.message);
    return writeFilePromise(`${__dirname}/dog-img.txt`, data.body.message);
  })
  .then(() => console.log('File saved'))
  .catch(console.log)
  .finally(() => console.log('Done'));
