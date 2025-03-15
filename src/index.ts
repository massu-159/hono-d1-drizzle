import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { todos } from '../db/schema';
import { cors } from 'hono/cors';

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// CORSを許可
app.use(
	'http://localhost:3000',
	cors({
		origin: ['http://localhost:3000'],
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

// 全件取得
app.get('/todos', async (c) => {
	try {
		const db = drizzle(c.env.DB);
		const results = await db.select().from(todos);
		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 一件取得
app.get('/todos/:id', async (c) => {
	const id = parseInt(c.req.param("id"))
	try {
		const db = drizzle(c.env.DB);
		const results = await db.select().from(todos).where(eq(todos.id, id));
		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 新規登録
app.post('/todos', async (c) => {
	const todo = await c.req.json<typeof todos.$inferInsert>()
	try {
		const db = drizzle(c.env.DB);
		await db.insert(todos).values(todo)
		return c.json({message: "Success"}, 201);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 削除
app.delete('/todos/:id', async (c) => {
	const id = parseInt(c.req.param("id"))
	try {
		const db = drizzle(c.env.DB);
		await db.delete(todos).where(eq(todos.id, id))
		return c.json({message: "Success"}, 200);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 更新
app.put('/todos/:id', async (c) => {
	const id = parseInt(c.req.param("id"))
	const { todo, score, isDone } = await c.req.json<typeof todos.$inferInsert>()
	try {
		const db = drizzle(c.env.DB);
		await db.update(todos).set({ todo, score, isDone }).where(eq(todos.id, id))
		return c.json({message: "Success"}, 200);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

export default app;
