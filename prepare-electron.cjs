const fs = require('fs-extra');
const path = require('path');

const frontendBuild = path.join(__dirname, 'FrontEnd', 'build');
const electronBuild = path.join(__dirname, 'ElectronApp', 'build');
const backendSrc = path.join(__dirname, 'src');
const electronBackend = path.join(__dirname, 'ElectronApp', 'src');

// Copiar build de React
fs.removeSync(electronBuild);
fs.copySync(frontendBuild, electronBuild);

// Copiar backend
fs.removeSync(electronBackend);
fs.copySync(backendSrc, electronBackend);

console.log('¡Archivos copiados correctamente!'); 