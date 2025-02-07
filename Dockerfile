FROM node:18.18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps

# Install necessary dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app/padSlip

# Copy package.json and yarn.lock first to leverage Docker cache
COPY ./padSlip/package.json ./padSlip/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# # Copy the rest of the application code
# COPY ./padSlip .

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app/padSlip
COPY --from=deps /app/padSlip/node_modules ./node_modules
COPY ./padSlip .
RUN yarn build

# Expose the port the app runs on
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

# Command to run the application
WORKDIR /app
RUN yarn global add concurrently

CMD ["concurrently", "\"cd padSlip && yarn start\"", "\"cd server && yarn dev\""]