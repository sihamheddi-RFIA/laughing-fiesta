// get csid by using csr and otp
const fs = require("fs");
const axios = require("axios");

function getCSID(csr, otp) {
  // sandbox url
  axios
    .post(
      "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/compliance",
      {
        csr: csr,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          OTP: otp,
          "Accept-Version": "V2",
        },
      }
    )
    .then((response) => {
      fs.writeFileSync("csid.json", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
}

const csr = fs.readFileSync("taxpayer_base64.txt").toString();

const otp = "123345";

getCSID(csr, otp);
