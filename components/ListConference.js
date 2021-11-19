import { useState } from "react";

export default function ListConference(props) {

    const { title, conferences, } = props;

    return (
        <div>
            <div className="text-xl my-16">
                <h1 className="text-center font-bold">{title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mx-40 my-8">
                {conferences &&
                    conferences.map(conference => <ListItemConference {...props} conference={conference} />)
                }
            </div>
        </div >
    );
}

function ListItemConference({ conference, user, users, subscribeConferece, unSubscribeConferece, changeStatus, subscribed }) {

    const [isOpen, setisOpen] = useState(false)

    console.log("conference", conference._id)

    return (
        <div className="shadow-md p-4" key={conference._id}>
            <div>
                <h2 className="font-semibold">{conference.name}</h2>
                <p>Poniente: {conference.speakerName}</p>
                <p>Fecha: {conference.date}</p>
                <p>Ubicacion: {conference.location}</p>
                <p>Cupos: {conference.quota}</p>
                {
                    conference.attendants.length > 0 && < div >
                        <button className=" font-bold " onClick={() => setisOpen(!isOpen)}>
                            {isOpen ? "Cerrar" : "Ver asistentes"}
                        </button>
                        {
                            isOpen && < div >
                                {
                                    users.map(user => {
                                        if (user.conferences.includes(conference._id)) {
                                            return <p key={user._id}>Asistente: {user.name}</p>
                                        }
                                    })
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            {
                (user && user.role === "speaker" && changeStatus) ?
                    < div className="flex justify-end">
                        <button onClick={() => { changeStatus(conference) }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            {conference.state === "active" ? "Desactivar" : "Activar"}
                        </button>
                    </div>
                    :
                    (user && user.role === "attendant") &&
                    < div className="flex justify-end">
                        <button onClick={() => { subscribed ? unSubscribeConferece(conference) : subscribeConferece(conference) }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            {subscribed ? "No puedo asistir" : "Inscribirme"}
                        </button>
                    </div>
            }
        </div >
    )
}
