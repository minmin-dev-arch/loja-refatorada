const conexao = require('../db/conexao');

exports.criarFuncionarios = (req,res) => {
const{nome_funcionario,nascimento,cargo} = req.body;
conexao.query(
    'INSERT INTO funcionarios(nome_funcionario,nascimento,cargo) VALUES (?,?,?)',
    [nome_funcionario,nascimento,cargo],
    (err) => {
        if(err) return res.status(500).send('Erro ao cadastrar funcionario');
        res.status(201).send('Funcionario cadastrado com sucesso!');
    } 
  );
};

exports.listarFuncionarios = (req,res) => {
    conexao.query('SELECT * FROM funcionarios', (err,results) => {
   if(err) return res.status(500).send('Erro ao buscar funcionario');
   res.status(200).send(results);
 });
};

exports.atualizarFuncionario= (req,res) => {
const {id} = req.params;
const {nome_funcionario,nascimento,cargo} = req.body;
const query = 'UPDATE funcionarios SET nome_funcionario = ?,nascimento = ?,cargo = ? WHERE id= ?';

conexao.query(query, [nome_funcionario,nascimento,cargo,id], (err,results) => {
if(err) return res.status(500).send('Erro ao atualizar');
if(results.affectedRows === 0) return res.status(404).send('Funcionario não encontrado');
res.send('Funcionario atualizado com sucesso');
 });
};

exports.deletarFuncionario = (req,res) => {
const{id} = req.params;

conexao.query('DELETE FROM funcionarios WHERE id= ?',[id], (err,results) => {
if(err) return res.status(500).send('Erro ao deletar');
if(results.affectedRows === 0) return res.status(404).send('Funcionario não encontrado');
res.status(200).send('Funcionario deletado com sucesso');
 });
};