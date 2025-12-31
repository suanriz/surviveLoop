# [Survive Loop (人生迴圈) 🍗](https://suanriz.github.io/surviveLoop/)

<img src="https://github.com/suanriz/surviveLoop/blob/master/docs/introduce.gif"/> 👉[full ver](https://www.youtube.com/watch?v=jMgzsZBVADE)

> 「幸運排行？首先要活著...」  
> 一個關於焦慮、生存與運氣的 React 點擊實驗。
<br/>

## ✨ 遊戲特色 (Features)

- **簡單易上手**：點擊開啟你的人生體驗。
- **即時排行榜**：與焦慮大師們一較高下。
- **幸運值成就**：從「地獄◯◯人」到「歐皇天選◯◯◯」。
- **進來就能玩**：無感匿名登入，重整依然記得你。
<br/>

## 🏆 PageSpeed 100 分成就 (PageSpeed 100 Score)

本專案 **達成 PageSpeed 滿分**，Performance、Accessibility、Best Practices 與 SEO 均為 100 分，充分展現前端效能與最佳實踐。  
不僅 UI 流暢、互動即時，也兼顧 SEO 與響應式設計，完整呈現遊戲體驗的趣味性與性能優化。  
<img width="320" src="https://github.com/suanriz/surviveLoop/blob/master/docs/surviveLoopScore-phone.png"/>
<img width="320" src="https://github.com/suanriz/surviveLoop/blob/master/docs/surviveLoopScore-pc.png"/>
<br/>
<br/>
<br/>

## 🛠️ 技術棧 (Tech Stack)

- **核心框架**: React 19, TypeScript, Vite
- **狀態管理**: TanStack Query + createAsyncStoragePersister
- **後端服務**: Firebase Realtime Database
- **樣式設計**: TailwindCSS 4, Shadcn/ui
- **代碼管理**: ESLint 9
<br/>

## ‼️ 幸運值機率全揭露 (Probability Distribution – Full Disclosure)

本地執行 `yarn test`，進行 **1,000,000 次模擬**，將幸運值分布完整攤開，驗證遊戲機制的隨機性與合理性。

| 幸運值區間  | 次數       | 百分比     | 長條圖                                  |
|------------|------------|------------|----------------------------------------|
| 0~10%      | 31,089     | 3.11%      | ▋▋                                    |
| 10~20%     | 34,746     | 3.47%      | ▋▋                                    |
| 20~30%     | 52,958     | 5.30%      | ▋▋▋                                  |
| 30~40%     | 119,321    | 11.93%     | ▋▋▋▋▋▋                            |
| 40~50%     | 347,806    | 34.78%     | ▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋        |
| 50~60%     | 392,373    | 39.24%     | ▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋▋   |
| 60~70%     | 21,531     | 2.15%      | ▋                                      |
| 70~80%     | 176        | 0.02%      | ▋                                      |
| 80~90%     | 0          | 0.00%      |                                        |
| 90~100%    | 0          | 0.00%      |                                        |
