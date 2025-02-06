FROM node:18.18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app/padSlip

# Install dependencies
COPY ./padSlip/package.json ./padSlip/yarn.lock ./
RUN yarn --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app/padSlip
COPY --from=deps /app/padSlip/node_modules ./node_modules
COPY ./padSlip .
RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app/padSlip

COPY --from=builder /app/padSlip/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder /app/padSlip/.next/standalone ./
# COPY --from=builder /app/padSlip/.next/static ./.next/static

EXPOSE 3000

# Backend Setup
WORKDIR /app/server

COPY ./server/package.json ./server/yarn.lock ./

# Get the chrome binary from puppeteer
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
ENV CHROMIUM_PATH=/usr/bin/chromium-browser

# added dependencies for hummus
RUN apk add  g++ gcc libgcc libstdc++ linux-headers make python3

# Install Dependencies
RUN yarn --frozen-lockfile

# Copy the Code
COPY ./server ./

EXPOSE 5000

WORKDIR /app
RUN yarn global add concurrently

CMD ["concurrently", "\"cd padSlip && node server.js\"", "\"cd server && yarn dev\""]
