# hono-d1-drizzle

`hono` を利用したAPIを作成。
todoアプリのCRUD処理

DBには `cloudflare D1` を利用
ORMには `drizzle` を利用

urlはこちら
https://github.com/massu-159/hono-d1-drizzle

## 目次
1. 環境構築
2. アプリケーションの仕様

## 1. 環境構築

### 1-1. ライブラリ インストール

```
npm install
# または
yarn
# または
pnpm install
# または
bun install
```

### 1-2. アプリケーション実行

```
npm run dev
# または
yarn run dev
# または
pnpm run dev
# または
bun run dev
```

## 2. アプリケーションの仕様

### 2-1. 仕様
- Todo
  - Todo一覧表示
  - Todo新規登録
  - Todo更新処理
  - Todo削除処理

### 2-2. 構成技術
```
		"@cloudflare/vitest-pool-workers": "^0.6.4",
		"@cloudflare/workers-types": "^4.20250224.0",
		"drizzle-kit": "^0.30.5",
		"typescript": "^5.5.2",
		"vitest": "~2.1.9",
		"wrangler": "^3.109.3"
		"drizzle-orm": "^0.40.0",
		"hono": "^4.7.2"
```
