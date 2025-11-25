import { useSocket } from "../hooks/useSocket";
import ConnectionStatus from "./ConnectionStatus";
import CurrentReadings from "./CurrentReadings";
import SensorChart from "./SensorChart";
import Statistics from "./Statistics";

export default function Dashboard() {
  const { isConnected, mqttConnected, currentData, dataHistory } = useSocket();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">IoT Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time temperature and humidity monitoring
          </p>
        </div>

        {/* Connection Status */}
        <ConnectionStatus
          isConnected={isConnected}
          mqttConnected={mqttConnected}
        />

        {/* Current Readings */}
        <CurrentReadings currentData={currentData} />

        {/* Chart */}
        <SensorChart dataHistory={dataHistory} />

        {/* Statistics */}
        <Statistics dataHistory={dataHistory} />
      </div>
    </div>
  );
}
