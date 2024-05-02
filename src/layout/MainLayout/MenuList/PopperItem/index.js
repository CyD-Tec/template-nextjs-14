import { useDispatch, useSelector } from "@/store";
import { ListItemButton, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { useTheme } from "@mui/material/styles";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { activeID, activeItem } from "@/store/slices/menu";

import PropTypes from "prop-types";

const PopperItem = ({ item, isSelected, parentId }) => {
  const { selectedItem } = useSelector((state) => state.menu);

  const theme = useTheme();

  const { contratoID } = useParams();

  const dispatch = useDispatch();

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const newURL = useMemo(() => {
    let url = item.url;
    if (contratoID) {
      url = `/contrato/${contratoID}/${item.url}`;
    }
    return url;
  }, [contratoID]);

  const itemHandler = (id) => {
    const arr = []
    if(parentId) arr.push(parentId)
    arr.push(id)
    dispatch(activeItem(arr));
    dispatch(activeID(parentId));
  };

  return (
    <ListItemButton
      component={Link}
      href={newURL}
      target={itemTarget}
      disabled={item.disabled}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
      onClick={() => itemHandler(item.id)}
    >
      <FiberManualRecordIcon
        sx={{
          color: isSelected
            ? theme.palette.secondary.main
            : theme.palette.text.primary,
          width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
          height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        }}
      />
      {/* <ListItemIcon
        sx={{
        }}
      >
        <FiberManualRecordIcon
          sx={{
            color: isSelected
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
            width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
            height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
          }}
        />
      </ListItemIcon> */}
      <Typography
        variant={isSelected ? "h5" : "body1"}
        color="inherit"
        sx={{
          ml: "7px",
        }}
      >
        {item.title}
      </Typography>
    </ListItemButton>
  );
};

PopperItem.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
  parentId: PropTypes.string,
};

export default PopperItem;
