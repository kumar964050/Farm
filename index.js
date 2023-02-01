const express = require("express");
const app = express();
const fs = require("fs");
const productsData = fs.readFileSync("./data.json", "utf-8");
const productsDataObj = JSON.parse(productsData);

const templateCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const templateOverView = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const templateProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);

function TemplateReplace(product, temp) {
  // "id": 4,
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ORGANIC%}/g, product.organic);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  return output;
}

app.get("/", async (req, res) => {
  const x = productsDataObj.map((each) => TemplateReplace(each, templateCard));
  const xx = templateOverView.replace(/{%PRODUCT_CARDS%}/g, x.join(""));
  res.send(xx);
});
app.get("/product/:ID", async (req, res) => {
  const x = TemplateReplace(productsDataObj[req.params.ID], templateProduct);
  res.send(x);
});

app.listen(4000, () => {
  console.log("server running at PORT 4000");
});
