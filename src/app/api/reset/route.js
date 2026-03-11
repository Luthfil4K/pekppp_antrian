import prisma from "@/app/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const lastPending = await prisma.tbl_queue_digital.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        layanan:true
      }
    });


    const nowWITA = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Makassar",
    });

    const created = new Date(nowWITA);

    const data = await prisma.tbl_queue_digital.update({
      where: {
        id,
        data: {
          queueNumber: id.toString(),
          clearStatus: lastPending.clearStatus == 1 ? 1 : 2,
          status: "PENDING",
          createdAt: created,
          date: created,
        },
      },
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
