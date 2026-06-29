import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useGetList } from "react-admin";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

const COLORS = ["#1976d2", "#ed6c02", "#2e7d32", "#9c27b0", "#0288d1", "#d32f2f", "#795548"];

const STATUS_LABELS: Record<string, string> = {
  upcoming: "À venir",
  ongoing: "En cours",
  completed: "Terminé",
  cancelled: "Annulé",
};

export default function DashboardCharts() {
  const { data: events, isPending } = useGetList("events", {
    pagination: { page: 1, perPage: 1000 },
  });

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Group by category
  const categoryMap: Record<string, number> = {};
  events?.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] ?? 0) + 1;
  });
  const categoryData = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  // Group by status
  const statusMap: Record<string, number> = {};
  events?.forEach((e) => {
    const label = STATUS_LABELS[e.status] ?? e.status;
    statusMap[label] = (statusMap[label] ?? 0) + 1;
  });
  const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
      {/* Bar chart by category */}
      <Paper sx={{ p: 3, flex: "1 1 400px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Événements par catégorie
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Pie chart by status */}
      <Paper sx={{ p: 3, flex: "1 1 300px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Statut des événements
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {statusData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
