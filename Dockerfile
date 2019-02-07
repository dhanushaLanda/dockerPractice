FROM node

WORKDIR ./

COPY package*.json ./

RUN npm install && npm install -g nodemon

COPY . .

ENTRYPOINT [ "npm" , "start"] 

