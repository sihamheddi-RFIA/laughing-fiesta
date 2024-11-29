// get csid by using csr and otp

// read json file
const fs = require("fs");

const csid = fs.readFileSync("csid.json", "utf8");

const json = JSON.parse(csid);

const binarySecurityToken = json.binarySecurityToken;

// decode base64 csid

const decodedbinarySecurityToken = atob(binarySecurityToken);

console.log(decodedbinarySecurityToken);

fs.writeFileSync("cert.pem", decodedbinarySecurityToken);
