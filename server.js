import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "public");

const httpServer = http.createServer((req, res) => {
  if (req.url === "/xterm.css") {
    const cssPath = path.join(publicDir, "xterm.css");

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/plain"
        });

        res.end("xterm.css not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "no-cache"
      });

      res.end(data);
    });

    return;
  }

  res.writeHead(404, {
    "Content-Type": "text/plain"
  });

  res.end("Not found");
});

httpServer.listen(8788, "127.0.0.1", () => {
  console.log("HTTP server running on http://127.0.0.1:8788");
});
