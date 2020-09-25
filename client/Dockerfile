FROM node:8.15-alpine as builder

WORKDIR /client

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

# This second from's COPY statement will take the build from above and serve it with nginx
FROM nginx
EXPOSE 80
COPY --from=builder /client/build /usr/share/nginx/html

# Do we need a CMD to start nginx??