export interface SensorData {
  temperature: number;
  humidity: number;
  time: string;
}

export interface MqttStatus {
  connected: boolean;
}

export interface DataPoint {
  temperature: number;
  humidity: number;
  time: string;
}
