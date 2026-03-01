# Stage 1: Build the Angular app
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .
RUN npm run build -- --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/angularapp /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]