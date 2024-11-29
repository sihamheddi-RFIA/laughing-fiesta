const { execSync } = require("child_process");

try {
  execSync("fatoora -sign -invoice invoice.xml");
} catch (error) {
  console.error(error);
}
