import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { register } from '../utils/services';

export default function () {

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'attendant',
        terms: false
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitForm = (e) => {
        e.preventDefault()
        register(registerData).then(res => {
            if (res._id) {
                alert("Registro exitoso");
                Router.push('/login');
            }
            else {
                alert("Register Failed", res.message)
            }
        }).catch(err => {
            alert("Register Failed", err.message)
        })
    }

    return (
        <div>
            <Head>
                <title>Registrarse</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-4 my-16 mx-auto md:w-1/3 h-full shadow-md rounded p-4">
                    <div className="text-xl">
                        <h1 className="text-center font-bold">Registrarse</h1>
                    </div>
                    <label htmlFor="name">Nombre</label>
                    <input className="p-4" name="name" value={registerData.name} onChange={handleChange} type="name" id="name" placeholder="Ingrese su nombre" />
                    {(registerData.name.length < 6 && registerData.name != '') && <small className="text-red-500">Este campo es obligatorio*</small>}
                    <label htmlFor="email">Correo electrónico</label>
                    <input className="p-4" name="email" value={registerData.email} onChange={handleChange} type="email" id="email" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico" />
                    {(!re.test(registerData.email) && registerData.email != '') && <small className="text-red-500">Debes ingresar un correo valido*</small>}
                    <label htmlFor="password">Contraseña</label>
                    <input className="p-4" name="password" value={registerData.password} onChange={handleChange} type="password" id="password" placeholder="***********" />
                    {(registerData.password.length < 6 && registerData.password != '') && <small className="text-red-500">Debes ingresar una contraseña valida*</small>}
                    <label htmlFor="role">Rol</label>
                    <select className="p-4" name="role" value={registerData.role} onChange={handleChange} id="role">
                        <option value="attendant">Attendant</option>
                        <option value="speaker">Speaker</option>
                    </select>
                    <button type="submit"
                        disabled={!(re.test(registerData.email) && registerData.password.length >= 6 && registerData.name.length >= 6)}
                        className={
                            (re.test(registerData.email) && registerData.password.length >= 6) ?
                                "font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white rounded py-2"
                                :
                                "font-bold text-center bg-gray-400 hover:bg-bg-gray-600 text-white rounded py-2"
                        }
                    >
                        Registrarse
                    </button>
                    <Link
                        href="/login"
                    >
                        <button
                            className="font-bold text-center bg-yellow-500 hover:bg-yellow-700 text-white rounded py-2"
                        >
                            Ingresar
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}





