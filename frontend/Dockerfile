# Step 1: Build the app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Accept API URL as a build argument so Vite can bake it in
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# Copy built files to nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (for React Router support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
