import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SensorData {
  temperature: number;
  humidity: number;
  time: string;
}

interface MqttStatus {
  connected: boolean;
}

interface DataPoint {
  temperature: number;
  humidity: number;
  time: string;
}

const MAX_DATA_POINTS = 20;

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [mqttConnected, setMqttConnected] = useState(false);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [dataHistory, setDataHistory] = useState<DataPoint[]>([]);

  useEffect(() => {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    const newSocket = io(socketUrl);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('sensorData', (data: SensorData) => {
      setCurrentData(data);
      setDataHistory((prev) => {
        const updated = [...prev, data];
        return updated.slice(-MAX_DATA_POINTS);
      });
    });

    newSocket.on('mqttStatus', (status: MqttStatus) => {
      console.log({ status });
      setMqttConnected(status.connected);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const chartData = {
    labels: dataHistory.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dataHistory.map((d) => d.temperature),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: dataHistory.map((d) => d.humidity),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature & Humidity History',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Humidity (%)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Socket Connection</p>
              <p className="text-lg font-semibold">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div
              className={`w-4 h-4 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Data Source (MQTT)</p>
              <p className="text-lg font-semibold">
                {mqttConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div
              className={`w-4 h-4 rounded-full ${
                mqttConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>

        {/* Current Readings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Temperature</p>
            <p className="text-4xl font-bold text-red-500">
              {currentData?.temperature?.toFixed(1) ?? '--'}°C
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Humidity</p>
            <p className="text-4xl font-bold text-blue-500">
              {currentData?.humidity?.toFixed(1) ?? '--'}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-2">Last Update</p>
            <p className="text-lg font-semibold text-gray-700">
              {currentData?.time
                ? new Date(currentData.time).toLocaleTimeString()
                : '--'}
            </p>
          </div>
        </div>

        {/* Chart */}
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

        {/* Statistics */}
        {dataHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Temperature Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-semibold">
                    {(
                      dataHistory.reduce((sum, d) => sum + d.temperature, 0) /
                      dataHistory.length
                    ).toFixed(1)}
                    °C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min:</span>
                  <span className="font-semibold">
                    {Math.min(...dataHistory.map((d) => d.temperature)).toFixed(
                      1
                    )}
                    °C
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max:</span>
                  <span className="font-semibold">
                    {Math.max(...dataHistory.map((d) => d.temperature)).toFixed(
                      1
                    )}
                    °C
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Humidity Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-semibold">
                    {(
                      dataHistory.reduce((sum, d) => sum + d.humidity, 0) /
                      dataHistory.length
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min:</span>
                  <span className="font-semibold">
                    {Math.min(...dataHistory.map((d) => d.humidity)).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max:</span>
                  <span className="font-semibold">
                    {Math.max(...dataHistory.map((d) => d.humidity)).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
