import React, { useEffect, useState } from 'react'
import './bebidas.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import bebida1 from '../../imagens/pratos/bebida1.png';
import bebida2 from '../../imagens/pratos/bebida2.png';
import bebida3 from '../../imagens/pratos/bebida3.png';
import bebida4 from '../../imagens/pratos/bebida4.png';
import bebida5 from '../../imagens/pratos/bebida5.png';
import bebida6 from '../../imagens/pratos/bebida6.png';

function Bebidas(){
    return(
        <>
        <div className="">
            
            <a  href="#"><img src={bebida1} className="img_menu" alt="Imagem"></img></a>
            <a  href="#"><img src={bebida2} className="img_menu" alt="Imagem"></img></a>
            <a  href="#"><img src={bebida1} className="img_menu" alt="Imagem"></img></a>
            <a  href="#"><img src={bebida4} className="img_menu" alt="Imagem"></img></a>
            <a  href="#"><img src={bebida5} className="img_menu" alt="Imagem"></img></a>
            <a  href="#"><img src={bebida6} className="img_menu" alt="Imagem"></img></a>
            
        </div>
        

        </>
    )

}
export default Bebidas;