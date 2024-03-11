# Welcome to Remix!

## Env

```sh
cp .env_example .env
```

## Initial setup

```sh
# pnpm
pnpm install
pnpm run db:init

# npm
npm install
npm run db:init

# yarn
yarn
yarn db:init
```

## Run app

```sh
# pnpm
pnpm run dev

# npm
npm run dev

# yarn
yarn dev
```

## Run prisma studio

```sh
# pnpm
pnpm dlx prisma studio

# npm
npx prisma studio

# yarn (requires >= 2.0)
yarn dlx prisma studio
```

## Run storybook

```sh
# pnpm
pnpm run storybook

# npm
npm run storybook

# yarn
yarn storybook
```
