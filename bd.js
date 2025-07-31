const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cadastro'
});

conexao.connect((erro) =>{
    if (erro) {
        console.log('Erro ao conectar ao banco de dados :', erro);
    } else {
        console.log('Conexão estabelecida com sucesso!')
    }
});

module.exports = conexao;