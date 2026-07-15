# Task 1：Training-load logic 報告

## 實作

- 新增 `app.js`，提供 `calculateLoad(duration, rpe)`。
- 將 numeric 或 numeric-string 輸入轉為數字。
- 驗證 duration 必須為 1–600 的整數；否則拋出指定 user-facing `Error`。
- 驗證 rpe 必須為 1–10 的整數；否則拋出指定 user-facing `Error`。
- 回傳 `duration × rpe`，並以 CommonJS 匯出。
- 新增 `test.js`，覆蓋兩個有效輸入及三個指定無效輸入案例。

## 檔案

- `app.js`
- `test.js`
- `.superpowers/sdd/task-1-report.md`

## 測試與 RED/GREEN 證據

### RED

執行：`node test.js`

結果：exit code `1`。

失敗原因：`Error: Cannot find module './app.js'`，符合 brief 指定的缺少 production module 失敗。

### GREEN

加入最小計算邏輯後再次執行：`node test.js`

結果：輸出 `5 checks passed`，exit code `0`。

## 自我審查

- API 名稱、輸入轉換、計算方式、驗證範圍及錯誤訊息均依 brief 實作。
- 測試先於 production code 建立並確認失敗，再加入實作確認通過。
- 只新增 Task 1 要求的 `app.js` 與 `test.js`；未新增依賴或修改其他既有檔案。
- 未存取網路，未發布變更。

## Concern

沒有發現 Task 1 範圍內的阻塞問題。測試只覆蓋 brief 指定案例，未額外擴充未要求的行為。
