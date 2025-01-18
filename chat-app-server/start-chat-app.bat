@echo off
start "" "C:\Users\chris\OneDrive\Documents\ngrok\ngrok.exe" http 4000
timeout /t 5
npm start