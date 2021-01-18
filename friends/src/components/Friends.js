import React, {useState, useEffect, createContext} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import FriendForm from './FriendForm';

const friendsContext = createContext();

export const Friends = (props) => {

    const [friends, setFriends] = useState([]);
    // const [friend, setFriend] = useState({});
    
    const getFriends = () => {

        axiosWithAuth()
            .get('api/friends')
            .then((res) => {
                setFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {

        getFriends();

    }, []);

    return (

        <div>
            <h1>Friends</h1>
            {!edit ? (
                <div>
                    <h2>Add new friend</h2>
                    <friendsContext.Provider value={{setFriends}}>
                        <FriendForm />
                    </friendsContext.Provider>
                </div>

            ) : <span></span>}
            {friends.length > 0 ? <span></span> : <p>Loading...</p>}
            {(friends.length > 0 && !edit) ? friends.map((friend) => {
                return (
                    <Friend key={friend.id}>
                        <h3>{friend.name}</h3>
                        <p>Age: {friend.age}</p>
                        <p>E-mail: {friend.email}</p>
                    </Friend>
                )
            }) : <span></span>}
        </div>

    )

};