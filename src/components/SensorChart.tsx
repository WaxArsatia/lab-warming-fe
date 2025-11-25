import { Line } from "react-chartjs-2";
import type { DataPoint } from "../types/sensor";
import { chartOptions } from "../utils/chartConfig";

interface SensorChartProps {
  readonly dataHistory: DataPoint[];
}

export default function SensorChart({ dataHistory }: SensorChartProps) {
  const chartData = {
    labels: dataHistory.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: "Temperature (°C)",
        data: dataHistory.map((d) => d.temperature),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        yAxisID: "y",
      },
      {
        label: "Humidity (%)",
        data: dataHistory.map((d) => d.humidity),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-96">
        {dataHistory.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Waiting for data...
          </div>
        )}
      </div>
    </div>
  );
}
