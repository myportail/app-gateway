FROM ubuntu:latest as build
RUN apt-get -y update
RUN apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get -y install nodejs git
RUN npm install -g typescript
WORKDIR /src
COPY ./server /src/server
WORKDIR /src/server
RUN npm install
RUN npm run build

FROM alpine:latest as final
RUN apk update && apk add nodejs npm git
COPY --from=build /src/server/build /server/app
COPY --from=build /src/server/configs /server/configs
COPY --from=build /src/server/package.json /server
COPY --from=build /src/server/package-lock.json /server
WORKDIR /server
RUN npm install --only=prod
