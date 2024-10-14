FROM node:20-alpine as deps
 
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
# RUN npm install --frozen-lockfile
# RUN npm ci
RUN yarn install --frozen-lockfile

 
FROM node:20-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
 
ENV NEXT_TELEMETRY_DISABLED 1
ARG PUBLIC_APP_NAME=garage51
ENV NEXT_PUBLIC_APP_NAME=$PUBLIC_APP_NAME
RUN yarn run build

FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
 
RUN addgroup --system --gid 1001 nodegrp
RUN adduser --system --uid 1001 nodeuser
RUN mkdir -p -m 0755 /app/.next/cache
RUN chown nodeuser:nodegrp /app/.next/cache

# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/public ./public # todo: is this needed?
COPY --from=builder /app/package.json ./package.json
 
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nodeuser:nodegrp /app/.next/standalone ./
COPY --from=builder --chown=nodeuser:nodegrp /app/.next/static ./.next/static
 
USER nodeuser
 
ENV PORT=3000

# Setting the HOSTNAME is somehow required for binding the server to 0.0.0.0 (even though it is the default value).
# This allows to make requests to the API inside the container.
# This is mostly needed for data fetching from the API by server components.
ENV HOSTNAME=0.0.0.0

EXPOSE $PORT
CMD ["node", "server.js"]
