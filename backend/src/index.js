const express = require('express'); // Framework para rotas / json e outras bibliotecas
const cors = require('cors');
const routes = require('./routes'); // importanto as rotas a partir do arquivo de rotas 

const app = express();  // setando o app para responder

app.use(cors());
app.use(express.json()); // Usa para interpretar body em raw (json)
app.use(routes); // utilizado as rotas referenciando o constante app

// knex utilizado para conexão com BD estruturando via javascript para realizar querys

app.listen(3333);