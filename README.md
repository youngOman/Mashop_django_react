# E-Commerce Fullstack 電商網站專案

本專案為練習用電商平台 Demo，包含 **會員系統、購物功能、訂單管理、後台管理**... 等多項核心功能

開發此專案的完整詳細流程 > ：[Django + React 電商網站專案實作教學](https://akebee.com/tags/#Django)

## 📌 Tech Stack(技術棧)

### (Frontend)前端：

- **React**：一個 JavaScript UI 函式庫，適用於開發單頁應用（SPA），提供組件化開發模式
- **Redux**：集中化狀態管理工具，適用於處理複雜的應用狀態，經常搭配 React 進行開發
- **React-Bootstrap**：基於 Bootstrap 的 React UI 框架，提供即用型元件，提高 RWD 網頁開發效

### (Backend)後端：

- **Django**：功能強大、穩定的 Python Web 框架，適用於快速開發與企業級應用
- **Django REST Framework (DRF)**：提供靈活且可擴展的 API 介面開發工具，方便建立 RESTful 服務
- **JWT (JSON Web Token)**：身份驗證和授權數據，適用於無狀態 API 身份驗證
- **MySQL**：高效能且適用於正式環境的關聯式資料庫，而非開發階段用的 SQLite

### (Package Manager)套件管理工具：

- **npm**：Node.js 的套件管理工具，用於安裝 React 相關套件

### (Version control Tool)版本控制工具：

- **Git**：分散式版本控制系統，用於專案的版本控制

### (Deployment)部署：

- **Linux(Ubuntu 20.04+) 主機**：本專案不使用雲端 PaaS 服務(Heroku、Azure、GCP)，而是自行架設 Linux 主機進行多個專案的維護
- **Systemd**：管理多個系統服務
- **SSH**：遠端連線管理，如 OpenSSH）
- **Nginx**：Web Server，反向代理
- **uWSGI**：Django WSGI 伺服器，Django 與 Web Service 之間的接口

## 🎯 功能概覽

### 🛒 前台功能：

- [x] 會員註冊 / 登入(JWT 驗證)
- [x] 產品列表、產品詳細介紹頁面
- [x] 購物車功能
- [x] 結帳下單，付款流程完整功能(包含自動儲存用戶上次付款時資訊)
- [x] 會員歷史訂單列表(含下單日期、訂單金額、付款狀態、出貨狀態..等)
- [x] 產品評論與評分功能(包含用戶評分即時計算評價)
- [x] 產品搜尋功能
- [x] 自動篩選高評價產品的輪播器(Carousel)
- [x] 圖片上傳功能(包含產品圖片、會員頭像)
- [x] 會員個人資料編輯
- [x] 訂單明細頁面

### 🔧 後台功能：

- [x] **產品資訊、價格、庫存、評價、規格管理**（CRUD）
- [x] **網站訂單管理**（CRUD + 訂單運送狀態更新）
- [x] **會員管理**（CRUD + 會員資料、管理員權限設定）

## DEBUG LOG

- [x] 用戶訂單頁面資訊顯示錯誤
- [x] Paypal 付款異常問題修復
- [x] 管理員更改 delivered status 重整無法更新問題
- [x] 產品搜尋無動靜
- [x] 產品頁面新增顯示該產品的評論
- [x] Comment 無法送出
- [x] Pagination 點擊無換頁問題
- [x] HomePage Carousel 跑格問題修復
- [x] Nginx 502 Bad Gateway
- [x] uwsgi.ini 指向錯誤修復