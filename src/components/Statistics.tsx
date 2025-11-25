import type { DataPoint } from "../types/sensor";
import {
  calculateAverage,
  calculateMax,
  calculateMin,
} from "../utils/calculations";

interface StatisticsProps {
  readonly dataHistory: DataPoint[];
}

export default function Statistics({ dataHistory }: StatisticsProps) {
  if (dataHistory.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Temperature Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Average:</span>
            <span className="font-semibold">
              {calculateAverage(dataHistory, "temperature").toFixed(1)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Min:</span>
            <span className="font-semibold">
              {calculateMin(dataHistory, "temperature").toFixed(1)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Max:</span>
            <span className="font-semibold">
              {calculateMax(dataHistory, "temperature").toFixed(1)}°C
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
              {calculateAverage(dataHistory, "humidity").toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Min:</span>
            <span className="font-semibold">
              {calculateMin(dataHistory, "humidity").toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Max:</span>
            <span className="font-semibold">
              {calculateMax(dataHistory, "humidity").toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
