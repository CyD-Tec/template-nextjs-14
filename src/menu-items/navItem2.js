// assets
import {
  IconBasket,
  IconCalendar,
  IconCalendarTime,
  IconClipboardCheck,
  IconHome,
  IconLayoutKanban,
  IconMail,
  IconMessages,
  IconNfc,
  IconSettings,
  IconUserCheck,
} from "@tabler/icons-react";

// constant
const icons = {
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
  IconSettings,
  IconHome,
  IconCalendarTime,
  IconClipboardCheck,
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const NavItem2 = {
  id: "navItemGroup2",
  title: "Item 2",
  type: "item",
  divider: true,
  icon: icons.IconClipboardCheck,
  url: "/proceso",
  breadcrumbs: false,
  children: []
};

export default NavItem2;
