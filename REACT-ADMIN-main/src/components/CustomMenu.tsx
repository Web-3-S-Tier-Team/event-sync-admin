import { Menu, usePermissions } from "react-admin";
import EventIcon from "@mui/icons-material/Event";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const CustomMenu = () => {
  const { permissions } = usePermissions();
  const canDiscover = permissions === "admin" || permissions === "organisateur";

  return (
    <Menu>
      <Menu.DashboardItem leftIcon={<DashboardIcon />} />
      {canDiscover && <Menu.ResourceItem name="discovery" leftIcon={<TravelExploreIcon />} />}
      <Menu.ResourceItem name="events" leftIcon={<EventIcon />} />
    </Menu>
  );
};
