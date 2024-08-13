const express = require('express')
const path = require('node:path')

// Criando a aplicação
const app = express()

let storedEmails = []

// Configurando o EJS como view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware para decodificar o corpo das requisições
app.use(express.urlencoded( {extended: true } ))

// Middleware para servir arquivos estáticos na pasta views
app.use(express.static(__dirname + '/views'))


app.get('/', (req, res) => {
  const head = 'Newsletter de tecnologia'
  const title = 'Assine nossa newsletter'
  const text = 'Fique por dentro das últimas novidades sobre Node.js e desenvolvimento back-end!'

  res.render('index', {head, title, text})
})

app.post('/register', (req, res) => {
  const email = req.body.email
  storedEmails.push(email)

  res.redirect('/success')
})

app.get('/success', (req, res) => {
  res.render('success')
})

app.get('/emails', (req, res) => {
  res.render('emails', {emails:storedEmails})
})

app.post('/emails/delete', (req, res) => {
  const { email } = req.body;
  storedEmails = storedEmails.filter(item => item !== email);
  res.redirect('/emails');
});

const PORT = 3000
app.listen(PORT, () => {
  console.clear()
  console.log(`Servidor iniciado na porta http://localhost:${PORT}`)
  })
