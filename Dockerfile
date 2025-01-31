FROM node:current-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

COPY prisma ./prisma/

# Bundle app source
COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

RUN npx prisma migrate deploy

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
