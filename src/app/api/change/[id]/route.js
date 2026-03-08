import prisma from "../../../lib/prisma";

export async function GET(req, { params, value}) {
  try {
    const { id } = await params;

    const handleUpdate = await prisma.tbl_queue_digital.update({
      where: {
        id,
        data: { 
          clearStatus : value 
        },
      },
      
    });

    return Response.json(lastPending, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

