export function SensorStatus() {
  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-medium mb-4 uppercase text-sm tracking-wider">Hardware Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-gray-200">MPU6050 - SENSOR 01</div>
              <div className="text-xs text-gray-500">Accel & Gyro</div>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded border border-cyan-800/50">Simulated</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-gray-200">MPU6050 - SENSOR 02</div>
              <div className="text-xs text-gray-500">Accel & Gyro</div>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded border border-cyan-800/50">Simulated</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-gray-200">DHT11</div>
              <div className="text-xs text-gray-500">Environment</div>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-cyan-900/30 text-cyan-400 rounded border border-cyan-800/50">Simulated</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div>
              <div className="text-sm font-medium text-gray-400">ESP32 Microcontroller</div>
              <div className="text-xs text-gray-600">IoT Gateway</div>
            </div>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-900/50 text-gray-500 rounded border border-gray-800">Not Connected</span>
        </div>
      </div>
    </div>
  );
}
