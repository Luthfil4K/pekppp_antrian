"use client";

import CardServiceInside from "../../components/CardServiceInside";
import React from "react";
import { Divider, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postQueueNumberAdmin } from "../../services/queue";

const services = [
  {
    id: 1,
    name: "Konsultasi Statistik",
    icon: "👥",
    description: "Konsultasi mengenai statistik yang dihasilkan oleh BPS",
  },
  {
    id: 2,
    name: "Produk Statistik Berbayar",
    icon: "✅",
    description: "Akses data mikro, peta wilayah kerja statistik, dll.",
  },
  {
    id: 3,
    name: "Rekomendasi Kegiatan Statistik",
    icon: "🔍",
    description: "Rekomendasi pelaksanaan kegiatan statistik",
  },
  {
    id: 4,
    name: "Layanan Perpustakaan",
    icon: "📖",
    description: "Akses publikasi BPS Provinsi Bali",
  },
];

export default function CardServiceSelect({ params }) {
  const { id } = React.use(params);

  const router = useRouter();
  const [selectedLayanan, setSelectedLayanan] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleLayanan = (serviceId) => {
    setSelectedLayanan((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleButton = async () => {
    if (selectedLayanan.length === 0) return;

    try {
      setLoading(true);

      await postQueueNumberAdmin(id, selectedLayanan);

      router.push(`${process.env.NEXT_PUBLIC_LOCAL_URL}/queue/` + id);
    } catch (error) {
      console.error("Gagal ambil antrian:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-md animate-in fade-in duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pilih Layanan Anda.
            </h2>
            <p className="text-gray-600 text-sm">
              Pilih layanan yang akan anda akses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <CardServiceInside
                key={service.id}
                icon={service.icon}
                name={service.name}
                description={service.description}
                isSelected={selectedLayanan.includes(service.id)}
                onClick={() => toggleLayanan(service.id)}
              />
            ))}
          </div>

          <Box sx={{ minHeight: 35, paddingTop: 2 }}>
            <Divider />
          </Box>

          <button
            onClick={handleButton}
            disabled={selectedLayanan.length === 0 || loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:shadow-lg active:scale-95 text-lg"
          >
            {loading ? "Memproses..." : "Ambil Antrian"}
          </button>
        </div>
      </div>
    </Box>
  );
}
