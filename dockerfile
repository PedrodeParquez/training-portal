FROM node:20

RUN npm install -g yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig.json ./
COPY src ./src

RUN yarn build

CMD ["node", "dist/index.js"]
