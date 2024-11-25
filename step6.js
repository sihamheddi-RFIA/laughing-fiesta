/* 
 ECDSA signature for hashed invoice 
 by using previousely generated private key and hash
*/

const crypto = require("crypto");
const fs = require("fs");

const privateKey = fs.readFileSync("PrivateKey.pem", "utf8");
const hashedInvoice = fs.readFileSync("hash.txt", "utf8");

const signature = crypto.sign("sha256", hashedInvoice, privateKey);

fs.writeFileSync("invoice_signature.txt", signature);

console.log("1. signature saved as invoice_signature.txt");

// hash certificate signature ( json file )
const certificateJson = fs.readFileSync("csid.json", "utf8");

const certificate = JSON.parse(certificateJson);

const csid = certificate.binarySecurityToken;

// decode base64 csid
const decodedCsid = Buffer.from(csid, "base64").toString("hex");

// hashed csid
const hashCsid = crypto.createHash("sha256").update(decodedCsid).digest("hex");

fs.writeFileSync("csid_hash.txt", hashCsid);

// base64 encode csid hash
const base64 = Buffer.from(hashCsid, "hex").toString("base64");

fs.writeFileSync("csid_base64.txt", base64);

console.log("2. csid hash saved as csid_base64.txt");
