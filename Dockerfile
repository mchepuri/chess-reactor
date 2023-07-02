# base image
FROM node:12.2.0 as build
RUN npm install -g npm@6.9

# set working directory

#RUN cd etc
#RUN ls
RUN pwd
RUN mkdir /workarea
WORKDIR /workarea
#RUN cd /workarea
COPY package.json .
COPY . /workarea
# RUN cat package.json 


# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY webpack.config.js /workarea
COPY .babelrc /workarea
RUN cd /workarea
RUN npm install
RUN npm rebuild node-sass
RUN npm run build
EXPOSE 3000

# start app
CMD ["npm", "start"]