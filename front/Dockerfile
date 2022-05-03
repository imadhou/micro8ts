FROM node:16-alpine as build-env
WORKDIR /front
RUN npm install -g npm@8.1.2
COPY ["package.json","package-lock.json","/front/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /front
RUN ng build --base-href /front/ --deploy-url /front/

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --port 4200 --disable-host-check true