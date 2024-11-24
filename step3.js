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

//const csr = fs.readFileSync("taxpayer_base64.txt").toString();
const csr =
  "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ0ZUQ0NBYndDQVFBd2RURUxNQWtHQTFVRUJoTUNVMEV4RmpBVUJnTlZCQXNNRFZKcGVXRmthQ0JDY21GdQpZMmd4SmpBa0JnTlZCQW9NSFUxaGVHbHRkVzBnVTNCbFpXUWdWR1ZqYUNCVGRYQndiSGtnVEZSRU1TWXdKQVlEClZRUUREQjFVVTFRdE9EZzJORE14TVRRMUxUTTVPVGs1T1RrNU9Ua3dNREF3TXpCV01CQUdCeXFHU000OUFnRUcKQlN1QkJBQUtBMElBQktGZ2ltdEVtdlJTQkswenI5TGdKQXRWU0NsOFZQWno2Y2RyNVgrTW9USG84dkhOTmx5Vwo1UTZ1N1Q4bmFQSnF0R29UakpqYVBJTUo0dTE3ZFNrL1ZIaWdnZWN3Z2VRR0NTcUdTSWIzRFFFSkRqR0IxakNCCjB6QWhCZ2tyQmdFRUFZSTNGQUlFRkF3U1drRlVRMEV0UTI5a1pTMVRhV2R1YVc1bk1JR3RCZ05WSFJFRWdhVXcKZ2FLa2daOHdnWnd4T3pBNUJnTlZCQVFNTWpFdFZGTlVmREl0VkZOVWZETXRaV1F5TW1ZeFpEZ3RaVFpoTWkweApNVEU0TFRsaU5UZ3RaRGxoT0dZeE1XVTBORFZtTVI4d0hRWUtDWkltaVpQeUxHUUJBUXdQTXprNU9UazVPVGs1Ck9UQXdNREF6TVEwd0N3WURWUVFNREFReE1UQXdNUkV3RHdZRFZRUWFEQWhTVWxKRU1qa3lPVEVhTUJnR0ExVUUKRHd3UlUzVndjR3g1SUdGamRHbDJhWFJwWlhNd0NnWUlLb1pJemowRUF3SURSd0F3UkFJZ1NHVDBxQkJ6TFJHOApJS09melI1L085S0VicHA4bWc3V2VqUlllZkNZN3VRQ0lGWjB0U216MzAybmYvdGo0V2FxbVYwN01qZVVkVnVvClJJckpLYkxtUWZTNwotLS0tLUVORCBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0K";
const otp = "123345";

getCSID(csr, otp);
