# Google Cloud Run Production Multi-Stage Container Dockerfile (Node 20 Alpine)
# Cites Rule 15 (Google Cloud Native Architecture) & Rule 1 (Zero Degradation)

FROM node:22-alpine AS base

# 1. Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

# 2. Builder stage (Compiles Next.js standalone app and Express gateway)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# 3. Production Runner stage (Slim container image optimized for Cloud Run cold starts)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 8080
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone Next.js build assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

CMD ["node", "server.js"]
