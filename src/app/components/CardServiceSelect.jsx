"use client";

import CardServiceInside from "./CardServiceInside";
import { Divider, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { postQueueNumberAdmin } from "../services/queue";

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

export default function CardServiceSelect({ isModalOpen, setIsModalOpen, id }) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState([]);

  if (!isModalOpen) return null;

  const handleButton = async () => {
    if (selectedService.length === 0) return;

    try {
      await postQueueNumberAdmin(id, selectedService);
      router.push(`${process.env.NEXT_PUBLIC_LOCAL_URL}/queue/` + id);
    } catch (error) {
      console.error("Gagal ambil antrian:", error);
    }
  };

  const toggleService = (serviceId) => {
    setSelectedService(
      (prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId) // hapus jika sudah ada
          : [...prev, serviceId], // tambah jika belum ada
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md animate-in fade-in duration-300">
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
              onClick={() => toggleService(service.id)}
              isSelected={selectedService.includes(service.id)}
            />
          ))}
        </div>

        <Box sx={{ minHeight: 35, paddingTop: 2 }}>
          <Divider />
        </Box>

        <button
          onClick={handleButton}
          disabled={selectedService.length === 0}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform
            ${
              selectedService
                ? "bg-orange-600 hover:bg-orange-700 text-white hover:shadow-lg active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Ambil Antrian
        </button>

        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full mt-6 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
