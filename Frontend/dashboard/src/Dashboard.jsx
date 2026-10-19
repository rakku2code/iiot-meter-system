import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Dashboard() {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeviceData = async () => {
    try {
      const response = await axios.get('http://localhost:5056/api/devices/read/1');
      setDeviceData(response.data);
      setError(null);      
    } catch (err) {
      setError('無法連線至後端 API / 設備通訊失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect( () => {
    fetchDeviceData();
    const interval = setInterval(fetchDeviceData, 2000);
    return () => clearInterval(interval);
  }, []);

return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: 'rgb(185, 185, 185)', color: '#fff', minHeight: '100vh' }}>
      <h1> IIoT 智慧抄表與類 SCADA 監控面板</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* 設備卡片 */}
        <div style={{ backgroundColor: '#2d2d2d', padding: '20px', borderRadius: '8px', width: '300px', border: '1px solid #444' }}>
          <h3>電表設備 #1 (Meter System)</h3>
          <hr style={{ borderColor: '#444' }}/>

          {error ? (
            <p style={{ color: '#ff6b6b' }}>{error}</p>
          ) : loading ? (
            <p>載入中...</p>
          ) : (
            <div>
              <p><strong>即時數值：</strong> <span style={{ fontSize: '24px', color: '#4dabf7' }}>{deviceData?.value}</span></p>
              <p><strong>設備狀態：</strong> 
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: deviceData?.status === 'Normal' ? '#2b8a3e' : '#c92a2a',
                  marginLeft: '8px'
                }}>
                  {deviceData?.status}
                </span>
              </p>
              <p style={{ fontSize: '12px', color: '#aaa' }}>最後更新：{new Date(deviceData?.timestamp).toLocaleTimeString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;