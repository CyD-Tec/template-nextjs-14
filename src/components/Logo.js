// material-ui
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from "/public/assets/images/logo_CyDocs.png";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <Image
      src={theme.palette.mode === "dark" ? logo : logo}
      alt="CyD"
      width={110}
      // height={60}
      priority={true}
    ></Image>
  );
};

export default Logo;
