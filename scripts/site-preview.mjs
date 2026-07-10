#!/usr/bin/env node

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const siteDir = path.join(process.cwd(), "site");
const port = Number(process.env.PORT || 8080);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = decoded === "/" ? "/index.html" : decoded;
  const target = path.normalize(path.join(siteDir, clean));
  if (!target.startsWith(siteDir)) return null;
  return target;
}

async function resolveFile(urlPath) {
  const direct = safePath(urlPath);
  if (!direct) return null;
  try {
    const info = await stat(direct);
    if (info.isFile()) return direct;
    if (info.isDirectory()) {
      const index = path.join(direct, "index.html");
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    const withIndex = path.join(direct, "index.html");
    try {
      if ((await stat(withIndex)).isFile()) return withIndex;
    } catch {
      return path.join(siteDir, "404.html");
    }
  }
  return path.join(siteDir, "404.html");
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url || "/");
  if (!file) {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  const is404 = file.endsWith("404.html") && req.url !== "/404.html";
  const ext = path.extname(file).toLowerCase();
  res.writeHead(is404 ? 404 : 200, {
    "Content-Type": types[ext] || "application/octet-stream"
  });
  createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MEMIA site preview: http://127.0.0.1:${port}`);
});
