const { execSync } = require("child_process");

try {
  execSync(
    "openssl ecparam -name secp256k1 -genkey -noout -out PrivateKey.pem"
  );

  execSync("openssl ec -in PrivateKey.pem -pubout -out PublicKey.pem");

  execSync(
    "openssl req -new -sha256 -key privateKey.pem -extensions v3_req -config csr.cnf -out taxpayer.csr"
  );
} catch (error) {
  console.error(error);
}
