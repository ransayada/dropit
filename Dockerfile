FROM node:17

#Working directory
WORKDIR /usr/src/app

#Copy package.json files.
COPY package*.json ./

#Install Prettier (for all package's build functions)\
RUN npm install prettier -g

#Install all packages
RUN npm install

#Copy Source Files 
COPY . .

# Build
RUN npm run build

#Expose the API port
EXPOSE 3030

#Run command
CMD ["node", "build/server.js"]