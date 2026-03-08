import prisma from "../../lib/prisma"

export async function GET(req, { params }) {
  try {

    const witaOffset = 8

    const nowWita = new Date()
    nowWita.setHours(nowWita.getHours()+witaOffset)


    const awalWita = new Date(nowWita)
    awalWita.setHours(0,0,0,0)

    const akhirWita = new Date(nowWita)
    akhirWita.setHours(23,59,59,999)

    const awalUTC= new Date(awalWita.getTime() - witaOffset*60*60*1000)
    const akhirUTC = new Date(akhirWita.getTime() - witaOffset*60*60*1000)

    const queueToday = await prisma.tbl_queue_digital.findMany({
      where: {
        createdAt: {
          gte: awalUTC,
          lt: akhirUTC,
        }
      },
      include:{
        layanan:true,
      }
    });

    return Response.json(queueToday, { status: 200 });
  } catch (error) {
    console.error(error);
    console.log(error);
    return Response.json({ error: "Gagal mengambil data: ",error }, { status: 500 });
  }
}
