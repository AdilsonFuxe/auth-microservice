FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY dist ./dist
RUN ls -al
RUN npm install --omit=dev

CMD ["npm", "start"]