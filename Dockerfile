FROM node:18
WORKDIR /app
COPY  package*.json ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN yarn run build
EXPOSE 3000

CMD [ "node", "./dist/index.js" ]