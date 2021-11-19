import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Basescreen from '../components/Basescreen';
import { getConferences, updateConferenceStatus, subscribe, unSubscribe, getUsers } from '../redux/actions';
import ListConference from '../components/ListConference';

export default function () {

  const dispatch = useDispatch();

  const { user, conferences, users } = useSelector(state => state)

  const subscribeConferece = (conference) => {
    dispatch(subscribe(conference._id, user.token));
  }

  const unSubscribeConferece = (conference) => {
    dispatch(unSubscribe(conference._id, user.token));
  }

  const changeStatus = (conference) => {
    dispatch(updateConferenceStatus(conference._id, user.token));
  }

  useEffect(() => {
    if (user) {
      dispatch(getConferences(user.token))
      dispatch(getUsers(user.token))
    }
  }, [user])

  return (
    <Basescreen>
      <Head>
        <title>Conferencias</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        user &&
        <div>
          {(conferences && conferences.owned) && <ListConference users={users} title="Mis Conferencias " conferences={conferences.owned} user={user} changeStatus={changeStatus} />}
          {(conferences && conferences.subscribed) && <ListConference users={users} title="Mis Conferencias " conferences={conferences.subscribed} user={user} subscribeConferece={subscribeConferece} subscribed={true} unSubscribeConferece={unSubscribeConferece} />}
          {(conferences && conferences.available) && <ListConference users={users} title="Conferencias Disponibles" conferences={conferences.available} user={user} subscribeConferece={subscribeConferece} />}
        </div>
      }
    </Basescreen >
  )
}