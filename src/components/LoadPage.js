import { Grid, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import logo from "/public/assets/images/cydocs-transparente.webp";

function LoadPage({ label }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ mt: "10vh" }}
    >
      <Grid item xs={12} sx={{ mx: "10%" }}>
        <Image
          style={{
            height: "20vh",
            width: "auto",
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={logo}
          priority={true}
          alt="logo"
        />
      </Grid>
      <Grid item xs={12} sx={{ mx: "20%" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          {label && (
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ pb: 2 }}>
                {label}
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "500px !important",
            }}
          >
            <LinearProgress color="primary"></LinearProgress>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoadPage;
