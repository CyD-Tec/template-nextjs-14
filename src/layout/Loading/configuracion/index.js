"use client";
import MainCard from "@/components/MainCard";
import {
    CardContent,
    Grid,
    Skeleton,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from "@mui/material";
// import { borderRadius } from "@/config";
import useConfig from "@/hooks/useConfig";
import PropTypes from "prop-types";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function LayoutConf({ tabsOption, children }) {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  return (
    <MainCard title={"Configuración del sistema"} content={false}>
      <Grid container>
        <Grid item xs={12} lg={2}>
          <CardContent>
            <Tabs
              value={0}
              // onChange={handleChange}
              orientation="vertical"
              variant="scrollable"
              sx={{
                "& .MuiTabs-flexContainer": {
                  borderBottom: "none",
                },
                "& button": {
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[600]
                      : theme.palette.grey[600],
                  minHeight: "auto",
                  minWidth: "100%",
                  // py: 1.5,
                  // px: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  borderRadius: `${borderRadius}px`,
                },
                "& button.Mui-selected": {
                  color: theme.palette.primary.main,
                  background:
                    theme.palette.mode === "dark"
                      ? theme.palette.dark.main
                      : theme.palette.grey[50],
                },
                "& button > svg": {
                  marginBottom: "0px !important",
                  marginRight: 1.25,
                  // marginTop: 1.25,
                  height: 20,
                  width: 20,
                },
                "& button > div > span": {
                  display: "block",
                },
                "& > div > span": {
                  display: "none",
                },
              }}
            >
              {tabsOption.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={
                    <Grid container>
                      <Typography variant="subtitle1" color="inherit">
                        {tab.label}
                      </Typography>
                    </Grid>
                  }
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </CardContent>
        </Grid>
        <Grid item xs={12} lg={10}>
          <CardContent
            sx={{
              borderLeft: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : theme.palette.grey[200],
              height: "100%",
            }}
          >
            {children ? (
              children
            ) : (
              <Skeleton variant="rounded" width={"100%"} height={"83vh"} />
            )}
          </CardContent>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default LayoutConf;
