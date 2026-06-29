import { Menu } from "react-admin";
import EventIcon from "@mui/icons-material/Event";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem leftIcon={<DashboardIcon />} />
    <Menu.ResourceItem name="events" leftIcon={<EventIcon />} />
  </Menu>
);
