FROM node:21-alpine as development-stage

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "sh", "entrypoint.sh" ]


#CMD ["npm", "run", "start-with-watch:dev"]
