import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

// Lista em memória para armazenar os produtos
let produtos = [
    { id: 1, nome: 'Inception', tipo: 'Filme', descricao: 'Um ladrão entra nos sonhos para roubar segredos.' },
    { id: 2, nome: 'Bohemian Rhapsody', tipo: 'Música', descricao: 'Clássico do Queen.' },
    { id: 3, nome: 'Teclado Mecânico', tipo: 'Produto', descricao: 'Teclado com switches red.' },
]
let nextId = 4

app.use(cors())
app.use(express.json())

// GET /produtos — retorna todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos)
})

// POST /produtos — cadastra um novo produto
app.post('/produtos', (req, res) => {
    const { nome, tipo, descricao } = req.body

    if (!nome || !tipo) {
        return res.status(400).json({ erro: 'Os campos nome e tipo são obrigatórios.' })
    }

    const novoProduto = {
        id: nextId++,
        nome,
        tipo,
        descricao: descricao || '',
    }

    produtos.push(novoProduto)
    res.status(201).json(novoProduto)
})

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
