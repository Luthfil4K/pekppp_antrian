"use client";

import { useEffect, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import { GetAllQueueTodayAdmin } from "../services/queue";
import PeopleIcon from "@mui/icons-material/People";

import CardQueue from "../components/CardQueue";
import CardDashboard from "../components/CardDashboard";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

import { io } from "socket.io-client";

const ScanPage = () => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [waiting, setWaiting] = useState(0);
  const [called, setCalled] = useState(0);
  const [done, setDone] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allQueue, setAllQueue] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [tanggal, setTanggal] = useState(null);
  const [number, setNumber] = useState(null);

  const filteredQueue = useMemo(() => {
    if (statusFilter === "ALL") return allQueue;

    return allQueue.filter((q) => q.status === statusFilter);
  }, [allQueue, statusFilter]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const queue = await GetAllQueueTodayAdmin();
        setAllQueue(queue);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const countWaiting = allQueue.filter((q) => q.status === "PENDING").length;
    const countCalled = allQueue.filter((q) => q.status === "CALLED").length;
    const countDone = allQueue.filter((q) => q.status === "DONE").length;

    setWaiting(countWaiting);
    setCalled(countCalled);
    setDone(countDone);
  }, [allQueue]);

  useEffect(() => {
  socket.on("post-queue", (newQueue) => {
    setAllQueue((prev) => [newQueue, ...prev]);
  });

  return () => {
    socket.off("post-queue");
  };
}, []);


  return isLoading ? (
    <></>
  ) : (
    <>
      <Grid
        width={"100%"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        container
      >
        {/* <Grid sx={{backgroundColor:'gray', maxWidth: 1300 }} size={{ md: 12, xs: 12 }}> */}
        <Grid sx={{ maxWidth: 1300 }} size={{ md: 12, xs: 12 }}>
          <Box>
            <Grid sx={{ marginTop: 4 }} container>
              <Grid sx={{ paddingLeft: 6 }} size={{ md: 6, xs: 6 }}>
                <Typography
                  color="#474747ff"
                  fontWeight={600}
                  sx={{ ontFamily: "Poppins, sans-serif" }}
                  variant={"h4"}
                >
                  Queue Dashboard
                </Typography>
                <Typography
                  color="#4a4a4aff"
                  fontWeight={400}
                  sx={{ ontFamily: "Poppins, sans-serif" }}
                  variant={"body2"}
                >
                  Manage and monitor all queue entries
                </Typography>
              </Grid>
              <Grid
                size={{ md: 6, xs: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  paddingRight: 6,
                }}
              >
                <Typography
                  color="#4a4a4aff"
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <PeopleIcon fontSize="small" />
                  {allQueue?.length} Total
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              padding: 5,
              gap: 2,
              backgroundColor: "white",
              alignItems: "start",
              justifyContent: "center",
            }}
          >

            {/* dashboard card */}
            <Grid container display={"flex"} sx={{ width: "100%" }} spacing={2}>
              <Grid size={{ md: 4, sm: 12, xs: 12 }}>
                <CardDashboard
                  data={waiting}
                  boxColor={"#F7F1E4"}
                  warnaBorder={"#dbc38eff"}
                  warnaFont={"#D09B2A"}
                  boxDesc={"Waiting"}
                ></CardDashboard>
              </Grid>
              <Grid size={{ md: 4, sm: 12, xs: 12 }}>
                <CardDashboard
                  data={called}
                  boxColor={"#D4EFFC"}
                  warnaBorder={"#73b4dcff"}
                  warnaFont={"#1B87C9"}
                  boxDesc={"Called"}
                ></CardDashboard>
              </Grid>
              <Grid size={{ md: 4, sm: 12, xs: 12 }}>
                <CardDashboard
                  data={done}
                  boxColor={"#E2F2EF"}
                  warnaBorder={"#61d7b4ff"}
                  warnaFont={"#00A171"}
                  boxDesc={"Done"}
                ></CardDashboard>
              </Grid>
            </Grid>
          </Box>

          {/* filter  */}
          <Box sx={{ paddingX: 5 }}>
            {/* <Typography
              color="#353535ff"
              fontWeight={600}
              fontSize={16}
              sx={{ ontFamily: "Poppins, sans-serif" }}
            >
              All Queues
            </Typography> */}

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="ALL">Semua</MenuItem>
                <MenuItem value="PENDING">Waiting</MenuItem>
                <MenuItem value="CALLED">Called</MenuItem>
                <MenuItem value="DONE">Done</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: 600,
              display: "flex",
              padding: 5,
              gap: 2,
              backgroundColor: "white",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Grid container >
              <Grid size={{ md: 12, sm: 12, xs: 12 }}>
                <Grid
                  container
                  display={"flex"}
                  sx={{ width: "100%" }}
                  spacing={2}
                >
                  {filteredQueue ? (
                    filteredQueue.map((card, index) => (
                      <Grid  key={card?.id} size={{ md: 6, sm: 12, xs: 12 }}>
                        <CardQueue
                          data={card}
                          onUpdateStatus={(newStatus) => {
                            setAllQueue((prev) =>
                              prev.map((q) =>
                                q.id === card.id
                                  ? { ...q, status: newStatus }
                                  : q,
                              ),
                            );
                          }}
                        ></CardQueue>
                      </Grid>
                    ))
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ScanPage;
