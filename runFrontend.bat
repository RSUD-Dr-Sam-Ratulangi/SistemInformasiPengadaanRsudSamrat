@echo off

echo Starting Vue App...

cd FrontendVendorVue
npm install
npm run dev

echo Starting React App...

cd ../FrontendRSReact
npm install
npm start

exit /b 0
