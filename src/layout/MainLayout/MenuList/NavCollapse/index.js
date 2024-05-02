import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import {
  Box,
  ClickAwayListener,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import Transitions from "@/components/Transitions";
import NavItem from "../NavItem";

import PopperItem from "../PopperItem";

import { useSelector } from "@/store";

// assets
import useConfig from "@/hooks/useConfig";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

// mini-menu - wrapper
const PopperStyledMini = styled(Popper)(({ theme }) => ({
  overflow: "visible",
  zIndex: 1202,
  minWidth: 180,
  "&:before": {
    content: '""',
    backgroundColor: theme.palette.background.paper,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 120,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// horizontal-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: "visible",
  zIndex: 1202,
  minWidth: 180,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 34,
    left: -5,
    width: 12,
    height: 12,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 120,
    borderWidth: "6px",
    borderStyle: "solid",
    borderColor: `transparent transparent ${theme.palette.background.paper}  ${theme.palette.background.paper}`,
  },
  '&[data-popper-placement="left-start"]:before': {
    left: "auto",
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`,
  },
  '&[data-popper-placement="left-end"]:before': {
    top: "auto",
    bottom: 15,
    left: "auto",
    right: -5,
    borderColor: `${theme.palette.background.paper}  ${theme.palette.background.paper} transparent transparent`,
  },
  '&[data-popper-placement="right-end"]:before': {
    top: "auto",
    bottom: 15,
  },
}));

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level, parentId }) => {
  const theme = useTheme();

  const hookConf = useConfig();
  const { layout, borderRadius } = hookConf;
  const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMini = (event) => {
    setAnchorEl(null);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handleHover = (event) => {
    setAnchorEl(null);
  };

  const handleClosePopper = () => {
    setOpen(false);
    setSelected(null);
    setAnchorEl(null);
  };

  const openMini = Boolean(anchorEl);
  const pathname = usePathname();

  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (pathname.includes(item.url)) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    setSelected(null);
    if (openMini) setAnchorEl(null);
    if (menu.children && selectedItem && typeof selectedItem !== "string") {
      menu.children.forEach((item) => {
        const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;
        if (isSelected) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        console.log('collapse',item, parentId)
        return (
          <NavCollapse
            key={item.id}
            menu={item}
            level={level + 1}
            parentId={item?.children?.length > 0 ? item.id : parentId}
          />
        );
      case "item":
        return (
          <NavItem
            isParents
            key={item.id}
            item={item}
            level={level + 1}
            parentId={menu.id}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const isSelected =
    selectedItem && selectedItem.findIndex((id) => id === selected) > -1;

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size={drawerOpen ? "20px" : "24px"}
      style={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        width: isSelected ? 8 : 6,
        height: isSelected ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  // Para los  iconos dell collapse segun el estado
  const GenerateIconCollapse = () => {
    if (drawerOpen) {
      if (open) {
        return (
          <IconChevronUp
            stroke={1.5}
            size="16px"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        );
      }
      return (
        <IconChevronDown
          stroke={1.5}
          size="16px"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      );
    }
  };

  const textColor = theme.palette.mode === "dark" ? "grey.400" : "text.primary";
  const iconSelectedColor =
    theme.palette.mode === "dark" && drawerOpen
      ? "text.primary"
      : "secondary.main";

  const popperId = openMini ? `collapse-pop-${menu.id}` : undefined;

  return (
    <>
      <ListItemButton
        sx={{
          zIndex: 1201,
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          pl: drawerOpen ? `${level * 24}px` : 1.25,
          ...(drawerOpen &&
            level === 1 &&
            theme.palette.mode !== "dark" && {
              "&:hover": {
                background: theme.palette.secondary.light,
              },
              "&.Mui-selected": {
                background: theme.palette.secondary.light,
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  background: theme.palette.secondary.light,
                },
              },
            }),
          ...((!drawerOpen || level !== 1) && {
            py: level === 1 ? 0 : 1,
            "&:hover": {
              bgcolor: theme.palette.secondary.light,
            },
            "&.Mui-selected": {
              "&:hover": {
                bgcolor: "transparent",
              },
              bgcolor: theme.palette.secondary.light,
            },
          }),
          borderRadius: `${borderRadius}px`,
          mb: 0, //: 0.5,
          alignItems: "flex-start",
          py: 1,
          pl: 2,
        }}
        selected={isSelected}
        {...(!drawerOpen && {
          onMouseEnter: handleClickMini,
          onMouseLeave: handleHover,
        })}
        onClick={handleClickMini}
      >
        {menuIcon && (
          <ListItemIcon
            sx={{
              my: "auto",
              mx: "auto",
              minWidth: 36,
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography
                variant={isSelected ? "h5" : "body1"}
                color="inherit"
                sx={{ my: "auto" }}
              >
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {menu.caption}
                </Typography>
              )
            }
          />
        )}
        <GenerateIconCollapse />
        {!drawerOpen && (
          <PopperStyledMini
            open={openMini}
            anchorEl={anchorEl}
            placement="right-start"
            style={{
              zIndex: 2001,
            }}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [-12, 0],
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Transitions in={openMini} {...TransitionProps}>
                <Paper
                  sx={{
                    overflow: "hidden",
                    mt: 1.5,
                    boxShadow: theme.shadows[8],
                    backgroundImage: "none",
                  }}
                >
                  <ClickAwayListener onClickAway={handleClosePopper}>
                    <Box>
                      {menu.children?.map((item, idx) => {
                        return (
                          <PopperItem
                            key={`${idx}_keyItemPopper`}
                            item={item}
                            isSelected={isSelected}
                            parentId={parentId}
                          />
                        );
                      })}
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </PopperStyledMini>
        )}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {open && (
            <List
              component="div"
              disablePadding
              sx={{
                position: "relative",
                "&:after": {
                  content: "''",
                  position: "absolute",
                  left: "32px",
                  top: 0,
                  height: "100%",
                  width: "1px",
                  opacity: theme.palette.mode === "dark" ? 0.2 : 1,
                  background:
                    theme.palette.mode === "dark"
                      ? theme.palette.dark.light
                      : theme.palette.primary.light,
                },
              }}
            >
              {menus}
            </List>
          )}
        </Collapse>
      )}
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  parentId: PropTypes.string,
};

export default NavCollapse;
