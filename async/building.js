const fs = require('fs');
const superagent = require('superagent');
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
const getDogPic = async (req, res) => {
  try {
    const breed = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed---- ${breed}`);
    const data1 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data2 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data3 = superagent.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const all = await Promise.all([data2, data3, data1])
    const imgs = all.map((elm) => elm.body.message);
    await writeFilePromise(`${__dirname}/dog-img.txt`, imgs.join('\n'));
    console.log('Finished! /Docs');
  } catch (err) {
    throw err;
  }
  return 'Finished!';
};
// console.log('before call async functions');
// // const c = getDogPic();
// // console.log(c, "Async functions");
// // First Pattern Pattern
// getDogPic()
//   .then((res) => {
//     console.log('res', res);
//     console.log('After call async functions');
//   })
//   .catch(console.error);

// Second Pattern Pattern
(async () => {
  try {
    console.log('Before call async functions');
    const c = await getDogPic();
    console.log(c, 'Async functions');
  } catch (err) {
    console.log('error[ERROR]');
    // throw err;
  }
})();
