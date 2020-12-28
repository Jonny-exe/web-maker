FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /usr/src/app/node_modules/.bin:${PATH}
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
EXPOSE 3000
