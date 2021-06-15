# Specify a base image
FROM node:14.5.0 as build-deps

# Create working directory and copy the app before running yarn install as the artifactory
# credentials can be inside .npmrc
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json . 
RUN yarn install

COPY . ./
EXPOSE 3000
# Run yarn install

CMD ["npm", "run", "start"]