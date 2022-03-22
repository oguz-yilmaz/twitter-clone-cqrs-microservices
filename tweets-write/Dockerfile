FROM node:alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install --only-prod --legacy-peer-deps

COPY . .

CMD ["npm", "start"]