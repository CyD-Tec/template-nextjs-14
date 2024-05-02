import PropTypes from "prop-types";
import "./globals.css";
import ProviderWrapper from "@/store/ProviderWrapper";

export const metadata = {
  title: "CyD Template",
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
