import { LAYOUT_CONST } from "@/constant";
import { Roboto } from "next/font/google";

export const BASE_PATH = "/";
export const HOME_PATH = "/nav-item-1";
export const HORIZONTAL_MAX_ITEM = 7;

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const initialStateMenu = {
  selectedItem: ["navItem1"],
  selectedID: null,
  drawerOpen: true,
  error: null,
  menu: {},
};

const config = {
  layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
  drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
  fontFamily: roboto.style.fontFamily,
  borderRadius: 8,
  outlinedFilled: true,
  navType: "light", // light, dark
  presetColor: "theme2", // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: "en", // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  container: false,
};

export default config;
