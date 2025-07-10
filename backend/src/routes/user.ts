import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// 🆕 Signup User
userRoutes.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ message: "User created", token: jwt }, 201);
    } catch (error) {
        console.error("Signup error:", error);
        return c.json({ message: "User already exists or invalid data" }, 409);
    }
});

// 🔐 Login User
userRoutes.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            },
        });

        if (!user || user.password !== body.password) {
            return c.json({ message: "Invalid username or password" }, 401);
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ message: "Login successful", token: jwt }, 200);
    } catch (error) {
        console.error("Login error:", error);
        return c.json({ message: "Something went wrong" }, 500);
    }
});
