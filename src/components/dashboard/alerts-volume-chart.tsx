import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { alertsVolume } from "@/lib/mock/alerts";

export function AlertsVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={alertsVolume} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
        <XAxis
          dataKey="day"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
          contentStyle={{
            background: "rgb(15 17 22)",
            border: "1px solid rgb(40 43 52)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "#cbd5e1" }}
        />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        <Bar dataKey="critical" stackId="a" fill="#f43f5e" name="Críticos" radius={[0, 0, 0, 0]} />
        <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Avisos" />
        <Bar dataKey="info" stackId="a" fill="#38bdf8" name="Info" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
