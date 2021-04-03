import React, {  useState } from 'react'
import './caixa.css'
import img_logo from '../../imagens/Tel_Cxa-v-1.0/Tel_Cxa-v-1_01.png'
import img_nome_pagina from '../../imagens/Tel_Cxa-v-1.0/Tel_Cxa-v-1_03.png'
import firebase from '../../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



function Caixa() {

    const [mesa1, setMesa1] = useState([]);
    const [mesa2, setMesa2] = useState([]);
    const [mesa3, setMesa3] = useState([]);
    const [mesa4, setMesa4] = useState([]);
    const [total1, setTotal1] = useState(0);
    const [total2, setTotal2] = useState(0);
    const [total3, setTotal3] = useState(0);
    const [total4, setTotal4] = useState(0);

    const email = useSelector(state => state.usuarioEmail);
    const dispatch = useDispatch();



    var listaPedidosm1 = [];
    var listaPedidosm2 = [];
    var listaPedidosm3 = [];
    var listaPedidosm4 = [];

    function fecharConta1() {
        if (window.confirm("Deseja fechar a conta da mesa 1?")) {
            for (var i = 0; i < mesa1.length; i++) {
                firebase.firestore().collection('pedidos').doc(mesa1[i].id).delete().then(() => {
                }).then(() => {
                    alert('Conta fechada com sucesso')
                    setTotal1(0)

                }).catch(() => {

                    alert('Erro')

                })

            }

        } else {
            alert('Fechamento da conta cancelado')
        }
    }

    function fecharConta2() {
        if (window.confirm("Deseja fechar a conta da mesa 2?")) {
            for (var i = 0; i < mesa2.length; i++) {

                firebase.firestore().collection('pedidos').doc(mesa2[i].id).delete().then(() => {
                }).then(() => {
                    alert('Conta fechada com sucesso')
                    setTotal2(0)
                }).catch(() => {

                    alert('Erro')

                })

            }
        } else {
            alert('Fechamento da conta cancelado')
        }
    }

    function fecharConta3() {
        if (window.confirm("Deseja fechar a conta da mesa 3?")) {
            for (var i = 0; i < mesa3.length; i++) {

                firebase.firestore().collection('pedidos').doc(mesa3[i].id).delete().then(() => {
                }).then(() => {

                    alert('Conta fechada com sucesso')
                    setTotal3(0)

                }).catch(() => {

                    alert('Erro')

                })

            }
        } else {
            alert('Fechamento da conta cancelado')
        }
    }

    function fecharConta4() {
        if (window.confirm("Deseja fechar a conta da mesa 4?")) {
            for (var i = 0; i < mesa4.length; i++) {
                firebase.firestore().collection('pedidos').doc(mesa4[i].id).delete().then(() => {
                }).then(() => {
                    alert('Conta fechada com sucesso')
                    setTotal4(0)
                }).catch(() => {

                    alert('Erro')

                })

            }
        } else {
            alert('Fechamento da conta cancelado')
        }
    }



    var valorTotal1 = 0;
    var valorTotal2 = 0;
    var valorTotal3 = 0;
    var valorTotal4 = 0;

    const db = firebase.firestore();

    function botaoPedidos() {

        getDados();
        getValorTotal();



    }
    


    function getValorTotal() {
  
            for (var i = 0; i < mesa1.length; i++) {
                valorTotal1 = mesa1[i].valor + valorTotal1
                if (i === (mesa1.length - 1)) {
                    setTotal1(valorTotal1)
                }
            }

        

        for ( i = 0; i < mesa2.length; i++) {
            valorTotal2 = mesa2[i].valor + valorTotal2
            if (i === (mesa2.length - 1)) {
                setTotal2(valorTotal2)
            }
        }




        for ( i = 0; i < mesa3.length; i++) {
            
            valorTotal3 = mesa3[i].valor + valorTotal3
            if (i === (mesa3.length - 1)) {
                setTotal3(valorTotal3)
            }
        }



        for ( i = 0; i < mesa4.length; i++) {
            valorTotal4 = mesa4[i].valor + valorTotal4
            if (i === (mesa4.length - 1)) {
                setTotal4(valorTotal4)
            }
        }



    }

    function getDados() {
        db.collection('pedidos').where('mesa', '==', 1).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaPedidosm1.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setMesa1(listaPedidosm1);
        })

        db.collection('pedidos').where('mesa', '==', 2).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaPedidosm2.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setMesa2(listaPedidosm2);
        })
        db.collection('pedidos').where('mesa', '==', 3).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaPedidosm3.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setMesa3(listaPedidosm3);
        })
        db.collection('pedidos').where('mesa', '==', 4).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaPedidosm4.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setMesa4(listaPedidosm4);
        })

    }
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
                            <h1 className="div-text-pagina">
                            {
                                useSelector(state => state.usuarioLogado) > 0 ? <h1 className="h4 text-topo-pagina text-right mr-2 mt-2">Seja bem vindo: {email}</h1>  : null }
                            </h1>
                        </div>
                    </div>
                </div>



                <div className="div-topo">
                    <div className="menu-site">
                        <ul>
                            <li><a href="#" class="botao-menu btn btn-block">Inicio</a></li>
                            {useSelector(state => state.usuarioEmail === 'caixa@sigr.com') ?
                                
                                <>
                                    <li><a type="button" onClick={ botaoPedidos} href="#" class="botao-menu btn btn-block">Mesas</a></li>
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
                        <div className="conteudo-site-caixa justify-content-center">
                        <h1 className="strong mt-3 ml-5"> Lista de Mesas</h1>
                            { mesa1[0] !== undefined && total1 > 0 &&
                                <>

                                    <div className="div-valores">
                                        <h1 className="h3 text-center">Mesa 01  </h1>
                                        <h1 className="h3 text-center">Valor total: R$ {total1}</h1>
                                        <div className="h3 text-center"> <button onClick={fecharConta1} type="button" className="h4 btn btn-default btn-sm btn-fechar">Fechar Conta</button></div>

                                    </div>

                                </>
                            }

                            {mesa2[0] !== undefined  && total2 > 0 &&
                                <>
                                    <div className="div-valores">
                                        <h1 className="h3 text-center">Mesa 02  </h1>
                                        <h1 className="h3 text-center">Valor total: R$ {total2}</h1>
                                        <div className="h3 text-center"> <button onClick={fecharConta2} type="button" className="h4 btn btn-default btn-sm btn-fechar">Fechar Conta</button></div>
                                    </div>
                                </>
                            }

                            {mesa3[0] !== undefined && total3 > 0 &&
                                <>
                                    <div className="div-valores">
                                        <h1 className="h3 text-center">Mesa 03  </h1>
                                        <h1 className="h3 text-center">Valor total: R$ {total3}</h1>
                                        <div className="h3 text-center"> <button onClick={fecharConta3} type="button" className="h4 btn btn-default btn-sm btn-fechar">Fechar Conta</button></div>
                                    </div>
                                </>
                            }

 
                            { mesa4[0] !== undefined && total4 > 0 &&
                                <>
                                    <div className="div-valores">
                                        <h1 className="h3 text-center">Mesa 04  </h1>
                                        <h1 className="h3 text-center">Valor total: R$ {total4}</h1>
                                        <div className="h3 text-center"> <button onClick={fecharConta4} type="button" className="h4 btn btn-default btn-sm btn-fechar">Fechar Conta</button></div>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>

            </section>
        </div>

    )
}
export default Caixa;