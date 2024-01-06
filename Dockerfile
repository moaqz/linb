FROM node:18-alpine3.19 AS base

# Install dependencies and build the application.
FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY . .
RUN npm run build

# Copy all the files and run the application.
FROM base AS runner
WORKDIR /app

# Disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
