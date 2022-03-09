const fs = require("fs");
const http = require("http");
const url = require("url");
/////////////////////////////////

// FILES
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) console.error(err, "ERROR");
  console.log(data);
});
console.log("Hello World!");
//  Syncronus way
// const datasync = fs.readFileSync("input.txt", "utf8");
// console.log(datasync);
// Server response

const apiData = fs.readFileSync("./data/data.json", "utf8");
const apiDataJson = JSON.parse(apiData);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(apiDataJson);
    // fs.readFile("./data/data.json", "utf8", (err, data) => {
    //   const obj = JSON.parse(data);
    //   res.end(JSON.stringify(obj));
    // })
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
