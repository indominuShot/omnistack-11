import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';

import './styles.css';


export default function Register(){
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [city, setcity] = useState('');
    const [uf, setuf] = useState('');
    
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email, 
            whatsapp, 
            city, 
            uf
        };

        try{
            const response = await api.post('ongs', data);  
                    
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }

        catch(err){
            alert("Erro ao cadastrar, tente novamente" + err);
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre em uma plataforma e ajude pessoas
                       a encontrarem os casos da sua ONG.</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02441"/>
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG"
                        required
                        value={name}
                        onChange={e => setname(e.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Whatsapp"
                        required
                        value={whatsapp}
                        onChange={e => setwhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            type="text" 
                            placeholder="Cidade"
                            required
                            value={city}
                            onChange={e => setcity(e.target.value)}
                         />
                        <input 
                            type="text" 
                            placeholder="UF" 
                            style={{width: 80}}
                            required
                            value={uf}
                            onChange={e => setuf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}