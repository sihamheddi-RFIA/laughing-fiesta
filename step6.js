const crypto = require("crypto");
const fs = require("fs");

// Sample private key (replace this with your actual private key)
const privateKey = fs.readFileSync("PrivateKey.pem", "utf8");

// Hash of the message (you can replace this with your own hash)
const message = "your_message_here";
const hash = crypto.createHash("sha256").update(message).digest();

// Sign the hash using the private key and ECDSA with the SECP256k1 curve
const sign = crypto.createSign("SHA256");
sign.update(hash);
const signature = sign.sign(privateKey);

// Print the signature in hexadecimal format
console.log("Signature:", signature.toString("hex"));
