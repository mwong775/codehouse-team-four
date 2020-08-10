# self-note: gets node image from dockerhub i think
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# add args and environment variables
ARG REACT_APP_HOST_IP_ADDRESS
ENV REACT_APP_HOST_IP_ADDRESS $REACT_APP_HOST_IP_ADDRESS
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# self-note: binds app to port for docker daemon
EXPOSE 3000

CMD [ "npm", "start" ]