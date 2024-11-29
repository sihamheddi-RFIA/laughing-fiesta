const { execSync } = require("child_process");
const fs = require("fs");

function encodeBase64(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const base64Encoded = data.toString("base64");

    console.log("Base64 Encoded Content:");
    console.log(base64Encoded);

    fs.writeFile("taxpayer_base64.txt", base64Encoded, (err) => {
      if (err) {
        console.error("Error writing Base64 file:", err);
      } else {
        console.log("Base64 encoded file saved as taxpayer_base64.txt");
      }
    });
  });
}

try {
  execSync(
    "fatoora -csr -csrConfig ./example.properties -privateKey privateKey.pem -generatedCsr taxpayer.csr"
  );

  const encodedContent = encodeBase64("taxpayer.csr");
  console.log(encodedContent);
} catch (error) {
  console.error(error);
}
