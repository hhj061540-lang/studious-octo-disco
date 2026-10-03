FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget \
    && rm -rf /var/lib/apt/lists/*

RUN wget -O server.js \
    "https://raw.githubusercontent.com/hhj061540-lang/studious-octo-disco/refs/heads/main/server.js"

RUN npm init -y \
    && npm install @xterm/xterm ssh2 ws

RUN mkdir -p public \
    && cp node_modules/@xterm/xterm/css/xterm.css public/xterm.css

RUN node -e "const fs=require('fs'); const p=require('./package.json'); p.type='module'; fs.writeFileSync('package.json', JSON.stringify(p,null,2)+'\\n')"

ENV NODE_ENV=production
ENV PORT=8787

EXPOSE 8787

CMD ["node", "server.js"]
