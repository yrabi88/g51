# Create by this guide:
# https://www.txconsole.com/posts/how-to-containerize-nextjs-app-with-docker-build

FROM node:20-alpine AS deps

WORKDIR /
RUN echo listing files in workdir:
RUN ls -la
