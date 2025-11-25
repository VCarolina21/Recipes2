import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET detail
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}

// UPDATE (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updated = await prisma.recipe.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.recipe.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true });
}
