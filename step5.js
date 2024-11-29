// hashing
const crypto = require("crypto");
const fs = require("fs");

const hash = crypto.createHash("sha256");
const xmlFile = fs.readFileSync("invoice0.xml", "utf8");

const hashedInvoice = hash.update(xmlFile).digest("hex");
fs.writeFileSync("hash.txt", hashedInvoice);

// encode hash to base64
const base64 = Buffer.from(hashedInvoice, "hex").toString("base64");

fs.writeFileSync("hash_base64.txt", base64);

console.log("hash saved as hash_base64.txt");
