import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';

export default function Navbar({ role }) {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="grid grid-cols-2 bg-indigo-500 px-8 py-4">
            <div className="font-bold">
                <Link href="/">
                    <a className="text-white text-2xl">
                        Conferencias
                    </a>
                </Link>
            </div>
            <div className="grid grid-cols-2 justify-end">

                {
                    role === 'speaker' && <Link href="/conference" >
                        <a
                            className=" text-white font-bold py-2 px-4 rounded">
                            Crear una conferencia
                        </a>
                    </Link>
                }

                <div className="flex justify-end">
                    <button
                        onClick={handleLogout}
                        className=" text-white font-bold py-2 px-4 rounded">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div >
    )
}
