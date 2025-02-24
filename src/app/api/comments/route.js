import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../../utils/auth";

//GET ALL COMMENT OF A POST
export const GET = async(req) => {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    try {
        const comments = await prisma.comment.findMany({
          where: {
            ...(postSlug && { postSlug }),
          },
          include: { user: true },
        });
        const response = new NextResponse(JSON.stringify(comments), { status: 200 });
        response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
        return response;
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong"}), { status: 500 });
    }
}

//CREATE A NEW COMMENT
export const POST = async(req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "You are not authenticated!"}), { status: 401 });
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });
    const response = new NextResponse(JSON.stringify(comment), { status: 200 });
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
    return response;
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong"}), { status: 500 });
  }
}