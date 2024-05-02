// "use client";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";

// material-ui
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { LAYOUT_CONST } from "@/constant";
import useConfig from "@/hooks/useConfig";
import { useDispatch, useSelector } from "@/store";
import { activeID, activeItem, openDrawer } from "@/store/slices/menu";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { usePathname } from "next/navigation";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level, parentId, isParents = false }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const { layout, borderRadius } = useConfig();

  const { selectedItem, drawerOpen } = useSelector((state) => state.menu);

  const isSelected =
    selectedItem &&
    typeof selectedItem !== "string" &&
    selectedItem.findIndex((id) => id === item.id) > -1;

  const newURL = useMemo(() => {
    let url = item.url;
    return url;
  }, []);

  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? "20px" : "24px"}
      style={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        ...(layout === LAYOUT_CONST.HORIZONTAL_LAYOUT &&
          isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const arrActiveItems = useMemo(() => {
    const arr = [];
    if (parentId) arr.push(parentId);
    arr.push(item.id);
    return arr;
  }, []);

  const itemHandler = (id) => {
    dispatch(activeItem(arrActiveItems));
    if (matchesSM) dispatch(openDrawer(false));
    dispatch(activeID(parentId));
  };

  useEffect(() => {
    if (item.url === pathname) {
      dispatch(activeID(item.id));
      dispatch(activeItem(arrActiveItems));
    }
  }, [pathname]);

  return (
    <>
      <ListItemButton
        component={Link}
        href={newURL}
        target={itemTarget}
        disabled={item.disabled}
        {...(isParents && {
          onClick: () => {
            dispatch(activeID(item.id));
          },
        })}
        sx={{
          borderRadius: `${borderRadius}px`,
          // borderRadius: isParents ? `${borderRadius}px` : 0,
          mb: isParents ? 0 : 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: 1,
          pl: 2,
          mr: isParents ? 1 : 0,
          ml: isParents ? 4 : 0,
        }}
        selected={isSelected}
        onClick={() => itemHandler(item.id)}
      >
        <ListItemIcon
          sx={{
            my: "auto",
            mx: "auto",
            minWidth: !item?.icon ? 18 : 36,
          }}
        >
          {itemIcon}
        </ListItemIcon>

        {drawerOpen && (
          <ListItemText
            primary={
              <Typography
                variant={isSelected ? "h5" : "body1"}
                color="inherit"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )
            }
          />
        )}

        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  parentId: PropTypes.string,
  isParents: PropTypes.bool,
};

export default NavItem;
