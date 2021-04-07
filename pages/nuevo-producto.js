import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import Router, { useRouter } from 'next/router';

import { FirebaseContext } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';

import { Layout } from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit , Error} from '../components/ui/Formulario';

import { useValidator } from '../hooks/useValidator';
import validarCrearProducto from '../validator/validarCrearProducto';
import { Error404 } from '../components/layout/404';

const initialState = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
};

export default function CrearProducto() {

  // state de las imagenes
  const [ nombreimagen, guardarNombre ] = useState('');
  const [ subiendo, guardarSubiendo ] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [ urlimagen, guardarUrlImagen ] = useState('');
  const [ submitform, setSubmitform ] = useState(false);

  const [ error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidator(initialState, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Hook de Routing para redirect
  const router = useRouter();

  // Context con las operaciones CRUD de Firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {

    // Si el usuario no esta autenticado, llevar al login
    if (!usuario) {
      return router.push('/login');
    }

    // Crear objeto producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName 
      },
      haVotado: []
    };

    if(submitform) {
      // Insertar en Firebase
      firebase.db.collection('productos').add(producto); 
      setSubmitform(false);

      router.push('/');
    }
    
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
      guardarSubiendo(error);
      console.error(error);
  };

  const handleUploadSuccess = nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombre(nombre)
      firebase
          .storage
          .ref("productos")
          .child(nombre)
          .getDownloadURL()
          .then(url => {
            guardarUrlImagen(url);
          } );
  };


  return (
    <div>
      <Layout>
         { 
          !usuario ? <Error404 /> : (
         
         <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Nuevo Producto
            </h1>

            <Formulario
              onSubmit={handleSubmit}
              noValidate
            >

              <fieldset>

                <legend>Información General</legend>
            
                  <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                      type="text"
                      id="nombre"
                      placeholder="Nombre del Producto"
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>

                  { errores.nombre && <Error>{ errores.nombre }</Error> }

                  <Campo>
                    <label htmlFor="empresa">Empresa</label>
                    <input 
                      type="text"
                      id="empresa"
                      placeholder="Tu empresa"
                      name="empresa"
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>

                  { errores.empresa && <Error>{ errores.empresa }</Error> }

                  <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <FileUploader 
                      accept="image/*"
                      id="imagen"
                      name="imagen"
                      randomizeFilename
                      storageRef={firebase.storage.ref("productos")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                    />
                  </Campo>

                  <Campo>
                    <label htmlFor="url">Url</label>
                    <input 
                      type="text"
                      id="url"
                      name="url"
                      placeholder="Url del producto"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>

                  { errores.url && <Error>{ errores.url }</Error> }

              </fieldset>

              <fieldset>
                <legend>Sobre tu producto</legend>

                <Campo>
                    <label htmlFor="url">Descripción</label>
                    <textarea 
                      id="descripcion"
                      name="descripcion"
                      value={descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Campo>

                  { errores.descripcion && <Error>{ errores.descripcion }</Error> }


              </fieldset>

             
              { error && <Error>{ error }</Error> }

              <InputSubmit 
                type="submit"
                value="Crear Producto"
                onClick={ () => { setSubmitform(true) } }
              />

            </Formulario>
         </>
         )}

      </Layout>
    </div>
  )
}
