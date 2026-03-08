import { useState, useEffect } from "react";
import { Card, Typography, Grid, Button, Chip } from "@mui/material";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 200, 83, 0.6);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 12px 4px rgba(0, 200, 83, 0.3);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 200, 83, 0);
  }
`;

const CardGuest = ({ data }) => {
  const [prime, setPrime] = useState(null);
  const [jenisLayananId, setJenisLayananId] = useState(null);

  useEffect(() => {
    setPrime(data);

    const layananId = Array.isArray(data?.layanan)
      ? data?.layanan?.[0]?.jenisLayananId
      : data?.layanan?.jenisLayananId;

    setJenisLayananId(layananId);

  }, [data]);
  console.log(data ? data : "notFairy");

  return (
    <Card
      sx={{
        minWidth: 200,
        maxWidth: 450,
        height: 555,
        p: 2,
        borderRadius: 4,
        border: "1px solid #e0e0e0",
        boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
        position: "relative",
        overflow: "hidden",
        // color: "",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   top: 0,
        //   left: "-75%",
        //   width: "50%",
        //   height: "100%",
        //   background:
        //     "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
        //   transform: "skewX(-20deg)",
        //   animation: "shine 3.5s infinite",
        // },
        // "@keyframes shine": {
        //   "0%": { left: "-75%" },
        //   "100%": { left: "125%" },
        // },
      }}
    >
      <Grid container sx={{ marginTop: 4 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            fontWeight={100}
            sx={{ color: "#878787ff", textAlign: "center" }}
          >
            NOMOR ANTRIAN ANDA
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 80,
              fontWeight: 700,
              background: "linear-gradient(180deg, #ff9800, #f16d45, #fc3b00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "pulse 4s infinite",
              "@keyframes pulse": {
                "0%": {
                  opacity: 0.6,
                  textShadow: "0 0 6px rgba(245, 162, 37, 0.38)",
                },
                "50%": {
                  opacity: 0.6,
                  textShadow: "0 0 10px rgba(255,152,0,0.6)",
                },
                "100%": {
                  opacity: 0.6,
                  textShadow: "0 0 6px rgba(217, 255, 0, 0.3)",
                },
              },
            }}
          >
            {jenisLayananId == 1
              ? "A"
              : jenisLayananId == 2
                ? "B"
                : jenisLayananId == 3
                  ? "C"
                  : "D"}
            -{String(prime?.dailyQueueNumber).padStart(3, "0")}
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, md: 12 }}
          sx={{
            marginTop: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              transition: "all 0.8s ease",

              backgroundColor:
                prime?.status == "PENDING"
                  ? "rgb(252, 228, 175)"
                  : prime?.status == "CALLED"
                    ? "#a4faac"
                    : prime?.status == "DONE"
                      ? "#b7e0fc"
                      : "#fababa",

              ...(prime?.status === "CALLED" && {
                animation: `${pulse} 4s infinite`,
              }),
            }}
            label={
              prime?.status == "PENDING"
                ? "Menunggu Dipanggil"
                : prime?.status == "CALLED"
                  ? "🔔 Nomor Anda Dipanggil"
                  : prime?.status == "DONE"
                    ? "Layanan Telah Selesai"
                    : "Antrian anda dibatalkan"
            }
          />
        </Grid>

        <Grid sx={{ padding: 2, marginTop: 4 }} size={{ xs: 12, md: 12 }}>
          <Card
            sx={{
              minWidth: 60,
              height: 85,
              p: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              boxShadow: "none",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontWeight: 600 }}
              variant="h5"
            ></Typography>
            <Typography
              sx={{ color: "#5d5d5dff", textAlign: "center" }}
              variant="body2"
            ></Typography>
          </Card>
        </Grid>
        {/* <Grid sx={{ padding: 2, marginTop: 4 }} size={{ xs: 6, md: 6 }}>
            <Card
              sx={{
                minWidth: 30,
                height: 85,
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ textAlign: "center", fontWeight: 600 }}
                variant="h6"
              >
                15 Menit
              </Typography>
              <Typography
                sx={{ color: "#878787ff", textAlign: "center" }}
                variant="body2"
              >
                Estimasi menunggu
              </Typography>
            </Card>
          </Grid> */}

        <Grid marginTop={4} size={{ md: 12, xs: 12 }}>
          <Typography
            sx={{ color: "#878787ff", textAlign: "center", fontSize: 12 }}
          >
            Silakan tunggu sampai nomor antrian anda dipanggil.
          </Typography>
          <Typography
            sx={{ color: "#878787ff", textAlign: "center", fontSize: 12 }}
          >
            Akan terdapat notifikasi pada kartu antrian anda.
          </Typography>
        </Grid>
        <Grid marginTop={2} size={{ md: 12, xs: 12 }}>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-xl transition-all duration-300 transform hover:shadow-lg active:scale-95 text-lg"
          >
            Refesh Status
          </button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardGuest;
