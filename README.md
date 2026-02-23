# 社員管理アプリ React + TypeScript + Vite + tailwind
## 目的
React 3日目の学習成果として、最新の Tailwind v4 を導入した社員管理システムを構築  
## 必要なパッケージ
npm create vite@latest . -- --template react-ts  

npm install  

npm install uuid  

npm install --save-dev @types/uuid   

npm install tailwindcss @tailwindcss/vite  

## 所感
コンポーネントを共通化するときにジェネリクスで型を決めることで共通コンポーネントを型厳格に作ることができる　　
tailwindを使うと無駄なhtmlクラス名をつける必要がなくなり、各タグごとに装飾をつけれるため、クラス名の競合が起こりにくくなる  
tailwindはこれからreactで何かを作るときについでに練習していきたい  