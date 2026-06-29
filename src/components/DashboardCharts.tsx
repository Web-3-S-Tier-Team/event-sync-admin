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
import { CATEGORY_TOKENS, CATEGORY_FALLBACK, STATUS_TOKENS, STATUS_FALLBACK } from "../themes/tokens";

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
    fill: (CATEGORY_TOKENS[category] ?? CATEGORY_FALLBACK).color,
  }));

  // Group by status
  const statusMap: Record<string, number> = {};
  events?.forEach((e) => {
    statusMap[e.status] = (statusMap[e.status] ?? 0) + 1;
  });
  const statusData = Object.entries(statusMap).map(([status, value]) => {
    const token = STATUS_TOKENS[status] ?? STATUS_FALLBACK;
    return { name: token.label, value, fill: token.color };
  });

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
      {/* Bar chart by category */}
      <Paper sx={{ p: 3, flex: "1 1 400px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={700}>
          Événements par catégorie
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(107,114,136,0.15)" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip cursor={{ fill: "rgba(107,114,136,0.06)" }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Pie chart by status */}
      <Paper sx={{ p: 3, flex: "1 1 300px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight={700}>
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
              {statusData.map((entry, index) => (
                <Cell key={`pie-cell-${index}`} fill={entry.fill} />
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
