interface ConnectionStatusProps {
  readonly isConnected: boolean;
  readonly mqttConnected: boolean;
}

export default function ConnectionStatus({
  isConnected,
  mqttConnected,
}: ConnectionStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Socket Connection</p>
          <p className="text-lg font-semibold">
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
        <div
          className={`w-4 h-4 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Data Source (MQTT)</p>
          <p className="text-lg font-semibold">
            {mqttConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
        <div
          className={`w-4 h-4 rounded-full ${
            mqttConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
}
