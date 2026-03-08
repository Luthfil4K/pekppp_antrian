import { useState, useEffect } from "react";
import { updateStatusByAdmin } from "../services/status";

import { Card, Typography, Grid, Button, Chip } from "@mui/material";

const CardQueue = ({ data, onUpdateStatus }) => {
  const [prime, setPrime] = useState(null);
  const [jenisLayananId, setJenisLayananId] = useState(null);

  useEffect(() => {
    setPrime(data);

    const layananId = Array.isArray(data?.layanan)
      ? data?.layanan?.[0]?.jenisLayananId
      : data?.layanan?.jenisLayananId;

    setJenisLayananId(layananId);
  }, [data]);

  const toAmPm = (waktu) =>
    new Date(waktu).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Makassar", // 
    });

  const handleStatusByAdmin = async (id, status) => {
    await updateStatusByAdmin({
      id,
      type: status,
    });

    setPrime((prev) => ({
      ...prev,
      status: status,
    }));

    onUpdateStatus(status);
  };

  const colorMap = {
    CANCELLED: "error",
    CALLED: "info",
    PENDING: "warning",
    DONE: "success",
  };

  const renderContent = () => {
    switch (prime?.status) {
      case "CALLED":
        return (
          <Grid size={{ md: 12, sm: 12, xs: 12 }} sx={{ display: "flex" }}>
            <>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleStatusByAdmin(data.id, "DONE")}
              >
                Complete
              </Button>
            </>
          </Grid>
        );
      case "DONE":
        return <></>;
      case "CANCELLED":
        return <></>;
      default:
        return (
          <>
            <Grid
              size={{ md: 6, sm: 6, xs: 12 }}
              sx={{ marginBottom: 1, display: "flex", paddingX: 1 }}
            >
              <Button
                onClick={() => handleStatusByAdmin(data.id, "CALLED")}
                sx={{ borderRadius: 2, boxShadow: 0 }}
                fullWidth
                color="info"
                variant="contained"
              >
                Call
              </Button>
            </Grid>
            <Grid
              size={{ md: 6, sm: 6, xs: 12 }}
              sx={{ marginBottom: 1, display: "flex", paddingX: 1 }}
            >
              <Button
                sx={{ borderRadius: 2 }}
                color="error"
                variant="outlined"
                fullWidth
                onClick={() => handleStatusByAdmin(data.id, "CANCELLED")}
              >
                Cancel
              </Button>
            </Grid>
          </>
        );
    }
  };

  const canClick = prime?.status === "DONE" || prime?.status === "CANCELLED";
  return (
    <Card
      sx={{
        minWidth: 200,
        height: 195,
        p: 2,
        borderRadius: 4,
        border: "1px solid #e0e0e0", // abu-abu border
        boxShadow: "none", // default tanpa shadow
        transition: "all 0.2s ease", // animasi halus
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Grid container>
        <Grid sx={{ height: 75 }} size={{ md: 12, sm: 12, xs: 12 }}>
          <Grid container>
            <Grid size={{ md: 6, sm: 6, xs: 6 }}>
              <Typography
                fontSize={32}
                fontWeight={600}
                sx={{ ontFamily: "Poppins, sans-serif" }}
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
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins, sans-serif", color: "gray" }}
              >
                {toAmPm(data.date)}
              </Typography>
            </Grid>
            <Grid
              sx={{ display: "flex", justifyContent: "end" }}
              size={{ md: 6, sm: 6, xs: 6 }}
            >
              <Chip
                onClick={
                  canClick
                    ? () => handleStatusByAdmin(data.id, "PENDING")
                    : undefined
                }
                clickable={canClick}
                color={colorMap[prime?.status] || "warning"}
                label={prime?.status == "PENDING" ? "WAITING" : prime?.status}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            height: 90,
            flexDirection: "column",
            display: "flex",
            justifyContent: "end",
          }}
          size={{ md: 12, sm: 12, xs: 12 }}
        >
          <Grid container>{renderContent()}</Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardQueue;
