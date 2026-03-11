import prisma from "@/app/lib/prisma";

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { jenisLayananId } = body;

    if (!jenisLayananId || jenisLayananId.length === 0) {
      return Response.json(
        { error: "Jenis layanan wajib dipilih" },
        { status: 400 }
      );
    }

    // cek apakah queueNumber sudah ada
    const isExist = await prisma.tbl_queue_digital.findFirst({
      where: {
        queueNumber: id.toString(),
      },
      include: {
        layanan: true,
      },
    });

    if (isExist) {
      return Response.json(isExist, { status: 200 });
    }

    const lastQueue = await prisma.tbl_queue_digital.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    // waktu WITA
    const nowWITA = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Makassar",
      })
    );

    let dailyQueueNumber = 1;

    if (lastQueue) {
      const createdAt = new Date(lastQueue.createdAt);

      const isSameDay =
        createdAt.getFullYear() === nowWITA.getFullYear() &&
        createdAt.getMonth() === nowWITA.getMonth() &&
        createdAt.getDate() === nowWITA.getDate();

      dailyQueueNumber = isSameDay
        ? lastQueue.dailyQueueNumber + 1
        : 1;
    }

    const created = new Date(nowWITA);

    // TRANSACTION
    const result = await prisma.$transaction(async (tx) => {

      const queue = await tx.tbl_queue_digital.create({
        data: {
          queueNumber: id,
          clearStatus: lastQueue?.clearStatus == 1 ? 1 : 2,
          status: "PENDING",
          dailyQueueNumber,
          createdAt: created,
          date: created,
        },
      });

      await tx.tbl_queue_layanan.createMany({
        data: jenisLayananId.map((layananId) => ({
          queueId: queue.id,
          jenisLayananId: layananId,
        })),
      });

      return queue;
    });

    if (global.io) {
      global.io.emit("post-queue", {
        id: result.id,
        queueNumber: result.queueNumber,
        status: result.status,
        dailyQueueNumber: result.dailyQueueNumber,
        date: result.date,
        createdAt: result.createdAt,
      });
    }

    return Response.json(result, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}