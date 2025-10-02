# build stage
FROM node:20-alpine AS builder
WORKDIR /app

# accept build arg and set it as env so vite sees it during build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# install dependencies & build
COPY package*.json vite.config.js postcss.config.js tailwind.config.js index.html ./
COPY src ./src
RUN npm ci
RUN npm run build

# production stage - serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
