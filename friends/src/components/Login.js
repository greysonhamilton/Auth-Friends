import React from 'react';
import axios from 'axios';

export const Login = (props) => {
    const { history } = props;

    const intialLoginValues = {
         
        username: '',
        password: ''

    }

    const [loginValues, setValues] = useState(intialLoginValues);

    const handleChanges = (e) => {

        setValues({...loginValues, [e.target.name]: e.target.value})
    
    }

    const login = (e) => {
        
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/login', loginValues)
            .then((res) => {
                localStorage.setItem('token', res.data.payload);
                history.push('/protected');
            })
            .catch((err) => {
                console.log(err);
                setValues(intialLoginValues);

            })

    }

    return (

        <form onSubmit={login}>
            <label htmlFor='username'>
                Username: 
                <input
                    id='username' 
                    name='username'
                    type='text'
                    value={loginValues.username} 
                    onChange={handleChanges}
                     />
            </label>
            <label htmlFor='password'>
                Password: 
                <input 
                    id='password' 
                    name='password' 
                    type='text' 
                    value={loginValues.password} 
                    onChange={handleChanges}
                     />
            </label>
            <button>Login</button>
        </form>
    )
};