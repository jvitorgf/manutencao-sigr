import React, { useEffect, useState } from 'react'
import './pedido.css'
import firebase from '../../src/config/firebase'
import { useSelector } from 'react-redux';

function Pedidos({ nome, quantidade, mesa, pedidoId, valor, status }) {
    var usuarioEmail = useSelector(state => state.usuarioEmail);

    function fecharPedido() {
        if (window.confirm("Deseja cancelar o pedido?")) {
            firebase.firestore().collection('pedidos').doc(pedidoId).delete().then(() => {
            }).then(() => {
                alert('Pedido removido com sucesso')
            }).catch(() => {
                alert('Erro')
            })
        } else {
            alert('Pedido não cancelado')
        }
    }

    function alterarStatus(temp) {
        const novoStatus = temp
            firebase.firestore().collection('pedidos').doc(pedidoId).update({
                    status: novoStatus
            }).then(() => {
                alert('Status do pedido alterado com sucesso')
            }).catch(() => {
                alert('erro')
            });
    }
    
    return (
        <div >
            { 
            usuarioEmail === 'cozinha@sigr.com' ?
                <>
                    
                    <div className="form-inline pedido-cozinha">
                        <label className="h4 ml-5">Nome</label>
                        <h3 className="strong ml-5 w-25 text-danger"> {nome}</h3>
                        <label className="h4 ml-5">Quantidade</label>
                        <h3 className="strong ml-5 text-danger">  {quantidade} </h3>
                        <label className="h4 ml-5">N⁰ da mesa</label>
                        <h3 className="strong ml-5 text-danger">  {mesa} </h3>
                        <select class="custom-select custom-select-cozinha  mr-sm-2 mr-2" onChange={(e) => alterarStatus(e.target.value)} placeholder={status} id="inlineFormCustomSelect">
                                <option value="Pedido Feito">Pedido Feito</option>
                                <option value="Em preparo">Em preparo</option>
                                <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>
                
                </> : usuarioEmail === 'cliente@sigr.com' && mesa === 1 ? <>
                <div className="pedidos-lista"><strong> {nome} </strong>
                        <span className="ml-3">{quantidade}</span>
                        <span className="ml-3" >{status}</span>
                        {
                            status !== 'Finalizado' &&
                            <button onClick={fecharPedido} type="button" className="botao-cardapio btn-default btn-sm btn-cancelar ml-3">Cancelar</button>

                        }
                    </div>
                </> : usuarioEmail === 'cliente2@sigr.com' && mesa === 2 ? <>
                <div className="pedidos-lista"><strong> {nome} </strong>
                        <span className="ml-3">{quantidade}</span>
                        <span className="ml-3" >{status}</span>
                        {
                            status !== 'Finalizado' &&
                            <button onClick={fecharPedido} type="button" className="botao-cardapio btn-default btn-sm btn-cancelar ml-3">Cancelar</button>

                        }
                    </div>
                </> : usuarioEmail === 'cliente3@sigr.com' && mesa === 3 ? <>
                <div className="pedidos-lista"><strong> {nome} </strong>
                        <span className="ml-3">{quantidade}</span>
                        <span className="ml-3" >{status}</span>
                        {
                            status !== 'Finalizado' &&
                            <button onClick={fecharPedido} type="button" className="botao-cardapio btn-default btn-sm btn-cancelar ml-3">Cancelar</button>

                        }
                    </div>
                </> : usuarioEmail === 'cliente4@sigr.com' && mesa === 4 ? <>
                    
                    <div className="pedidos-lista"><strong> {nome} </strong>
                        <span className="ml-3">{quantidade}</span>
                        <span className="ml-3" >{status}</span>
                        {
                            status !== 'Finalizado' &&
                            <button onClick={fecharPedido} type="button" className="botao-cardapio btn-default btn-sm btn-cancelar ml-3">Cancelar</button>

                        }
                    </div>
                </>
                                : null

            }
        </div >
    )
}

export default Pedidos