const { getData } = require("./5-check-invoices-opional.js");
const axios = require("axios");
const fs = require("fs");

const { authToken, complianceRequestId } = getData();

function getProdCSID(authToken, complianceRequestId) {
  axios
    .post(
      "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/production/csids",
      {
        compliance_request_id: complianceRequestId,
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
      fs.writeFileSync("csid_prod.json", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
}

getProdCSID(authToken, complianceRequestId);
