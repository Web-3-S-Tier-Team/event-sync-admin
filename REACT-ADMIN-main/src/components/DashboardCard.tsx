import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string | undefined;
  isPending?: boolean;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

export const DashboardCard = ({
  title,
  value,
  isPending = false,
  icon,
  color,
  subtitle,
}: DashboardCardProps) => (
  <Card
    sx={{
      borderRadius: 3,
      borderLeft: `4px solid ${color}`,
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: `0 10px 28px ${color}2e`,
      },
    }}
  >
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 2.5 }}>
      <Box
        sx={{
          color,
          bgcolor: `${color}17`,
          borderRadius: 2.5,
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          "& svg": { fontSize: 26 },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {title}
        </Typography>
        {isPending ? (
          <CircularProgress size={24} sx={{ color, mt: 0.5 }} />
        ) : (
          <Typography variant="h4" fontWeight={800} color="text.primary" lineHeight={1.2}>
            {value ?? 0}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);
