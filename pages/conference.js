import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createConference } from '../utils/services';
import Basescreen from '../components/basescreen';

export default function () {

    const user = useSelector(state => state.user);

    const [confereceData, setConfereceData] = useState({
        name: '',
        date: '',
        location: '',
        quota: '',
        state: 'active',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setConfereceData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitForm = (e) => {
        e.preventDefault()
        createConference(confereceData, user.token).then(res => {
            if (res._id) {
                alert("Registro exitoso");
                Router.push('/');
            }
            else {
                alert("Register Failed", res.message)
            }
        }).catch(err => {
            alert("Register Failed", err.message)
        })
    }

    return (
        <Basescreen>
            <Head>
                <title>Crear conferencia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-4 my-16 mx-auto md:w-1/3 h-full shadow-md rounded p-4">
                    <div className="text-xl">
                        <h1 className="text-center font-bold">Crear una conferencia</h1>
                    </div>
                    <label htmlFor="name">Nombre de la conferencia</label>
                    <input className="p-4" name="name" value={confereceData.name} onChange={handleChange} type="text" id="name" aria-describedby="emailHelp" placeholder="Ingrese el nombre de la conferencia" />
                    {(confereceData.name.length < 3 && confereceData.name != '') && <small className="text-red-500">Este campo es obligatorio*</small>}
                    <label htmlFor="date">Fecha</label>
                    <input className="p-4" name="date" value={confereceData.date} onChange={handleChange} type="date" id="date" aria-describedby="emailHelp" placeholder="Ingrese la fecha de la conferencia" />
                    {(confereceData.date.length < 3 && confereceData.date != '') && <small className="text-red-500">Este campo es obligatorio*</small>}
                    <label htmlFor="location">Lugar</label>
                    <input className="p-4" name="location" value={confereceData.location} onChange={handleChange} type="text" id="location" aria-describedby="emailHelp" placeholder="Ingrese el lugar de la conferencia" />
                    {(confereceData.location.length < 3 && confereceData.location != '') && <small className="text-red-500">Este campo es obligatorio*</small>}
                    <label htmlFor="quota">Cupo</label>
                    <input className="p-4" name="quota" value={confereceData.quota} onChange={handleChange} type="number" id="quota" aria-describedby="emailHelp" placeholder="Ingrese el cupo de la conferencia" />
                    {(confereceData.quota.length < 1 && confereceData.quota != '') && <small className="text-red-500">Este campo es obligatorio*</small>}
                    <label htmlFor="state">Estado</label>
                    <select className="p-4" name="state" value={confereceData.state} onChange={handleChange} id="state">
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                    <button type="submit"
                        disabled={!(
                            confereceData.name.length >= 3 &&
                            confereceData.date.length >= 3 &&
                            confereceData.location.length >= 3 &&
                            confereceData.quota.length >= 1
                        )}
                        className={
                            (
                                confereceData.name.length >= 3 &&
                                confereceData.date.length >= 3 &&
                                confereceData.location.length >= 3 &&
                                confereceData.quota.length >= 1
                            ) ?
                                "font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white rounded py-2"
                                :
                                "font-bold text-center bg-gray-400 hover:bg-bg-gray-600 text-white rounded py-2"
                        }
                    >
                        Crear conferencia
                    </button>
                </div>
            </form>
        </Basescreen>
    )
}





