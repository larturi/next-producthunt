import React, { useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';

import { Layout } from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit , Error} from '../components/ui/Formulario';

import { useValidator } from '../hooks/useValidator';
import validarIniciarSesion from '../validator/validarIniciarSesion';

import firebase from '../firebase';

export default function Login() {
  
  const [ error, setError ] = useState(false);

    const initialState = {
      email: '',
      password: ''
    };

    const {
      valores,
      errores,
      handleSubmit,
      handleChange,
      handleBlur
    } = useValidator(initialState, validarIniciarSesion, iniciarSesion);

    const { email, password } = valores;

    async function iniciarSesion() {
      try {
        const usuario = await firebase.login(email, password);
        Router.push('/');
      } catch (error) {
        console.error('Hubo un error al autenticar el usuario ', error.message);
        setError(error.message);
      }
    }

    return (
      <div>
        <Layout>
           <>
              <h1
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                `}
              >
                Iniciar Sesión
              </h1>

              <Formulario
                onSubmit={handleSubmit}
                noValidate
              >
                <Campo>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text"
                    id="email"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                { errores.email && <Error>{ errores.email }</Error> }

                <Campo>
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password"
                    id="password"
                    placeholder="Tu password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                { errores.password && <Error>{ errores.password }</Error> }
                { error && <Error>{ error }</Error> }

                <InputSubmit 
                  type="submit"
                  value="Iniciar Sesión"
                />

              </Formulario>
           </>
        </Layout>
      </div>
    )
}
