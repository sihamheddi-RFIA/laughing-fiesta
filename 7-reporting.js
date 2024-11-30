const axios = require("axios");
const fs = require("fs");
const { getData } = require("./5-check-invoices-opional.js");

const { invoiceHash, uuid, invoiceEncoded } = getData();

function reportInvoices(authToken, invoiceHash, invoice, uuid) {
  axios
    .post(
      "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/invoices/reporting/single",
      {
        invoiceHash,
        uuid,
        invoice,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Version": "V2",
          "Accept-language": "en",
          "Clearance-Status": "0",
          Authorization: `Basic ${authToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.response.data.validationResults.infoMessages);
      console.error(error.response.data.validationResults.errorMessages);
      console.error(error.response.data.validationResults.warningMessages);
    });
}

// get binarySecurityToken and secret from production_csid.json
const csidJson = fs.readFileSync("csid_prod.json", "utf8");

const json = JSON.parse(csidJson);

const binarySecurityToken = json.binarySecurityToken;
const secret = json.secret;

const auth = `${binarySecurityToken}:${secret}`;
const authToken = Buffer.from(auth).toString("base64");

reportInvoices(authToken, invoiceHash, invoiceEncoded, uuid);
