import React, { useState, useEffect } from 'react';

export const useValidator = (initialState, validation, fn) => {

    const [ valores, setValores ] = useState(initialState);
    const [ errores, setErrores ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errores).length === 0;

            if (noErrors) {
                fn();
            }

            setSubmitForm(false);
        }
    }, [errores]);

    const handleChange = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const erroresValidacion = validation(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    };

    const handleBlur = () => {        
        const erroresValidacion = validation(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    };

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
