import { Grid, LinearProgress, Typography } from "@mui/material";
import logo from "/public/assets/images/cydocs-transparente.webp";
import Image from "next/image";

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
      <Grid item xs={6}>
        <Image
          style={{
            height: "43vh",
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "auto",
          }}
          src={logo}
          priority={true}
          alt="logo"
        />
        {label && (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h3" sx={{ pb: 2 }}>
                {label}
              </Typography>
            </Grid>
          </Grid>
        )}
        <LinearProgress
          color="primary"
          style={{ marginLeft: "10vh", marginRight: "10vh" }}
        ></LinearProgress>
      </Grid>
    </Grid>
  );
}

export default LoadPage;
