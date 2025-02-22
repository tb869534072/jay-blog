import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async(req) => {
    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const POST_PER_PAGE = 4;
    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
    }

    try {
        const [posts, count] = await prisma.$transaction([
          prisma.post.findMany(query),
          prisma.post.count(),
        ]);
        const response = new NextResponse(JSON.stringify({ posts, count}), { status: 200 });
        response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
        return response;
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong"}), { status: 500 });
    }
}