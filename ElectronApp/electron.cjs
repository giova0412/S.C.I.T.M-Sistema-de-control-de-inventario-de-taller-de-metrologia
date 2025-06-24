// Este archivo es igual a main.js, solo renombrado para Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let backendProcess;

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'), // Icono grande para el .exe
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile(path.join(__dirname, 'build', 'index.html'));
}

function getNodePath() {
  if (app.isPackaged) {
    // En producción, usa el node.exe incluido
    return path.join(process.resourcesPath, 'node.exe');
  } else {
    // En desarrollo, usa el Node del sistema
    return process.execPath;
  }
}

function getBackendPath() {
  if (app.isPackaged) {
    // En producción, el backend está en resources/src
    return path.join(process.resourcesPath, 'src', 'index.js');
  } else {
    // En desarrollo, usa la ruta relativa
    return path.join(__dirname, 'src', 'index.js');
  }
}

app.whenReady().then(() => {
  // Lanzar el backend automáticamente
  const nodePath = getNodePath();
  const backendPath = getBackendPath();
  
  console.log('Iniciando backend con:', nodePath, backendPath);
  
  backendProcess = spawn(nodePath, [backendPath], {
    cwd: app.isPackaged ? process.resourcesPath : __dirname,
    stdio: 'inherit',
    shell: true,
    windowsHide: true,
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });

  backendProcess.on('error', (err) => {
    console.error('Error al iniciar el backend:', err);
  });

  backendProcess.on('exit', (code) => {
    console.log('Backend terminado con código:', code);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (backendProcess) {
    console.log('Cerrando backend...');
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (backendProcess) {
    console.log('Cerrando backend antes de salir...');
    backendProcess.kill();
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}); 