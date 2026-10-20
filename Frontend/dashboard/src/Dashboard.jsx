import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';

function Dashboard() {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [logs, setLogs] = useState([]);

  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('http://localhost:5056/api/devices/read/1');
      const data = response.data;
      
      setDeviceData(data);
      setError(null);
      setLastUpdated(new Date().toLocaleTimeString());

      setLogs((prevLogs) => [
        { time: new Date().toLocaleTimeString(), value: data?.value, status: data?.status },
        ...prevLogs.slice(0, 4)
      ]);
    } catch (err) {
      setError('無法連線至後端 API / 設備通訊失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
    const interval = setInterval(fetchDeviceData, 2000);
    return () => clearInterval(interval);
  }, []);

  const isNormal = deviceData?.status === 'Normal';

  return (
    <div className="scada-container">
      {/* 頂部導覽與狀態列 */}
      <header className="scada-header">
        <div className="header-title">
          <div className="scada-logo-icon">⚡</div>
          <div>
            <h1>IIoT 智慧抄表與 SCADA 監控面板</h1>
            <p className="subtitle">Industrial IoT Smart Metering & SCADA System</p>
          </div>
        </div>

        <div className="header-status-bar">
          <div className="status-item">
            <span className="label">系統時間</span>
            <span className="value">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="status-item">
            <span className="label">輪詢間隔</span>
            <span className="value pulse-text">2s 秒</span>
          </div>
          <div className={`connection-badge ${error ? 'offline' : 'online'}`}>
            <span className="status-dot"></span>
            {error ? '離線 (Offline)' : '連線中 (Online)'}
          </div>
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className="scada-main">
        {/* 左：核心設備卡片 */}
        <div className="grid-column">
          <div className={`scada-card ${error ? 'card-error' : ''}`}>
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-icon">📊</span>
                <h3>電表設備 #1 (Meter System)</h3>
              </div>
              <button className="refresh-btn" onClick={fetchDeviceData} title="手動重新整理">
                🔄
              </button>
            </div>

            <div className="card-body">
              {error ? (
                <div className="error-box">
                  <span className="error-icon">⚠️</span>
                  <div>
                    <h4>通訊中斷</h4>
                    <p>{error}</p>
                  </div>
                </div>
              ) : loading ? (
                <div className="loading-box">
                  <div className="spinner"></div>
                  <p>資料載入中...</p>
                </div>
              ) : (
                <>
                  {/* 主要數據展示區 */}
                  <div className="metric-display">
                    <span className="metric-label">即時電力數值</span>
                    <div className="metric-value-wrapper">
                      <span className="metric-value">{deviceData?.value ?? '--'}</span>
                      <span className="metric-unit">kWh</span>
                    </div>
                  </div>

                  {/* 設備狀態列 */}
                  <div className="info-row">
                    <span className="info-label">設備狀態</span>
                    <span className={`status-badge ${isNormal ? 'status-normal' : 'status-warning'}`}>
                      <span className="badge-dot"></span>
                      {deviceData?.status || '未定義'}
                    </span>
                  </div>

                  {/* 更新時間列 */}
                  <div className="info-row">
                    <span className="info-label">最後更新時間</span>
                    <span className="info-value">{lastUpdated || '--'}</span>
                  </div>
                </>
              )}
            </div>

            <div className="card-footer">
              <span className="device-id">ID: DEV-001-MTR</span>
              <span className="protocol">Protocol: Modbus/TCP</span>
            </div>
          </div>
        </div>

        {/* 右：輔助資訊與即時 Log 日誌 */}
        <div className="grid-column">
          {/* 系統即時日誌 */}
          <div className="scada-card">
            <div className="card-header">
              <div className="card-title-group">
                <span className="card-icon">📜</span>
                <h3>即時採樣紀錄 (Real-time Logs)</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="log-list">
                {logs.length === 0 ? (
                  <p className="no-data">尚無紀錄...</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="log-item">
                      <span className="log-time">[{log.time}]</span>
                      <span className="log-val">{log.value} kWh</span>
                      <span className={`log-status ${log.status === 'Normal' ? 'text-success' : 'text-danger'}`}>
                        {log.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;