FROM node:18-alpine

WORKDIR /app

# Install Python and dependencies for scraping script
RUN apk add --no-cache python3 py3-pip py3-requests py3-beautifulsoup4 && ln -sf python3 /usr/bin/python

COPY package*.json ./

RUN npm install --production

COPY . .

RUN mkdir -p database

EXPOSE 3001

CMD ["node", "src/server.js"]
