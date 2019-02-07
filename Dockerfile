FROM node

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm" , "start"] 

