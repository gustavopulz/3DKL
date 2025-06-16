// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Permite CORS para qualquer origem (ajuste para seu domínio Wix em produção)
app.use(cors());

// Configuração do nodemailer (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pulzgustavo1@gmail.com', // Substitua pelo seu e-mail Gmail
    pass: 'zzfspnyoahzdhfyn', // Use senha de app do Gmail
  },
});

// Endpoint para upload de arquivo e envio de e-mail
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { name, sobrenome, email, phone, message, empresa, descricao } =
      req.body;
    let attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    }
    // Corpo do e-mail formatado
    const emailBody = `Nome: ${name} ${sobrenome || ''}\nE-mail: ${email}\nTelefone: ${phone}\nEmpresa: ${empresa || '-'}\nDescrição do projeto: ${descricao || '-'}\nMensagem: ${message}`;
    // Envia e-mail diretamente
    await transporter.sendMail({
      from: '3dklimpressao3d@gmail.com', // Substitua pelo seu e-mail Gmail
      to: '3dklimpressao3d@gmail.com',
      replyTo: email, // Permite resposta ao usuário do formulário
      subject: 'Novo contato pelo site',
      text: emailBody,
      attachments,
    });

    // Remove arquivo local após uso (opcional)
    if (req.file) {
      fs.unlink(path.join(__dirname, 'uploads', req.file.filename), () => {});
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({ error: 'Erro ao enviar e-mail ou upload.' });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
