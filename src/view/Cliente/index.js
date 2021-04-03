import React, { useEffect, useState } from 'react';
import './cliente.css';
import firebase from '../../config/firebase.js';
import Item from '../../components/item.js';
import img_logo from '../../imagens/Tel_Cxa-v-1.0/Tel_Cxa-v-1_01.png';
import img_nome_pagina from '../../imagens/Tel_Cxa-v-1.0/Tel_Cxa-v-1_03.png';
import { useDispatch, useSelector } from 'react-redux';
import bebidas from '../../imagens/Tel_Cliente-v-1.0/Tela-cliente-cardapio-v-0.3_02.png';
import pizzas from '../../imagens/Tel_Cliente-v-1.0/Tela-cliente-cardapio-v-0.3_03.png';
import porcoes from '../../imagens/Tel_Cliente-v-1.0/Tela-cliente-cardapio-v-0.3_04.png';
import lanches from '../../imagens/Tel_Cliente-v-1.0/Tela-cliente-cardapio-v-0.3_05.png';
import sobremesas from '../../imagens/Tel_Cliente-v-1.0/Tela-cliente-cardapio-v-0.3_06.png';
import Bebidas from '../../components/bebidas';
import Pedidos from '../../components/pedido';
import { Link } from 'react-router-dom'




function Cliente() {
    var listaItem = [];
    const [item, setItem] = useState([]);

    var listaPedido = [];
    const [pedido, setPedido] = useState([]);


    const storage = firebase.storage();
    const db = firebase.firestore();

    const dispatch = useDispatch();

    const email = useSelector(state => state.usuarioEmail);

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

    function cardapio() {
        db.collection('itens').get().then(async (resultado) => {

            await resultado.docs.forEach(doc => {

                listaItem.push({
                    id: doc.id,
                    ...doc.data()
                })


            })
            setItem(listaItem);

        })
    }
    function pedidoss() {
        db.collection('pedidos').orderBy('timestamp','asc').get().then(async (resultado) => {

            await resultado.docs.forEach(doc => {

                listaPedido.push({
                    id: doc.id,
                    ...doc.data()
                })


            })
            setPedido(listaPedido);

        })
    }

    return (
<>



        <div className="div-corpo d-flex justify-content-center">

            <section className=" topo-site">
                <div className="div-topo">
                    <div className="div-logo">
                        <img src={img_logo} alt="logo"></img>
                    </div>

                    <div className="div-name-pagina">
                        <div className="div-img-pagina">
                            <a href="#"><img src={bebidas} alt="logo" className="img-menu-cardapio"></img></a>
                            <a href="#"><img src={pizzas} alt="logo" className="img-menu-cardapio"></img></a>
                            <a href="#"><img src={porcoes} alt="logo" className="img-menu-cardapio"></img></a>
                            <a href="#"><img src={lanches} alt="logo" className="img-menu-cardapio"></img></a>
                            <a href="#"><img src={sobremesas} alt="logo" className="img-menu-cardapio"></img></a>

                        </div>
                        <div className="div-text-pagina">
                            
                            {
                                useSelector(state => state.usuarioLogado) > 0 ? <h1 className="h4 text-topo-pagina text-right mr-2 mt-2">Seja bem vindo: {email}</h1>  : null }
                        </div>
                    </div>
                </div>
                <div className="div-topo">
                    <div className="menu-site">
                        <ul>
                            <li><a href="#" class="botao-menu btn btn-block">Inicio</a></li>
                            
                            {
                            useSelector(state => state.usuarioLogado) > 0 ?
                                <>
                               
                               
                                
                                
                                
                                <li><a onClick={cardapio} href="#" class="botao-menu btn btn-block">Cardápio</a></li>
                                <li><a onClick={pedidoss} class="botao-menu btn btn-block">Pedidos</a></li>
                                <li><a href="#" onClick={sair} class="botao-menu btn btn-block">Sair</a></li>
                                
                                </> 
                                :   <li><Link to="/" class="botao-menu btn btn-block">Fazer login</Link></li>
                            }
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="text-menu">
                            <p>Sig-R Company</p>
                            <p>Tel: 43 33500 0000</p>
                            <p>www.sig-r.com.br</p>
                        </div>
                    </div>
                    <div className="conteudo-site">
                        <div className="conteudo-site-menu-cardapio">
                            <div className="form-inline cardapio" >
                                {
                                    item.map(item => <Item key={item.id}  nome={item.nome} descricao={item.descricao} imagem={item.imagem} valor={item.valor} ordem={item.ordem} id={item.id}></Item>)
                                }

                            </div>
                        </div>
                        <div className="conteudo-site-menu-pedido">
                        <h4 className="strong mt-3 ml-3"> Lista de Pedidos</h4>
                        <hr className="hr"/>
                            <form className="form-group pedidos">
                                {
                                    pedido.map(pedidos => <Pedidos status={pedidos.status} key={pedidos.id} nome={pedidos.nome} quantidade={pedidos.quantidade} valor={pedidos.valor} mesa={pedidos.mesa} pedidoId={pedidos.id} timestamp={pedidos.timestamp}></Pedidos>)
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>)
}


export default Cliente;