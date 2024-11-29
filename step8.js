const crypto = require("crypto");
const fs = require("fs");

const xml = fs.readFileSync("signedProperties.xml", "utf8");
// Step 2: Hash x XML
const hash = crypto.createHash("sha256").update(xml, "utf8").digest("hex");

console.log("SHA-256 Hash:", hash);

fs.writeFileSync("signedProperties_hash.txt", hash);

// Step 3: Encode hash to base64
const base64 = Buffer.from(hash, "hex").toString("base64");

fs.writeFileSync("signedProperties_hash_base64.txt", base64);
