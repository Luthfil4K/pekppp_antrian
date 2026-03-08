"use client";

import { useState, useEffect } from "react";
import { getLatestQueue } from "../services/queue";
import { GetAllQueueToday } from "../services/queue";

import { Card, Box, Typography, Grid, Button, Chip } from "@mui/material";
import CardScanQR from "../components/CardScanQR";
import CardScanQueue from "../components/CardScanQueue";
import CardServiceSelect from "../components/CardServiceSelect";
import { socket } from "@/socket";

const ScanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idAntrian, setIdAntrian] = useState(0);
  const waktu = new Date();
  const tanggal = waktu.getDate();

  const [queueData, setQueueData] = useState(null);
  const [getQueueData, setGetQueueData] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllQueueToday();
        if (!data || data.length === 0) return;

        const calledQueue = data.filter((item) => item.status === "CALLED");

        if (calledQueue?.length === 0) {
          setGetQueueData(null);
          return;
        }
        const sorted = calledQueue.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        setGetQueueData(sorted[0]);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function refreshQueue() {
      try {
        const data = await GetAllQueueToday();

        if (!data || data.length === 0) {
          setGetQueueData(null);
          return;
        }

        // ambil semua yang CALLED
        const calledQueue = data.filter((item) => item.status === "CALLED");

        if (calledQueue.length === 0) {
          setGetQueueData(null);
          return;
        }

        // urutkan berdasarkan waktu paling awal
        const sorted = calledQueue.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

        setGetQueueData(sorted[0]); // ambil yang paling atas
      } catch (error) {
        console.error(error);
      }
    }

    socket.on("queue-updated", refreshQueue);

    return () => {
      socket.off("queue-updated", refreshQueue);
    };
  }, []);

  // genrate qr code nya
  useEffect(() => {
    const generateQR = () => {
      const date = new Date();

      const pad = (num) => String(num).padStart(2, "0");

      const formatted =
        date.getUTCFullYear().toString() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds());

      setIdAntrian(formatted);
    };

    generateQR();
    const interval = setInterval(generateQR, 5317);

    return () => clearInterval(interval);
  }, []);
  console.log("idAntrian", idAntrian);

  return (
    <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/bg_white1.jpg')",
          backgroundSize: "cover",

          // backgroundColor:'green'
        }}
      >
        <Grid size={{ xs: 12, md: 12 }}>
          <Grid container sx={{ height: 60, px: 8 }}>
            <Grid
              size={{
                xs: 6,
                md: 6,
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Box
                sx={{
                  height: 50,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                  backgroundImage: "url('/logoBPSBali.png')",
                }}
              ></Box>
            </Grid>
            <Grid
              size={{ xs: 6, md: 6 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2, // jarak antar logo
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 50,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: "url('/PSTdanNarasi.png')",
                }}
              />

              <Box
                sx={{
                  width: 120,
                  height: 50,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: "url('/logo_se_samping.png')",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6, md: 6 }}
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "end",
            aligntItems: "start",
          }}
        >
          <CardScanQueue dataQueue={getQueueData ? getQueueData : "kosong"} />
        </Grid>
        <Grid
          size={{ xs: 6, md: 6 }}
          sx={{
            p: 3,
            display: "flex",
            aligntItems: "start",
            justifyContent: "start",
          }}
        >
          <CardScanQR data={idAntrian} openModal={() => setIsModalOpen(true)} />
          <CardServiceSelect
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onServiceSelect={(service) => console.log(service)}
            id={idAntrian}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ScanPage;
