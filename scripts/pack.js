const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));
const version = packageJson.version || "unknown";

const output = fs.createWriteStream(`champion-hunter-v${version}.zip`);
const archive = archiver("zip", {zlib: {level: 9}});

output.on("close", () => {
    console.log(`✅ champion-hunter.zip created. Size of: ${archive.pointer()} bytes`);
});

archive.on("error", (err) => {
    throw err;
});

archive.pipe(output);

// 添加 `dist/` 目录
archive.directory("dist/", "dist");

// 添加单个文件
archive.file("README.md", {name: "README.md"});
archive.file("manifest.json", {name: "manifest.json"});

// 结束压缩流
archive.finalize();
