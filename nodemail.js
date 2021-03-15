const mailer = require("nodemailer");

let transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "jhun@jhun.com.br",
    pass: "DJK@1K2J3D4god",
  },
});

module.exports = (email, nome, mensagem) => {
  const smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "jhun.designer@gmail.com",
      pass: "prawbfwvwlunecnl",
    },
  });

  const mail = {
    from: "jhun.designer@gmail.com",
    to: "jhun@jhun.com.br",
    subject: `${nome} te enviou uma mensagem pelo site.`,
    text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`,
    //html: "<b>Opcionalmente, pode enviar como HTML</b>"
  };

  // if (anexo) {
  //   console.log(anexo);
  //   mail.attachments = [];
  //   mail.attachments.push({
  //     filename: anexo.originalname,
  //     content: anexo.buffer,
  //   });
  // }

  return new Promise((resolve, reject) => {
    smtpTransport
      .sendMail(mail)
      .then((response) => {
        smtpTransport.close();
        return resolve(response);
      })
      .catch((error) => {
        smtpTransport.close();
        return reject(error);
      });
  });
};
