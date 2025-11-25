import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MAX_DATA_POINTS } from "../config/constants";
import type { DataPoint, MqttStatus, SensorData } from "../types/sensor";

interface UseSocketReturn {
  isConnected: boolean;
  mqttConnected: boolean;
  currentData: SensorData | null;
  dataHistory: DataPoint[];
}

export function useSocket(): UseSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [mqttConnected, setMqttConnected] = useState(false);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [dataHistory, setDataHistory] = useState<DataPoint[]>([]);

  useEffect(() => {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
    const newSocket: Socket = io(socketUrl);

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("sensorData", (data: SensorData) => {
      setCurrentData(data);
      setDataHistory((prev) => {
        const updated = [...prev, data];
        return updated.slice(-MAX_DATA_POINTS);
      });
    });

    newSocket.on("mqttStatus", (status: MqttStatus) => {
      setMqttConnected(status.connected);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return {
    isConnected,
    mqttConnected,
    currentData,
    dataHistory,
  };
}
