import fs from 'fs';
import path from 'path';

export default function kodanEnginePlugin(options = {}) {
  const contentPath = options.contentPath || './src/data/content.json';
  const backupPath = `${contentPath}.backup`;

  return {
    name: 'vite-plugin-kodan-engine',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Nueva ruta para cargar el contenido sin problemas de path de Vite
        if (req.url === '/_kodan/load' && req.method === 'GET') {
          if (fs.existsSync(contentPath)) {
            const content = fs.readFileSync(contentPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(content);
          } else {
            res.end(JSON.stringify([]));
          }
          return;
        }

        if (req.url === '/_kodan/save' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              
              // Si es un inicio de transaccion (begin transaction) o commit final
              if (data.action === 'begin') {
                if (fs.existsSync(contentPath)) {
                  fs.copyFileSync(contentPath, backupPath);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'started' }));
                return;
              }

              if (data.action === 'commit') {
                if (fs.existsSync(backupPath)) {
                  fs.unlinkSync(backupPath);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'committed' }));
                return;
              }

              if (data.action === 'rollback') {
                if (fs.existsSync(backupPath)) {
                  fs.copyFileSync(backupPath, contentPath);
                  fs.unlinkSync(backupPath);
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'rolled_back' }));
                return;
              }

              // Guardado parcial (estado actual)
              if (data.content) {
                fs.writeFileSync(contentPath, JSON.stringify(data.content, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'saved' }));
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'No content provided' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}
