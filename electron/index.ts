import * as electron from 'electron';
const { app, BrowserWindow } = electron;

import path from 'node:path';

let win: electron.BrowserWindow | null = null;

const create = () => {
  win = new BrowserWindow({
    width: 420,
    height: 640,
    webPreferences: {
      contextIsolation: true,
    },
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) win.loadURL(devUrl);
  else win.loadFile(path.join(process.cwd(), 'dist/index.html'));
};

app.whenReady().then(create);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && create());
