# Create by this guide:
# https://www.txconsole.com/posts/how-to-containerize-nextjs-app-with-docker-build

FROM node:20-alpine AS deps

WORKDIR /
RUN echo listing files in workdir:
RUN ls -la

COPY . ./buildctx
# RUN echo listing files in workdir (after):
# RUN ls -la

WORKDIR /buildctx
RUN echo listing files in build context:
RUN ls -la
