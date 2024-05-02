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

const NavItem1 = {
  id: "navItem1",
  title: "Nav Items 1",
  type: "group",
  children: [
    {
      id: "navItem1",
      title: "item 1",
      type: "item",
      icon: icons.IconClipboardCheck,
      url: "/nav-item-1",
      breadcrumbs: false,
    },
    {
      id: "navItem2",
      title: "item 2",
      type: "item",
      icon: icons.IconClipboardCheck,
      url: "/nav-item-2",
      breadcrumbs: false,
    },
    {
      id: "itemCollapse",
      title: "Personas",
      type: "collapse",
      icon: icons.IconSettings,
      breadcrumbs: false,
      children: [
        {
          id: "itemCollapse-3",
          title: "Vigentes",
          type: "item",
          url: "nav-item-3-1",
          // es necesario para que funcione el active en menu
          breadcrumbs: false,
        },
        {
          id: "itemCollapse-4",
          title: "Históricos",
          type: "item",
          url: "itemCollapse-3-2",
          breadcrumbs: false,
        },
      ]
    },
  ],
};


export default NavItem1;
