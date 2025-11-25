import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const recipe = await prisma.recipe.create({ data });
  return NextResponse.json(recipe);
}

export async function GET() {
  const recipes = await prisma.recipe.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(recipes);
}