import React, { useState, useContext, createContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FriendForm = () => {

    const addFriends = useContext(createContext());

    const initialFormValues = {

        name: '',
        age: '',
        email: ''

    }

const [formValues, setFormValues] = useState(initialFormValues);

const submitFriend = (e) => {

    e.preventDefault();

    axiosWithAuth()
        .post('api/friends', formValues)
        .then((res) => {
            addFriends(res.data);
        })

        .catch((err) => {
            console.log(err);
        })

        setFormValues(initialFormValues);

}

const handleChanges = (e) => {

    setFormValues({...formValues, [e.target.name]: e.target.value})

}

return (

    <form onSubmit={submitFriend}>
        <label htmlFor='name'>
            Name: 
            <input 
                id='name'
                name='name'
                type='text' 
                value={formValues.name} 
                onChange={handleChanges}
                 />
        </label>
        <label htmlFor='age'>
            Age: 
            <input 
                id='age'
                name='age'
                type='text'
                value={formValues.age} 
                onChange={handleChanges}
                 />
        </label>
        <label htmlFor='email'>
            E-mail: 
            <input 
                id='email'
                name='email'
                type='text'
                value={formValues.age} 
                onChange={handleChanges}
                 />
        </label>
        <button>Add Friend</button>
    </form>
)

};