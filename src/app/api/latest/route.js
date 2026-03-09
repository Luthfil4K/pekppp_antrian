import prisma from "../../lib/prisma";

export async function GET(req, { params }) {
  try {


    const lastPending = await prisma._digital.findFirst({
      where: {
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });



    return Response.json(lastPending, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
