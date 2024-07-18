# Stage 0, for downloading project’s npm dependencies, building and compiling the app.
FROM node:18.19.1 as node

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install package.json 
COPY package.json /usr/src/app/package.json
#COPY src/ckeditor-styles.css /usr/src/app/ckeditor-styles.css
RUN npm install
RUN npm install -g @angular/cli@^18.1.0

# add app
COPY . /usr/src/app

# start app

ARG WORDPRESS_SITE_URL
ENV WORDPRESS_SITE_URL=${WORDPRESS_SITE_URL}

ARG IS_PRODUCTION
ENV IS_PRODUCTION=${IS_PRODUCTION}

ARG WORDPRESS_SITE_PASSWORD
ENV WORDPRESS_SITE_PASSWORD=${WORDPRESS_SITE_PASSWORD}


# RUN echo "WORDPRESS_SITE_URL: $WORDPRESS_SITE_URL" \
#    && echo "IS_PRODUCTION: $IS_PRODUCTION" \
#    && echo "WORDPRESS_SITE_PASSWORD: $WORDPRESS_SITE_PASSWORD"


RUN export NG_WORDPRESS_SITE_PASSWORD=$WORDPRESS_SITE_PASSWORD && ts-node src/environments/set-env.ts && npm run build
# REMOVE:
# RUN cp /usr/src/app/src/environments/environment.ts /usr/src/app/dist/environment.ts
#RUN cat /usr/src/app/src/environments/environment.ts


# Stage 1, for copying the compiled app from the previous step and making it ready for production with Nginx
FROM nginx:alpine3.19-perl

# Copy the nginx configuration
COPY docker/angular-nginx/angular-nginx.conf /etc/nginx/conf.d/default.conf

# Create a directory for the build output
RUN mkdir -p /usr/share/nginx/html

COPY --from=node /usr/src/app/dist/wordpress-headless/browser /usr/share/nginx/html/

# REMOVE Copy the environment.ts file to a location for inspection
# COPY --from=node /usr/src/app/dist/environment.ts /usr/share/nginx/html/environment.ts


CMD ["nginx", "-g", "daemon off;"]