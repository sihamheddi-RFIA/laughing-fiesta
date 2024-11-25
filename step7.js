const fs = require("fs");

const xml = fs.readFileSync("signedProperties.xml", "utf8");

// Remove newlines, tabs, and extra spaces
const linearizedXml = xml
  .replace(/\s*(\r\n|\n|\r)\s*/g, "") // Remove newlines
  .replace(/>\s*</g, "><") // Remove spaces between tags
  .trim(); // Remove leading/trailing spaces

fs.writeFileSync("signedProperties_linearized.xml", linearizedXml);
