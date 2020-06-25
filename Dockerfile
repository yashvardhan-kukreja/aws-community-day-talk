FROM node:latest
LABEL maintainer="yashvardhan-kukreja"
ENV NODE_ENV=test
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]