import { Typography, Grid, Divider } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import PercentIcon from "@mui/icons-material/Percent";
import { DashboardCard } from "./components/DashboardCard";
import DashboardCharts from "./components/DashboardCharts";
import { useDashboardStats } from "./hooks/useDashboardStats";

export const Dashboard = () => {
  const {
    totalEvents,
    upcomingEvents,
    cancelledEvents,
    totalCapacity,
    totalRegistered,
    avgFillRate,
    isPending,
  } = useDashboardStats();

  const kpis = [
    {
      title: "Total événements",
      value: totalEvents,
      icon: <EventIcon />,
      color: "#1976d2",
      subtitle: "Tous statuts",
    },
    {
      title: "À venir",
      value: upcomingEvents,
      icon: <EventAvailableIcon />,
      color: "#2e7d32",
      subtitle: "Événements planifiés",
    },
    {
      title: "Annulés",
      value: cancelledEvents,
      icon: <EventBusyIcon />,
      color: "#d32f2f",
      subtitle: "Événements annulés",
    },
    {
      title: "Capacité totale",
      value: totalCapacity,
      icon: <GroupsIcon />,
      color: "#0288d1",
      subtitle: "Places disponibles",
    },
    {
      title: "Inscrits",
      value: totalRegistered,
      icon: <PeopleIcon />,
      color: "#9c27b0",
      subtitle: "Toutes inscriptions",
    },
    {
      title: "Taux de remplissage moyen",
      value: avgFillRate ? `${avgFillRate}%` : undefined,
      icon: <PercentIcon />,
      color: "#ed6c02",
      subtitle: "Inscrits / Capacité",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        📊 Tableau de bord des événements
      </Typography>

      <Grid container spacing={3}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={4} key={kpi.title}>
            <DashboardCard {...kpi} isPending={isPending} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📈 Graphiques
      </Typography>
      <DashboardCharts />
    </div>
  );
};
