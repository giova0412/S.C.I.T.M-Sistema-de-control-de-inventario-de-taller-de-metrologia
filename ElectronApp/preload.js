const { contextBridge, ipcRenderer } = require('electron');
 
contextBridge.exposeInMainWorld('electronAPI', {
  readFile: async (filePath) => {
    return await ipcRenderer.invoke('read-file', filePath);
  }
}); 