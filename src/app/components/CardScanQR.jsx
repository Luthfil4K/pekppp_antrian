import { useState } from "react";
import { Card, Typography, Grid, Button, Chip } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

const CardScanQR = ({ dataQueue, data, openModal }) => {
  const router = useRouter();

 

  return (
    <Card
      sx={{
        minWidth: 600,
        maxWidth: 601,
        width: 600,
        height: 655,
        p: 2,
        borderRadius: 4,
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
        position: "relative",
        overflow: "hidden",
        color: "",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   top: 0,
        //   left: "-75%",
        //   width: "50%",
        //   height: "100%",
        //   background:
        //     "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
        //   transform: "skewX(-20deg)",
        //   animation: "shine 2.5s infinite",
        // },

        // "@keyframes shine": {
        //   "0%": { left: "-75%" },
        //   "100%": { left: "125%" },
        // },
      }}
    >
      <div className="bg-white rounded-3xl  p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Scan QR Code
          </h2>
          <p className="text-gray-600 text-sm">Join the queue instantly</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-xl">
            <QRCodeSVG size={210} value={`${process.env.NEXT_PUBLIC_LOCAL_URL}/jenisLayanan/`+ data || ""} />
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700 font-medium">
            Gunakan Handphone anda untuk melakukan scan qr-code diatas.
          </p>
        </div>

        <button
          onClick={openModal}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:shadow-lg active:scale-95 text-lg"
        >
          Ambil antrian
        </button>

        <p className="text-center text-gray-500 text-xs">
          Tidak memiliki handphone? silahkan klik tombol diatas.
        </p>
      </div>
    </Card>
  );
};

export default CardScanQR;
