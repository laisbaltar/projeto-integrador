const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let links = [{ id: 1, titulo: 'Google', url: 'https://google.com' }];

app.get('/links', (req, res) => res.json(links));

app.post('/links', (req, res) => {
    const novoLink = { id: Date.now(), ...req.body };
    links.push(novoLink);
    res.status(201).json(novoLink);
});

app.delete('/links/:id', (req, res) => {
  const { id } = req.params;
  links = links.filter(link => String(link.id) !== String(id));
  res.status(204).send();
});

app.listen(3001, () => console.log("API rodando na porta 3001"));
