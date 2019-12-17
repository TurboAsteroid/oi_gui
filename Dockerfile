FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
RUN mkdir -p /etc/letsencrypt
COPY . .
RUN cp ./daypilot-vue.min.js ./node_modules/daypilot-pro-vue/daypilot-vue.min.js
RUN npm run build
EXPOSE 8585
EXPOSE 8523
EXPOSE 8524
CMD [ "npm", "start" ]
