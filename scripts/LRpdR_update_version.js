const fs = require("fs");
const path = require("path");

console.log("⠄⠄⠄LRpdReaction | UPD PROJ VER ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼");

const readmePath = path.join(__dirname, "../README.md");
const readmeContent = fs.readFileSync(readmePath, "utf8");

const versionRegex = /###\s*v(\d+\.\d+\.\d+\S*)[^\n]*/;
const match = readmeContent.match(versionRegex);

if (!match) {
    console.error("Version not found(vX.Y.Z). Check README.md please");
    process.exit(1);
}

const version = match[1];
console.log(`Get version: ${version}`);

const updatedReadmeContent = readmeContent.replace(/v\d+\.\d+\.\d+\s*/, `v${version}  \n`);
fs.writeFileSync(readmePath, updatedReadmeContent, "utf8");

const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n", "utf8");

console.log(`Version updated to ${version}`);
console.log("⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄All Finished | UPD PROJ VER ⠄⠄⠄");