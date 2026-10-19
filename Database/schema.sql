-- 1. Device (設備基本資料表)
CREATE TABLE IF NOT EXISTS Devices (
    Id INT PRIMARY KEY AUTOINCREMENT,
    DeviceName TEXT NOT NULL,
    ProductType TEXT NOT NULL,
    IpAddress TEXT NOT NULL,
    Port INT DEFAULT 502,
    SlaveId INT NOT NULL,
);

--2. MeterLogs (抄表紀錄表)
CREAT TABLE IF NOT EXISTS MeterLogs (
    Id INT PRIMARY KEY AUTOINCREMENT,
    DeviceId INT NOT NULL,
    Value REAL,
    Status TEXT,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KRY (DeviceId) REFERENCES Devices(Id) ON DELETE CASECADE
);

--3. Products (產品資料表)
CREATE TABLE IF NOT EXISTS Products (
    Id INT PRIMARY KEY AUTOCREMENT,
    ConfigKey TEXT NOT NULL,
    ConfigValue TEXT,
);