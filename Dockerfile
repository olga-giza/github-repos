FROM node:20-alpine

LABEL org.opencontainers.image.source=https://github.com/olga-giza/github-repos

WORKDIR /app

RUN npm install yarn

COPY . ./

RUN yarn install

ARG REACT_APP_GITHUB_AUTH_TOKEN

RUN yarn run build

EXPOSE 4000

CMD yarn serve
