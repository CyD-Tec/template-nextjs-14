import { memo, useEffect } from "react";

// material-ui
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import useConfig from "@/hooks/useConfig";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";

import { HORIZONTAL_MAX_ITEM } from "@/config";
import { LAYOUT_CONST } from "@/constant";
import menuItem from "@/menu-items";
import { useSelector } from "@/store";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const theme = useTheme();
  const { layout } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);

  const handlerMenuItem = () => {
    const isFound = menuItem.items.some((element) => {
      if (element.id === "widget") {
        return true;
      }
      return false;
    });

  };

  useEffect(() => {
    handlerMenuItem();
    // eslint-disable-next-line
  }, []);

  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  // last menu-item to show in horizontal menu bar
  const lastItem =
    layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd
      ? HORIZONTAL_MAX_ITEM
      : null;

  let lastItemIndex = menuItem.items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < menuItem.items.length) {
    lastItemId = menuItem.items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = menuItem.items
      .slice(lastItem - 1, menuItem.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      case "item":
        return <NavItem key={item.id} item={item} level={1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error .
          </Typography>
        );
    }
  });

  return layout === LAYOUT_CONST.VERTICAL_LAYOUT ||
    (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
    <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>
  ) : (
    <>{navItems}</>
  );
};

export default memo(MenuList);
