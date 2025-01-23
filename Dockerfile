#FROM erpfront:v34
FROM node:14.16.0
WORKDIR /app

COPY package.json .

RUN npm install -g npm@6.14.11
RUN npm install --force
RUN npm install html2canvas jspdf --force
#ENV NODE_OPTIONS=--max-old-space-size=2048
# RUN npm install -g npm@9.8.1
COPY . .

EXPOSE 3000

CMD ["npm", "start"]