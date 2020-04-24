import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){

    const [id, setid] = useState('');

    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault();

        console.log(id);
        
        try{
            const response = await api.post('session', {id});

            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', response.data.name);
            
            history.push('Profiles');
        }
        catch(err){
            alert("falha no login, tente novamente!");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        type="text" 
                        placeholder="Sua ID"
                        required
                        value={id}
                        onChange={e => setid(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="Register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    );
}