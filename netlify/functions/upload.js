const nodemailer = require('nodemailer');
const { Readable } = require('stream');
const Busboy = require('busboy');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'OK',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    };
  }

  return new Promise((resolve) => {
    const busboy = Busboy({ headers: event.headers });
    let fields = {};
    let attachments = [];

    busboy.on('field', (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let fileBuffer = [];
      file.on('data', (data) => {
        fileBuffer.push(data);
      });
      file.on('end', () => {
        // Corrige filename e contentType caso filename seja objeto
        let realFilename =
          filename && typeof filename === 'object'
            ? filename.filename
            : filename;
        let realContentType =
          filename && typeof filename === 'object'
            ? filename.mimeType
            : mimetype;
        attachments.push({
          filename: realFilename,
          content: Buffer.concat(fileBuffer),
          contentType: realContentType || 'application/octet-stream',
        });
      });
    });

    busboy.on('finish', async () => {
      // Filtra anexos válidos
      attachments = attachments.filter(
        (att) => att.filename && att.content && att.contentType
      );
      const {
        name = '',
        sobrenome = '',
        email = '',
        phone = '',
        empresa = '',
        descricao = '',
        message = '',
      } = fields;
      const emailBody = `Nome: ${name} ${sobrenome}\nE-mail: ${email}\nTelefone: ${phone}\nEmpresa: ${empresa || '-'}\nDescrição do projeto: ${descricao || '-'}\nMensagem: ${message}`;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '3dklimpressao3d@gmail.com', // Substitua pelo seu e-mail Gmail
          pass: 'addhizijwtvgnhxl', // Use senha de app do Gmail
        },
      });
      try {
        await transporter.sendMail({
          from: `"${name} ${sobrenome} ${email}"`,
          to: '3dklimpressao3d@gmail.com',
          replyTo: email,
          subject: `[3D KL Impressão 3D] Contato de: ${name} ${sobrenome} – ${new Date().toLocaleString()}`,

          text: emailBody,
          attachments,
        });
        resolve({ statusCode: 200, headers, body: 'Enviado com sucesso!' });
      } catch (error) {
        console.error('Erro detalhado:', error);
        resolve({ statusCode: 500, headers, body: 'Erro ao enviar e-mail.' });
      }
    });

    const buffer = Buffer.from(event.body, 'base64');
    const stream = Readable.from(buffer);
    stream.pipe(busboy);
  });
};
