import React from "react";
import { Container, Grid, Card, Skeleton } from "@mui/material";

function Loading() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card className="mb-3 ms-3 mr-5">
            <Skeleton
              sx={{ height: 230 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
          <Card className="mb-3 ms-3 mr-5">
            <Skeleton
              sx={{ height: 300 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card sx={{ marginBottom: "20px" }}>
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
          <Card sx={{ marginBottom: "20px" }}>
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
          <Card sx={{ marginBottom: "20px" }}>
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
          <Card sx={{ marginBottom: "20px" }}>
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Loading;
