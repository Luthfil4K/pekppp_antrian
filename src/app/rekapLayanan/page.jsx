"use client";

import { useState, useEffect } from "react";
import { getAllQueueMonth } from "../services/queue";

import { Card, Grid, Box, Typography } from "@mui/material";

import dynamic from "next/dynamic";

const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  { ssr: false },
);

import PaidIcon from "@mui/icons-material/Paid";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const RekapLayanan = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queue = await getAllQueueMonth();

        // Tambahkan nomor urut
        const dataWithNumber = queue.map((item, index) => ({
          ...item,
          id_no: index + 1,
        }));

        setMonthlyData(dataWithNumber);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    fetchData();
  }, []);

  const layananMap = {
    1: "Produk Statistik Berbayar",
    2: "Konsultasi Statistik",
    3: "Rekomendasi Statistik",
    4: "Layanan Perpustakaan",
  };

  const columns = [
    {
      field: "id_no",
      headerName: "No",
      width: 80,
    },
    {
      field: "queueNumber",
      headerName: "ID Antrian",
      width: 180,
    },

    // {
    //   field: "dailyQueueNumber",
    //   headerName: "Antrian Harian",
    //   width: 140,
    // },
    {
      field: "jenisLayanan",
      headerName: "Jenis Layanan",
      width: 700,
      valueGetter: (params, row) => {
        const layanan = row.layanan;

        if (!layanan) return "-";

        if (Array.isArray(layanan)) {
          return layanan
            .map((l) => layananMap[l.jenisLayananId] || "-")
            .join("; ");
        }

        return layananMap[layanan.jenisLayananId] || "-";
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,
    },

    {
  field: "createdAt",
  headerName: "Tanggal",
  width: 220,
  valueFormatter: (value) => {
    if (!value) return "-";

    const date = new Date(value);

    const tanggal = date.toLocaleDateString("id-ID", {
      timeZone: "Asia/Makassar",
    });

    const waktu = date.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${tanggal}, ${waktu} WITA`;
  },
}
  ];

  const getJenisLayananId = (layanan) => {
    if (Array.isArray(layanan)) {
      return layanan?.[0]?.jenisLayananId;
    }
    return layanan?.jenisLayananId;
  };

  console.log("monthlyData");
  console.log(monthlyData);
  console.log(monthlyData);
  console.log("monthlyData");

  const filteredData = monthlyData.filter((item) => {
    const date = new Date(item.createdAt);

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month === selectedMonth && year === selectedYear;
  });

  const totalBerbayar = filteredData.filter((item) =>
    Array.isArray(item.layanan)
      ? item.layanan.some((l) => l.jenisLayananId === 1)
      : item.layanan?.jenisLayananId === 1,
  ).length;

  const totalKonsultasi = filteredData.filter((item) =>
    Array.isArray(item.layanan)
      ? item.layanan.some((l) => l.jenisLayananId === 2)
      : item.layanan?.jenisLayananId === 2,
  ).length;

  const totalRekomendasi = filteredData.filter((item) =>
    Array.isArray(item.layanan)
      ? item.layanan.some((l) => l.jenisLayananId === 3)
      : item.layanan?.jenisLayananId === 3,
  ).length;

  const totalPerpustakaan = filteredData.filter((item) =>
    Array.isArray(item.layanan)
      ? item.layanan.some((l) => l.jenisLayananId === 4)
      : item.layanan?.jenisLayananId === 4,
  ).length;

  return (
    <>
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
        <Grid
          container
          justifyContent="center"
          sx={{
            mx: 2,
          }}
          mt={4}
        >
          <Grid
            size={{ md: 12, xs: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Grid>
          <Grid
            size={{ md: 12, xs: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              mb={2}
              sx={{ color: "#3c495c", fontWeight: 600 }}
            >
              Rekap Layanan
            </Typography>
          </Grid>

          <Grid container spacing={3} sx={{ px: 0, mb: 4 }}>
            {/* Produk Statistik Berbayar */}
            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minHeight: 120,
                  maxHeight: 170,
                  minWidth: 170,
                }}
              >
                <PaidIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Produk Statistik Berbayar
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalBerbayar}
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Konsultasi Statistik */}
            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minHeight: 120,
                  maxHeight: 170,
                  minWidth: 170,
                }}
              >
                <SupportAgentIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Konsultasi Statistik
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalKonsultasi}
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Rekomendasi Statistik */}
            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minHeight: 120,
                  maxHeight: 170,
                  minWidth: 170,
                }}
              >
                <AssignmentTurnedInIcon
                  sx={{ fontSize: 40, color: "#ed6c02" }}
                />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rekomendasi Statistik
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalRekomendasi}
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Perpustakaan */}
            <Grid size={{ md: 6, xs: 12 }}>
              <Card
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minHeight: 120,
                  maxHeight: 170,
                  minWidth: 170,
                }}
              >
                <MenuBookIcon sx={{ fontSize: 40, color: "#9c27b0" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Layanan Perpustakaan
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {totalPerpustakaan}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid size={{ md: 12, xs: 12 }} sx={{marginBottom:4}}>
            <Grid
              container
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid size={{ md: 2, xs: 4 }}>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  style={{
                    padding: 10,
                    width: "100%",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: 6,
                    backgroundColor: "white",
                    fontSize: 14,
                  }}
                >
                  {[
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                  ].map((bulan, index) => (
                    <option key={index} value={index + 1}>
                      {bulan}
                    </option>
                  ))}
                </select>
              </Grid>

              <Grid size={{ md: 2, xs: 4 }}>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  style={{
                    padding: 10,
                    width: "100%",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: 6,
                    backgroundColor: "white",
                    fontSize: 14,
                  }}
                >
                  {[2024, 2025, 2026, 2027].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ md: 12, xs: 12 }} sx={{ px: 2 }}>
            <Card
              sx={{
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                p: 3,
                minWidth: 300,
              }}
            >
              <Box sx={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={filteredData}
                  columns={columns}
                  pageSizeOptions={[10, 20, 30]}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10, page: 0 },
                    },
                  }}
                  disableRowSelectionOnClick
                  showToolbar
                />
              </Box>
            </Card>
          </Grid>
          <Grid size={{ md: 12, xs: 12 }}>
            <Box sx={{ height: 100, width: "100%" }}></Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RekapLayanan;
