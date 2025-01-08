FROM node

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Run the application
CMD yarn run dev
