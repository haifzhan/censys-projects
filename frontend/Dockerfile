FROM public.ecr.aws/docker/library/node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built app and public assets
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

# Next.js will bind to 0.0.0.0 by default in production
CMD ["npm", "run", "start"]
