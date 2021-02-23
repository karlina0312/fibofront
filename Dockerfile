FROM node as builder
WORKDIR /app/node/react
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/node/react/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
