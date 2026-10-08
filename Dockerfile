FROM node:22-alpine AS development-dependencies-env
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate && pnpm install --frozen-lockfile

FROM node:22-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN corepack enable && pnpm run build

FROM node:22-alpine AS production-dependencies-env
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate && pnpm install --prod --frozen-lockfile

FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
RUN corepack enable
EXPOSE 4001
CMD ["pnpm", "run", "start:prod"]
