# 智慧抄表與類 SCADA 儀表板系統 (IIoT Metering & Mini-SCADA System)

本專案為輕量化工業物聯網（IIoT）解決方案，整合 **C# .NET Core Web API**、**Modbus TCP 通訊協定**、**Entity Framework Core** 與 **React 前端框架**，實現即時設備數據採集、多產品架構擴充、資料庫自動持久化與類 SCADA/ACS（人機介面）狀態監控儀表板。

---

## 系統架構與技術堆疊

* **後端服務 (Backend)：** C# .NET 8 Web API
* **資料庫與 ORM (Database & ORM)：** SQLite + Entity Framework Core (EF Core)
* **通訊協定 (Communication)：** Modbus TCP (使用 NModbus 套件)
* **前端介面 (Frontend)：** React (Vite) + Axios (支援 2 秒自動輪詢/即時刷新)
* **版本控制 (VCS)：** Git & GitHub
* **開發工具 (IDE)：** VS Code

---

## 專案資料夾結構

```
iiot-meter-system/
├── Backend/
│   ├── MeterApi/            # C# .NET Core Web API (後端服務)
│   │   ├── Controllers/     # API 路由與控制器 (DevicesController.cs)
│   │   ├── Data/            # 資料庫上下文 (AppDbContext.cs)
│   │   ├── Models/          # 資料模型 (Device.cs, MeterLog.cs)
│   │   ├── Services/        # 模組化通訊服務 (IDeviceService, MeterDeviceService, OtherProductService)
│   │   └── Program.cs       # 服務註冊、自動建表與 CORS 設定
│   └── ModbusTest/          # Modbus 通訊測試主控台程式
├── Frontend/
│   └── dashboard/           # React 前端監控儀表板 (Vite + React)
│       └── src/
│           ├── App.jsx      # 即時監控介面主程式
│           └── App.css
├── Database/
│   ├── schema.sql           # 資料庫建構腳本 (Devices, MeterLogs, Products)
│   └── iiot-meter.db        # SQLite 實際資料庫檔案
└── Docs/
    └── Onsite_Checklist.md  # 現場工程案執行檢核表 (SOP)
```

---

##  環境需求 (Prerequisites)
在開始建置前，請確保開發或執行環境已安裝以下軟體：

- .NET 8 SDK 或更新版本
- Node.js (v18.0.0 以上) 及 `npm`
- Modbus Slave 模擬器 (測試用)

---

## 建置與安裝步驟 (Installation & Setup)

### 1. 複製專案 (Clone Repository)
```
git clone [https://github.com/rakku2code/iiot-meter-system.git](https://github.com/rakku2code/iiot-meter-system.git)
cd iiot-meter-system
```

### 2. 資料庫初始化 (Database Setup)
專案已配置 Entity Framework Core。當後端服務首次啟動時，會自動根據 `appsettings.json` 中的連線字串檢查並建立 SQLite 資料庫與對應表格（`Devices`、`MeterLogs`、`Products`）。
亦可參考 Database/schema.sql 進行手動初始化驗證。

### 3. 啟動 Modbus 模擬器 (Modbus Simulator)

* 開啟 Modbus Slave 模擬器。
* 設定 Connection 為 Modbus TCP，Port 設為 502。
* 確定 Slave ID 設為 1，並於 Address 0 填入測試數值（例如 123）。

### 4. 啟動後端 Web API (Backend)
```
cd Backend/MeterApi
dotnet restore
dotnet run
```
* 後端 API 預設監聽網址：http://localhost:5056（每次請求會自動讀取 Modbus 並將數值同步寫入 SQLite 的 MeterLogs 資料表中）。

### 5. 啟動前端儀表板 (Frontend)
開啟新的終端機視窗：
```
cd Frontend/dashboard
npm install
npm run dev
```
---

## API 介面規格 (API Endpoints)

### 取得設備即時抄表數據
* HTTP 方法： GET
* URL： /api/devices/read/{id}
* 成功回應範例 (200 OK)：
```
{
  "deviceId": 1,
  "value": 123.0,
  "status": "Normal",
  "timestamp": "2026-10-20T09:30:00"
}
```