import express from 'express';
import fetch from 'node-fetch';

const app = express();
const router = express.Router();


// Função para pegar dados de repositórios
const pegarDados = () => {
  return fetch(`https://api.github.com/users/NayaraNicacio/repos`)
    .then((res) => res.json())
    .then((repos) => {
      console.log(repos);
      return repos; 
    })
    .catch((error) => console.error('Erro ao buscar dados:', error));
};

// Rota para exibir "Olá Mundo" e os repositórios do GitHub
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const repos = await pegarDados(username);
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bem Vindo ao Meu Repositório de Estudos</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  font-size: 15px;
                  font-weight: bold;
                  font-color: 'blue';
                  text-align: center;
                  margin-top: 50px;
                  background-color: #fff55;
              }
              .repo {
                  margin: 0px 0;
                  padding: 10px;
              }
          </style>
      </head>
      <body>
          <h1>Bem vindo a Área de Estudos </h1>
          <h2>Repositórios de Nayara Nicacio:</h2>
          <div>
            ${repos.map(repo => `<div class="repo">${repo.name}</div>`).join('')}
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Erro ao buscar repositórios.');
  }
});

// Usa o router para a rota principal
app.use('/', router);

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
