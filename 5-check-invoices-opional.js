const axios = require("axios");
const fs = require("fs");

function getData() {
  const invoiceHash = "+6xCtVuR1jhoFNghMvYJCoh9EkLd6VbU4B6e7Gs3uSU=";
  const uuid = "49B4A38C-26C6-455F-8885-3BEFFB2FD5E7";

  // get binarySecurityToken and secret from csid.json
  const csidJson = fs.readFileSync("csid.json", "utf8");

  const json = JSON.parse(csidJson);

  const binarySecurityToken = json.binarySecurityToken;
  const secret = json.secret;
  const complianceRequestId = json.requestID;

  const auth = `${binarySecurityToken}:${secret}`;
  const authToken = Buffer.from(auth).toString("base64");

  const invoice = fs.readFileSync("invoice_signed.xml", "utf8");

  const invoiceEncoded = Buffer.from(invoice).toString("base64");

  return { invoiceHash, uuid, authToken, invoiceEncoded, complianceRequestId };
}

function checkInvoices(invoiceHash, uuid, authToken, invoiceEncoded) {
  axios
    .post(
      "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/compliance/invoices",
      {
        invoiceHash,
        uuid,
        invoice: invoiceEncoded,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Version": "V2",
          "Accept-language": "en",
          Authorization: `Basic ${authToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.validationResults.infoMessages);
    })
    .catch((error) => {
      console.error(error);
    });
}

const { invoiceHash, uuid, authToken, invoiceEncoded } = getData();
checkInvoices(invoiceHash, uuid, authToken, invoiceEncoded);

module.exports = { getData };
