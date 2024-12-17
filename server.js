const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // порт, можно выбрать любой свободный

const server = http.createServer((req, res) => {
  // Определим путь к файлу
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './public/index.html'; // Главная страница
  } else {
    filePath = './public' + req.url;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';

  // Определяем Content-Type по расширению
  const mimeTypes = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.wav':  'audio/wav',
    '.mp3':  'audio/mpeg',
    '.woff': 'font/woff',
    '.woff2':'font/woff2',
    '.ttf':  'font/ttf',
    '.eot':  'application/vnd.ms-fontobject',
    '.otf':  'font/otf',
    '.wasm': 'application/wasm'
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code === 'ENOENT') {
        // Файл не найден, отдадим 404
        fs.readFile('./public/404.html', (err, content404) => {
          if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content404, 'utf-8');
          }
        });
      } else {
        // Прочие ошибки
        res.writeHead(500);
        res.end('Internal Server Error: '+error.code);
      }
    } else {
      // Успешная выдача файла
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
