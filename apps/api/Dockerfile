FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
COPY src ./src
COPY jest.config.js ./
RUN npm install
CMD ["npm", "run", "start:dev"]
