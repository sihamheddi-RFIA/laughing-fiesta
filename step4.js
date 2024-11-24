var xmldom = require("xmldom");
var c14n = require("xml-c14n")();
var fs = require("fs");

var xmlData = fs.readFileSync("invoice.xml", "utf8"),
  document = new xmldom.DOMParser().parseFromString(xmlData);

var canonicaliser = c14n.createCanonicaliser(
  "http://www.w3.org/2001/10/xml-exc-c14n#WithComments"
);

console.log("canonicalising with algorithm: " + canonicaliser.name());
console.log("");

console.log("INPUT");
console.log("");
console.log(xmlData);

console.log("");

canonicaliser.canonicalise(document.documentElement, function (err, res) {
  if (err) {
    return console.warn(err.stack);
  }

  console.log("RESULT");
  console.log("");
  fs.writeFileSync("canonicalised.xml", res);
});
