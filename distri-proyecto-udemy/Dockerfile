FROM node:16.17.1
WORKDIR /usr/src/app
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
CMD ["sh", "-c", "npm run dev" ]
