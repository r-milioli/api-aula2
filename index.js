const express = require('express');
const conexao = require('./bd.js');
const bodyParser = require('body-parser');  
const cors = require('cors');



const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/cliente', (req, res) => {
    const sql = 'SELECT * FROM cliente';
    conexao.query(sql, (erro, resultado) => {
        if (erro) { 
            res.status(500).json({erro: 'Erro ao conectar a tabela Cliente'});
     } else { 
            res.status(200).json(resultado) 
            }
        });
    });
//==================================================================================

app.post('/cliente',(req, res) =>{
    const {nome, cpf} = req.body;
    const sql = 'INSERT INTO cliente (nome, cpf) VALUE (?, ?)';

    conexao.query(sql, [nome, cpf], (erro, resultado) => {
        if(erro){
            res.status(500).json({erro: 'Erro ao inserir dados na tabela cliente.'});
        } else {
            res.status(200).json({msg: 'Pessoa inserida com sucesso!', id: resultado.insertId});
        }
    });
});

//==================================================================================

app.put('/cliente/:id',(req, res) =>{
    const {id} = req.params;
    const {nome, cpf} = req.body;
    const sql = 'UPDATE cliente SET nome = ?, cpf = ? WHERE id =?';

    conexao.query(sql, [nome, cpf, id], (erro, resultado) => {
        if(erro){
            res.status(500).json({erro: 'Erro ao atualizar a tabela cliente.'});
        } else {
            res.status(200).json({msg: 'Tabela Cliente atualizada com sucesso!', id: resultado.insertId});
        }
    });
});

//==================================================================================

app.delete('/cliente/:id',(req, res) =>{
    const {id} = req.params;
    const sql = 'DELETE FROM cliente WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro){
            res.status(500).json({erro: 'Erro ao deletar dados na tabela cliente.'});
        } else {
            res.status(200).json({msg: 'Tabela Cliente deletada com sucesso!'});
        }
    });
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});