const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;
const axios = require('axios');

async function keepServerActive() {
  try {
    // Substitua 'http://seusite.com' pela URL do seu servidor
    const response = await axios.get('https://simple-service-g6qy.onrender.comhttps://simple-service-g6qy.onrender.com');
    console.log('Solicitação bem-sucedida:', response.status);
  } catch (error) {
    console.error('Erro na solicitação:', error.message);
  }
}

// Faça a primeira solicitação assim que o servidor for iniciado
keepServerActive();

// Agende solicitações periódicas (por exemplo, a cada 5 minutos)
setInterval(keepServerActive, 5 * 60 * 1000); // 5 minutos


const server = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Página não encontrada!');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
