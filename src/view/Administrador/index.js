import React, { useState } from 'react'
import './admin.css'
import firebase from '../../config/firebase.js'
import Item from '../../components/item'
import img_logo from '../../imagens/Tel_Adm-v-1.0/Tel_Adm-v-1_01.png'
import img_nome_pagina from '../../imagens/Tel_Adm-v-1.0/Tel_Adm-v-1_03.png'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router'



function Administrador() {

    const dispatch = useDispatch();
    const [nome, setNome] = useState();
    const [itemId, setItemId] = useState();
    const [descricao, setDescricao] = useState();
    const [imagem, setImagem] = useState();
    const [valor, setValor] = useState();
    const [vazio, setVazio] = useState();

    const [consulta, setConsulta] = useState();
    const [item, setItem] = useState([]);

    const [muda, setMuda] = useState();

    const email = useSelector(state => state.usuarioEmail);

    var listaItem = [];


    const storage = firebase.storage();
    const db = firebase.firestore();

    function sair(){
        firebase.auth().signOut().then(resultado => {
            alert('Saiu com sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOGOUT', usuarioEmail: null });
            }, 200);
        }).catch(erro =>{
            alert('erro');
        })
    }

    function consultarItem() {

        if (consulta === '') {
            setConsulta(null)
            setVazio(1);


        } else {
            setVazio(0);
            db.collection('itens').get().then(async (resultado) => {

                resultado.docs.forEach(doc => {
                    if (doc.data().nome.indexOf(consulta) >= 0) {
                        listaItem.push({
                            id: doc.id,
                            ...doc.data()
                        })
                        setItemId(doc.id)
                    }

                })
                setItem(listaItem);

            })
        }


    }

    function remover() {
        if (itemId == null) {
            alert('Necessário consultar um item primeiramente')
        } else if (window.confirm("Deseja confirmar a remoção ?"))  {
            firebase.firestore().collection('itens').doc(itemId).delete().then(() => {
                firebase.storage().ref(`imagens/${imagem}`).delete()
            }).then(() => {
                alert('Item removido com sucesso')
            }).catch(() => {
                alert('Erro')
            })

        } else{
            alert('Item não removido') 
        }
    }

    function adicionarItem() {
        storage.ref(`imagens/${imagem.name}`).put(imagem).then(() => {
            db.collection('itens').add({
                nome: nome,
                descricao: descricao,
                imagem: imagem.name,
                valor: valor,
            }).then(() => {
                alert('item adicionado com sucesso')
            }).catch(() => {
                alert('erro')
            });
        })



    }

    function atualizar() {


        firebase.storage().ref(`imagens/${imagem}`).delete();
        firebase.storage().ref(`imagens/${imagem.name}`).put(imagem).then(() => {
            firebase.firestore().collection('itens').doc(itemId).update({
                nome: nome,
                descricao: descricao,
                imagem: imagem.name,
                valor: valor,
            }).then(() => {
                alert('item editado com sucesso')
            }).catch(() => {
                alert('erro') 
            });
        })
    }
    function adicionarItensmenu() {
        setMuda(0)
    }
    function consultarItensmenu() {
        setMuda(1)
    }
    function editarItensmenu() {
        setMuda(2)
    }
    function removerItensmenu() {
        setMuda(3)
    }

    return (


        <div className="div-corpo d-flex justify-content-center">
                {useSelector(state => state.usuarioEmail === 'admin@sigr.com') ?
                <>

                    <section className="topo-site">
                        <div className="div-topo">
                            <div className="div-logo">
                                <img src={img_logo} alt="logo"></img>
                            </div>

                            <div className="div-name-pagina">
                                <div className="div-img-pagina">
                                    <img src={img_nome_pagina} alt="logo"></img>
                                </div>
                                <div className="div-text-pagina">
                                     <h1 className="h4 text-topo-pagina text-right mr-2 mt-2">Seja bem vindo: {email}</h1> 
                                </div>
                            </div>
                        </div>



                        <div className="div-topo">
                            <div className="menu-site">
                                <ul>
                                    <li><a href="#" class="botao-menu btn btn-block">Inicio</a></li>
                                    <li><a href="#" onClick={adicionarItensmenu} class="botao-menu btn btn-block">Adicionar Itens</a></li>
                                    <li><a href="#" onClick={consultarItensmenu} class="botao-menu btn btn-block">Consultar Itens</a></li>
                                    <li><a href="#" onClick={editarItensmenu} class="botao-menu btn btn-block">Editar Itens</a></li>
                                    <li><a href="#" onClick={remover} class="botao-menu btn btn-block">Remover Itens</a></li>
                                    <li><a href="#" onClick={sair} class="botao-menu btn btn-block">Sair</a></li>


                                </ul>

                                <div className="text-menu">
                                    <p>Sig-R Company</p>
                                    <p>Tel: 43 33500 0000</p>
                                    <p>www.sig-r.com.br</p>
                                </div>
                            </div>
                            <div className="conteudo-site">
                                <div className="conteudo-site-corpo">
                                    {muda === 0 &&
                                        <div>
                                            <h1 className="text-center">Adicionar itens</h1>
                                            <form className="form-horizontal mx-auto">
                                                <div className="form-group mb-5">
                                                    <label className="h4 col-md-6 offset-md-3">Nome</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome do item" type="text" className="imput form-control" ></input></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Descrição</label>
                                                    <div class="col-md-6 offset-md-3"><textarea rows="4" onChange={(e) => setDescricao(e.target.value)} placeholder="Digite a descrição do item" type="text" className="imput form-control" ></textarea></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Imagem</label>
                                                    <div class="col-md-6 offset-md-3"><input className="botao-arquivo" onChange={(e) => setImagem(e.target.files[0])} type="file"></input></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Valor</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setValor(e.target.value)} placeholder="Digite o valor do item" type="text" className="imput form-control" ></input></div>

                                                </div>
                                                <div class="col-md-6 offset-md-3"><button onClick={adicionarItem} type="button" className="botao-menu-corpo btn btn-lg btn-login text-white mt-2">Adicionar</button></div>
                                            </form>
                                        </div>
                                    }
                                    {muda === 1 &&
                                        <div>
                                            <h1 className="text-center"> Consultar itens</h1>
                                            <div className="form-horizontal mx-auto">
                                                <div className="form-group mb-5">
                                                    <label className="h4 col-md-6 offset-md-3">Nome</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setConsulta(e.target.value)} placeholder="Digite o nome do item" type="text" className="imput form-control" ></input></div>
                                                </div>
                                                <div class="col-md-6 offset-md-3"><button onClick={consultarItem} type="button" className="botao-menu-corpo btn btn-lg btn-login text-white ">Consultar</button></div>
                                                <br />
                                                <div className=" rest-consulta">
                                                    {vazio === 0 &&
                                                        item.map(item => <Item key={item.id} nome={item.nome} descricao={item.descricao} imagem={item.imagem} valor={item.valor} id={item.id} vazio={vazio}></Item>)
                                                    }


                                                </div>
                                            </div>


                                        </div>
                                    }

                                    {muda === 2 &&
                                        <div>
                                            <h1 className="text-center">Editar itens</h1>
                                            <form className="form-horizontal mx-auto">
                                                <div className="form-group mb-5">
                                                    <label className="h4 col-md-6 offset-md-3">Nome</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome do item" type="text" className="imput form-control" ></input></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Descrição</label>
                                                    <div class="col-md-6 offset-md-3"><textarea rows="4" onChange={(e) => setDescricao(e.target.value)} placeholder="Digite a descrição do item" type="text" className="imput form-control" ></textarea></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Imagem</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setImagem(e.target.files[0])} type="file" className="botao-arquivo"></input></div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="h4 col-md-6 offset-md-3">Valor</label>
                                                    <div class="col-md-6 offset-md-3"><input onChange={(e) => setValor(e.target.value)} placeholder="Digite o valor do item" type="text" className="imput form-control" ></input></div>

                                                </div>
                                                <div class="col-md-6 offset-md-3"><button onClick={atualizar} type="button" className="botao-menu-corpo btn btn-lg btn-login text-white mt-2">Editar</button></div>
                                            </form>
                                        </div>

                                    }


                                </div>
                            </div>
                        </div>

                    </section>

                </>
                : <Redirect to="/"/>
            }


        </div>

    )
}
export default Administrador;