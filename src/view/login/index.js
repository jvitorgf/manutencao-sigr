import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './login.css';

import firebase from '../../config/firebase.js'
import 'firebase/auth'
import logo from '../../imagens/Tel_Log-v-1.0/Tel_Log-v-1_01.png';


function Login() {
    
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    

    function autenticar() {

        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            alert('Logado com sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOGIN', usuarioEmail: email });
            }, 2000);


        })
            .catch(erro => {
                alert('erro')
            })

    }


    return (
       
        <div className="login-content">
            
            {
                useSelector(state => state.usuarioLogado) > 0 && email === 'admin@sigr.com' ? <Redirect to="/adm" ></Redirect> : null
            }

            {
                useSelector(state => state.usuarioLogado) > 0 && email === 'cliente@sigr.com'  ? <Redirect to="/cliente" ></Redirect> : null
            }

{
                useSelector(state => state.usuarioLogado) > 0 && email === 'cliente2@sigr.com'  ? <Redirect to="/cliente" ></Redirect> : null
            }
            {
                useSelector(state => state.usuarioLogado) > 0 && email === 'cliente3@sigr.com'  ? <Redirect to="/cliente" ></Redirect> : null
            }

{
                useSelector(state => state.usuarioLogado) > 0 && email === 'cliente4@sigr.com'  ? <Redirect to="/cliente" ></Redirect> : null
            }

            {
                useSelector(state => state.usuarioLogado) > 0 && email === 'caixa@sigr.com' ? <Redirect to="/caixa" ></Redirect> : null
            }

            {
                useSelector(state => state.usuarioLogado) > 0 && email === 'cozinha@sigr.com' ? <Redirect to="/cozinha" ></Redirect> : null
            }
            <div className="box">
                <img src={logo} alt="img logo"></img>
                <h1 className="tela-login h3">Tela de Login</h1>
                <form className="form-horizontal mx-auto">
                    <div className="form-group mb-5">
                        <label for="inputUsuario" className="h4 col-md-6 offset-md-0 mt-5" >Usuário</label>
                        <div class="col-md-12 col-md-12 offset-md-0"><input onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu nome de usuário" type="text" className="imput form-control my-2" id="inputUsuario"></input></div>

                    </div>
                    <div className="form-group mb-5">
                        <label for="inputSenha" className="h4 col-md-6 offset-md-0">Senha</label>
                        <div class="col-md-12 offset-md-0"><input onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" type="password" className="imput form-control my-2" id="inputSenha"></input></div>
                    </div>
                    <div class="col-md-12 offset-md-2"><button onClick={autenticar} type="button" className="botao-menu-corpo btn btn-lg btn-login text-white mt-5">Entrar</button></div>
                </form>

            </div>
        </div>
    );
}

export default Login;
