FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk update && apk add --no-cache python3 py3-pip

COPY my_script.py /app/my_script.py

EXPOSE 3000

CMD ["npm", "start"]