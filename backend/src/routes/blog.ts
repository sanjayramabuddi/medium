import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@kiddoo/medium-common";

export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: any;
    }
}>();

blogRoutes.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set('userId', user.id);
            await next();
        } else {
            return c.json({ message: "Unauthorized: Please login!" }, 401);
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

// 📌 POST: Create Blog
blogRoutes.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = c.get('userId');
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    try {
        const post = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            },
        });

        return c.json({ message: "Post created successfully", post }, 201);
    } catch (error) {
        console.error("Post creation error:", error);
        return c.json({ message: "Failed to create post" }, 500);
    }
});


// ✏️ PUT: Update Blog
blogRoutes.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    try {
        const updated = await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });

        return c.json({ message: "Post updated successfully", updated }, 200);
    } catch (error) {
        console.error("Post update error:", error);
        return c.json({ message: "Post not found or update failed" }, 404);
    }
});

// 📥 GET: All Posts
blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ posts }, 200);
    } catch (error) {
        console.error("Fetch posts error:", error);
        return c.json({ message: "Could not fetch posts" }, 500);
    }
});

// 📄 GET: Single Post by ID
blogRoutes.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id');

    try {
        const post = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!post) {
            return c.json({ message: "Post not found" }, 404);
        }

        return c.json({ post }, 200);
    } catch (error) {
        console.error("Find post error:", error);
        return c.json({ message: "Error retrieving post" }, 500);
    }
});