const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/processar-pagamento', async (req, res) => {
  const { produto, preco } = req.body;

  // Configuração da API do M-Pesa
  const API_KEY = 'sua_api_key';
  const PUBLIC_KEY = 'sua_public_key';
  const RESOURCE_URL = 'https://api.mpesa.vm.co.mz/payment';

  // Token codificado (Bearer)
  const AUTH_TOKEN = 'Bearer seu_token_encriptado';

  try {
    // Fazer requisição para o M-Pesa
    const response = await axios.post(RESOURCE_URL, {
      amount: preco,
      reference: produto,
      transaction: 'C2B'
    }, {
      headers: {
        Authorization: AUTH_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send({ status: 'Pagamento realizado com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao processar pagamento no M-Pesa' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
