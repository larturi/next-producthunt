import React from 'react';
import { Buscador } from '../ui/Buscador';
import { Navbar } from './Navbar';
import Link from 'next/link';

export const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Buscador />
                    <Navbar />
                </div>

                <div>
                    <p>Hola: Leandro</p>
                    <button type="button">Cerrar Sesión</button>

                    <Link href="/">Login</Link>
                    <Link href="/">Crear Cuenta</Link>
                </div>
            </div>
        </header>
    )
}
