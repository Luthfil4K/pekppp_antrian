import prisma from "@/app/lib/prisma";

export async function GET(req, { params }) {
  try {

    const witaOffset = 8

    const nowWita = new Date()
    nowWita.setHours(nowWita.getHours() + witaOffset)

    const awalBulanWita = new Date(nowWita.getFullYear(), nowWita.getMonth(), 1)
    awalBulanWita.setHours(0, 0, 0, 0)

    const akhirBulanWita = new Date(nowWita.getFullYear(), nowWita.getMonth() + 1, 0)
    akhirBulanWita.setHours(23, 59, 59, 999)

    const awalUTC = new Date(awalBulanWita.getTime() - witaOffset * 60 * 60 * 1000)
    const akhirUTC = new Date(akhirBulanWita.getTime() - witaOffset * 60 * 60 * 1000)

    const queueThisMonth = await prisma.tbl_queue_digital.findMany({
      where: {
        createdAt: {
          gte: awalUTC,
          lte: akhirUTC,
        }
      },
      include: {
        layanan:true,
      }
    });

    return Response.json(queueThisMonth, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Gagal mengambil data bulan ini", detail: error.message },
      { status: 500 }
    );
  }
}