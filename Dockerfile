# Create by this guide:
# https://www.txconsole.com/posts/how-to-containerize-nextjs-app-with-docker-build

FROM node:20-alpine AS deps

# WORKDIR /
# RUN echo listing files in workdir:
# RUN ls -la

# COPY . ./buildctx

# WORKDIR /buildctx
# RUN echo listing files in build context:
# RUN ls -la


RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

 
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# todo: copy only specific files and folders here?
COPY . .
 
# todo: is PUBLIC_APP_NAME needed?
# ARG PUBLIC_APP_NAME=garage51
# ENV NEXT_PUBLIC_APP_NAME=$PUBLIC_APP_NAME

ENV NEXT_TELEMETRY_DISABLED=1

# todo: use 'build:standalone' script?
RUN yarn run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
 
RUN addgroup --system --gid 1001 nodegrp
RUN adduser --system --uid 1001 nodeuser

# todo: are these 2 commands needed? will the cache folder not be created in runtime?
RUN mkdir -p -m 0755 /app/.next/cache
RUN chown nodeuser:nodegrp /app/.next/cache

# todo: is this needed? seems like env is injected hard-coded into standalone/server.js
COPY --from=builder /app/next.config.mjs ./

COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public # todo: is this needed?
 
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nodeuser:nodegrp /app/.next/standalone ./
COPY --from=builder --chown=nodeuser:nodegrp /app/.next/static ./.next/static

# to run docker container locally, uncomment this line
COPY sa_key.json ./
 
USER nodeuser

ENV PORT=3000
# ENV GOOGLE_APPLICATION_CREDENTIALS=sa_key.json

# Setting the HOSTNAME is somehow required for binding the server to 0.0.0.0 (even though it is the default value).
# This allows to make requests to the API inside the container.
# This is mostly needed for data fetching from the API by server components.
ENV HOSTNAME=0.0.0.0

RUN echo files in final image workdir:
RUN ls -la

EXPOSE $PORT
CMD ["node", "server.js"]
