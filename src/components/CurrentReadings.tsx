import type { SensorData } from "../types/sensor";

interface CurrentReadingsProps {
  readonly currentData: SensorData | null;
}

export default function CurrentReadings({ currentData }: CurrentReadingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Temperature</p>
        <p className="text-4xl font-bold text-red-500">
          {currentData?.temperature?.toFixed(1) ?? "--"}°C
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Humidity</p>
        <p className="text-4xl font-bold text-blue-500">
          {currentData?.humidity?.toFixed(1) ?? "--"}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Last Update</p>
        <p className="text-lg font-semibold text-gray-700">
          {currentData?.time
            ? new Date(currentData.time).toLocaleTimeString()
            : "--"}
        </p>
      </div>
    </div>
  );
}
