import React, { useEffect, useState } from 'react'
import './item.css'
import firebase from '../../src/config/firebase'
import { firestore } from "firebase";
import { useSelector } from 'react-redux';
import Pedidos from './pedido';


function Item({ nome, descricao, imagem, valor, id, mesa, pedidoId, ordem }) {
    const [flagEditar, setflagEditar] = useState();
    const [quantidade, setQuantidade] = useState();
    const [urlImagem, setUrlImagem] = useState();
    const timestamp = firestore.FieldValue.serverTimestamp();

    var numMesa = null
    var usuarioEmail = useSelector(state => state.usuarioEmail);

    firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then(url => {
        setUrlImagem(url);
    })

    function adicionarPedido() {
        if(quantidade > 0){
            if (window.confirm("Deseja confirmar o pedido ?")) {
                switch (usuarioEmail) {
                    case 'cliente@sigr.com':
                        numMesa = 1;
                        break;
                    case 'cliente2@sigr.com':
                        numMesa = 2;

                        break;
                    case 'cliente3@sigr.com':
                        numMesa = 3;

                        break;
                    case 'cliente4@sigr.com':
                        numMesa = 4;

                        break;

                }

                firebase.firestore().collection('pedidos').add({
                    nome: nome,
                    quantidade: quantidade,
                    valor: quantidade * valor,
                    status: 'Pedido Feito',
                    mesa: numMesa,
                    timestamp: timestamp
                }).then(() => {
                    alert('Pedido adicionado com sucesso')
                }).catch(() => {
                    alert('erro')
                });

            } else {
                alert('Pedido não confirmado')
            }




        }else{
            alert('Necessário selecionar a quantidade')
        }
    }
    return (
            <>
            { usuarioEmail === 'admin@sigr.com' ?
            
            <div className="menu-consulta">
                <div className="">
                    <div className="resize-adm"><img className="resize-adm" src={urlImagem}></img></div>
                    <div className="consulta-text mt-3">
                        <h4 className="title-consulta">Nome: {nome}</h4>
                        <h4 className="title-consulta">Descrição: {descricao} </h4>
                        <h4 className="title-consulta">Valor: {valor}</h4>
                    </div>
                </div>
            </div>
            
                
                : usuarioEmail === 'cliente@sigr.com' || usuarioEmail === 'cliente2@sigr.com' || usuarioEmail === 'cliente3@sigr.com'|| usuarioEmail === 'cliente4@sigr.com' ?
                  
                <div className="col-md-6 offset-md-0 menu-cardapio">
                    <div className="margin-item-adm">  
                        <div className="resize">
                            <img className="resize botao-text-esquerda" src={urlImagem}></img>
                        </div>                          
                        
                        <div className="botao-text-direita">
                        <h4 className="h3 title-consulta text-justify ml-5">{nome}</h4>
                        <h4 className="title-consulta text-justify text-success ml-5">Valor: {valor} R$ un.</h4>
                            <select class="custom-select mr-sm-2" onChange={(e) => setQuantidade(e.target.value)} placeholder="Quantidade" id="inlineFormCustomSelect">
                                <option value="1" >Quantidade</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <a onClick={adicionarPedido} type="button" className="botao-cardapio-item btn  mr-sm-2">Fazer pedido</a>
                        </div> 
                    </div>
                </div>
                : null 
                }
            </>
            )
        }

export default Item