import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { type } = body;

    // Optional: validasi status
    const allowedStatus = ["PENDING", "CALLED", "DONE", "CANCELLED"];
    if (!allowedStatus.includes(type)) {
      return NextResponse.json(
        { message: "Status tidak valid" },
        { status: 400 }
      );
    }

    const result = await prisma.tbl_queue_digital.update({
      where: { id: Number(id) },
      data: { status: type },
    });

    //  Emit realtime
    if (global.io) {
      global.io.emit("queue-updated", {
        id: result.id,
        queueNumber: result.queueNumber,
        status: result.status,
        jenisLayananId: result.jenisLayananId,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}