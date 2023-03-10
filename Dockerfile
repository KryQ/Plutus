FROM node:lts-alpine3.17

SHELL ["/bin/sh", "-c"]

WORKDIR /usr/src/plutus

RUN npm i -g node-gyp pm2

#For caching first copy package files.
COPY ./backend/package* ./backend/
COPY ./frontend/package* ./frontend/

#Build backend
RUN cd /usr/src/plutus/backend && npm ci

#Build frontend
RUN cd /usr/src/plutus/frontend && npm ci

COPY . .

RUN cd /usr/src/plutus/frontend && npm run build

RUN cp -R /usr/src/plutus/frontend/dist/* /usr/src/plutus/backend/public/

EXPOSE 3001

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
