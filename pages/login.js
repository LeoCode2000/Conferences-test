import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../redux/actions';
import { login } from '../utils/services';
import Router from 'next/router';

export default function () {

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''

    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitForm = (e) => {
        e.preventDefault()
        login(loginData).then(res => {
            if (res.token) {
                dispatch(loginAction(res));
                Router.push('/');
            }
            else {
                alert("Invalid credentials")
            }
        }).catch(err => {
            alert("Login Failed")
        })
    }

    return (
        <div >
            <Head>
                <title>Ingresar</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-4 my-16 mx-auto md:w-1/3 h-full shadow-md rounded p-4">
                    <div className="text-xl">
                        <h1 className="text-center font-bold">Ingresar</h1>
                    </div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input name="email" onChange={handleChange} type="email" id="email" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico" className="p-4" />
                    {(!re.test(loginData.email) && loginData.email != '') && <small className="text-red-500">Debes ingresar un correo valido*</small>}
                    <small id="emailHelp" >No compartiremos su informacion personal a nadie mas.</small>
                    <label htmlFor="password">Contraseña</label>
                    <input name="password" onChange={handleChange} type="password" id="password" placeholder="***********" className="p-4" />
                    {(loginData.password.length < 6 && loginData.password != '') && <small className="text-red-500">Debes ingresar una contraseña valida*</small>}
                    <button type="submit"
                        disabled={!(re.test(loginData.email) && loginData.password.length >= 6)}
                        className={
                            (re.test(loginData.email) && loginData.password.length >= 6) ?
                                "font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white rounded py-2"
                                :
                                "font-bold text-center bg-gray-400 hover:bg-bg-gray-600 text-white rounded py-2"
                        } >
                        Ingresar
                    </button>
                    <Link
                        href="/register"
                    >
                        <button
                            className="font-bold text-center bg-yellow-500 hover:bg-yellow-700 text-white rounded py-2"
                        >
                            Registrarse
                        </button>
                    </Link>
                </div>
            </form >
        </div >
    )
}
