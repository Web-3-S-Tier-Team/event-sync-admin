import { useGetList } from "react-admin";

export interface DashboardStats {
  totalEvents: number | undefined;
  upcomingEvents: number | undefined;
  cancelledEvents: number | undefined;
  totalCapacity: number;
  totalRegistered: number;
  avgFillRate: number;
  isPending: boolean;
}

export const useDashboardStats = (): DashboardStats => {
  const { total: totalEvents, isPending: p1 } = useGetList("events", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: upcomingEvents, isPending: p2 } = useGetList("events", {
    pagination: { page: 1, perPage: 1 },
    filter: { status: "upcoming" },
  });

  const { total: cancelledEvents, isPending: p3 } = useGetList("events", {
    pagination: { page: 1, perPage: 1 },
    filter: { status: "cancelled" },
  });

  // Fetch all events to compute capacity / fill-rate stats
  const { data: allEvents, isPending: p4 } = useGetList("events", {
    pagination: { page: 1, perPage: 1000 },
  });

  const totalCapacity = allEvents?.reduce((sum, e) => sum + (e.capacity ?? 0), 0) ?? 0;
  const totalRegistered = allEvents?.reduce((sum, e) => sum + (e.registeredCount ?? 0), 0) ?? 0;
  const avgFillRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;

  return {
    totalEvents,
    upcomingEvents,
    cancelledEvents,
    totalCapacity,
    totalRegistered,
    avgFillRate,
    isPending: p1 || p2 || p3 || p4,
  };
};
