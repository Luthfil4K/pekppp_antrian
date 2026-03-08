import React from "react";
import { useState, useEffect } from "react";
import { updateStatusByAdmin } from "../services/status";

import { Card, Typography, Grid, Button, Chip } from "@mui/material";

const CardDashboard = ({data,boxColor,warnaBorder,warnaFont,boxDesc}) => {
  return (
    <Card
      sx={{
        height: 110,
        p: 2,
        borderRadius: 4,
        border: `1px solid ${warnaBorder}`, 
        boxShadow: "none", 
        transition: "all 0.2s ease", 
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
        backgroundColor:`${boxColor}`
      }}
    >
      <Grid container>
        <Grid size={{ md: 12, xs: 12 }}>
          <Typography variant="h4" sx={{fontWeight:800, color:`${warnaFont}`}}>{data}</Typography>
        </Grid>
        <Grid sx={{marginTop:0}} size={{ md: 12, xs: 12 }}>
          <Typography sx={{color:`${warnaFont}`}} variant="body2">{boxDesc}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardDashboard;
