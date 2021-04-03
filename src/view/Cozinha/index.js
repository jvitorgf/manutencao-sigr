import React, { useEffect, useState } from 'react'
import './cozinha.css'
import img_logo from '../../imagens/Tel_Cos-v-1.0/Tel_Cos-v-1_01.png'
import img_nome_pagina from '../../imagens/Tel_Cos-v-1.0/Tel_Cos-v-1_03.png'
import firebase from '../../config/firebase.js'
import Pedidos from '../../components/pedido'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Cozinha() {
    const [muda, setMuda] = useState();

    var listaPedidos = [];

    const [pedidos, setPedidos] = useState([]);

    const storage = firebase.storage();
    const db = firebase.firestore();

    const dispatch = useDispatch();

    const email = useSelector(state => state.usuarioEmail);

    function botaoPedidos() {
        setMuda(0)
    }

    useEffect(() => {

        db.collection('pedidos').orderBy('timestamp', 'asc').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaPedidos.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPedidos(listaPedidos);
        })



    }, [])



    function sair() {
        firebase.auth().signOut().then(resultado => {
            alert('Saiu com sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOGOUT', usuarioEmail: null });
            }, 200);
        }).catch(erro => {
            alert('erro');
        })
    }




    return (

        <div className="div-corpo d-flex justify-content-center">
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

                            {
                                useSelector(state => state.usuarioLogado) > 0 ? <h1 className="h4 text-topo-pagina text-right mr-2 mt-2">Seja bem vindo: {email}</h1> : null}
                        </div>
                    </div>
                </div>


                <div className="div-topo">
                    <div className="menu-site">
                        <ul>
                            <li><a href="#" class="botao-menu btn btn-block">Inicio</a></li>
                            {
                                useSelector(state => state.usuarioEmail === 'cozinha@sigr.com') ?
                                    <>
                                        <li><a onClick={botaoPedidos} class="botao-menu btn btn-block">Pedidos</a></li>
                                        <li><a href="#" onClick={sair} class="botao-menu btn btn-block">Sair</a></li>
                                    </>
                                    : <li><Link to="/" class="botao-menu btn btn-block">Fazer login</Link></li>
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
                        <div className="conteudo-site-corpo justify-content-center">
                            <h1 className="strong mt-3 ml-5"> Lista de Pedidos</h1>
                            <br />
                            {muda === 0 &&


                                pedidos.map(pedidos => <Pedidos key={pedidos.id} nome={pedidos.nome} quantidade={pedidos.quantidade} valor={pedidos.valor} mesa={pedidos.mesa} pedidoId={pedidos.id}></Pedidos>)


                            }
                        </div>
                    </div>
                </div>

            </section>
        </div>

    )
}
export default Cozinha