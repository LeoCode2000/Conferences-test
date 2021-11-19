import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import { setUser } from '../redux/actions'
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Link from 'next/link';

export default function Basescreen({ children }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            const cookies = new Cookies();
            const user = cookies.get('user')
            if (user) {
                dispatch(setUser(user));
            }
        }
    }, [user])

    if (user && user.token) {
        return (
            <div>
                <Navbar role={user.role} />
                {children}
            </div>
        )
    }

    else {

        return (
            <div className="grid grid-cols-1 gap-4 my-16 mx-auto md:w-1/3 h-full shadow-md rounded p-4">
                <h3 className="text-3xl font-extrabold text-center">
                    No has iniciado sesión
                </h3>
                <Link
                    href="/login"
                >
                    <button
                        className="bg-indigo-500 px-4 py-2 text-white rounded hover:bg-indigo-700 font-bold"
                    >
                        Ingresar
                    </button>
                </Link>
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
        )
    }
}
