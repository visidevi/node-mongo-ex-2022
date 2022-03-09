const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
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

const temOverView = fs.readFileSync(
  "./templates/template-overview.html",
  "utf8"
);
const temProduct = fs.readFileSync("./templates/template-product.html", "utf8");
const temCard = fs.readFileSync("./templates/template-card.html", "utf8");
// fs.readFile("./data/data.json", "utf8", (err, data) => {
//   const obj = JSON.parse(data);
//   res.end(JSON.stringify(obj));
// })
const apiData = fs.readFileSync("./data/data.json", "utf8");
const apiDataJson = JSON.parse(apiData);

const server = http.createServer((req, res) => {
  // console.log(url.parse(req.url, true), "URL");
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(404, { "Content-Type": "text/html" });
    const cardsHtml = apiDataJson
      .map((elm) => replaceTemplate(temCard, elm))
      .join("");
    const output = temOverView.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(apiDataJson);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = apiDataJson[query.id];
    const output = replaceTemplate(temProduct, product);
    res.end(output);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
