import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req, props) => {
    const params = await props.params;
    const { slug } = params;

    try {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { user: true },
      });

      const prevPost = await prisma.post.findFirst({
        where: { createdAt: { gt: post.createdAt } },
        orderBy: { createdAt: "asc" },
      });

      const nextPost = await prisma.post.findFirst({
        where: { createdAt: { lt: post.createdAt } },
        orderBy: { createdAt: "desc" },
      });

      const response = new NextResponse(JSON.stringify({ post, prevPost, nextPost }), { status: 200 });
      response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
      return response;
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ message: "Something went wrong"}), { status: 500 });
    }
}

export const POST = async (req, { params }) => {
    try {
    const { slug } = params;
    
    await prisma.post.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}