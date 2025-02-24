import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, props) => {
    const params = await props.params;
    const { slug } = params;

    try {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { user: true },
      });
      const response = new NextResponse(JSON.stringify(post), { status: 200 });
      response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
      return response;
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ message: "Something went wrong"}), { status: 500 });
    }
}