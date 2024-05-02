import PropTypes from "prop-types";

// PROJECT IMPORTS
import MainLayout from "@/layout/MainLayout";

export const metadata = {
  title: "Nav items group 1",
  description: "A description",
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function ReportesLayout({ children }) {
  return <MainLayout>{children}</MainLayout>;
}

ReportesLayout.propTypes = {
  children: PropTypes.node,
};
