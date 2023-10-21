import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  const body = await request.json();

  const { id, sentence_annotations, collectionId } = body;

  // console.log({ data: data });

  console.log({ id: id });
  console.log({ sentence_annotations });

  try {
    const response = await prisma?.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        sentence_annotations,
        isValidate: 1,
      },
    });

    const count = await prisma?.user.update({
      where: {
        id: id,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(count);
  } catch (error) {
    return NextResponse.error();
  }
}
