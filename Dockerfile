# Multistage Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
RUN yarn install --frozen-lockfile --production

EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
