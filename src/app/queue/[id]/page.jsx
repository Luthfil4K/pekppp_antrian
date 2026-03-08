"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardGuest from "@/app/components/CardGuest";
import getGuestStatus from "../../services/status";
import { socket } from "@/socket";

const Queue = ({ params }) => {
  const { id } = React.use(params)

  const [guestData, setGuestData] = useState(null);

  // 🔹 Ambil data pertama kali
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGuestStatus(id);
        setGuestData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);

  //  Listener realtime
  useEffect(() => {
    function handleQueueUpdate(data) {
      // 
      if (data.queueNumber === id) {
        setGuestData((prev) => ({
          ...prev,
          status: data.status,
        }));
      }
    }

    socket.on("queue-updated", handleQueueUpdate);

    return () => {
      socket.off("queue-updated", handleQueueUpdate);
    };
  }, [id]);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/bg_white1.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <CardGuest data={guestData} />
      </div>
    </Box>
  );
};

export default Queue;