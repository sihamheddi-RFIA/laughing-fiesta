const crypto = require("crypto");
const fs = require("fs");

const linearizedXml = fs.readFileSync(
  "signedProperties_linearized.xml",
  "utf8"
);
// Step 2: Hash the linearized XML
const hash = crypto
  .createHash("sha256")
  .update(linearizedXml, "utf8")
  .digest("hex");

console.log("SHA-256 Hash:", hash);

fs.writeFileSync("signedProperties_hash.txt", hash);
