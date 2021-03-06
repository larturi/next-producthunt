import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Imagen = styled.img`
   width: 100px;
`;

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;

    @media (max-width:768px) {
        padding: 2rem;
    }
`;
const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: darkgray;

    :hover {
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    margin-top: 1rem;
    color: #888;
    line-height: 1.4;
`

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        font-family: 'PT Sans', sans-serif;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center; 
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }

    @media (max-width:768px) {
        div {
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        p {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 700;
        }
    }

`;

export const DetallesProducto = ({ producto }) => {
     
    const { id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos} = producto

    return (
         <Producto>
             <DescripcionProducto> 
                 <div>
                    <Imagen src={urlimagen} alt={nombre}/>
                 </div>
                 <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>
                        <Titulo>{ nombre }</Titulo>
                    </Link>
                     <TextoDescripcion>{ descripcion }</TextoDescripcion>
                     <Comentarios>
                         <div>
                             <img src="/static/img/comentario.png" />
                             <p>{ comentarios.length } comentarios</p>
                         </div>
                     </Comentarios>

                     <p>Publicado hace: { formatDistanceToNow(new Date(creado), { locale: es }) }</p>
                 </div>
             </DescripcionProducto>

             <Votos>
                <div>&#9650;</div>
                <p>{ votos }</p>
             </Votos>
         </Producto>
    )
};

export default DetallesProducto;
 