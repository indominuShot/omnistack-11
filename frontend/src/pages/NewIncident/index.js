import React, {useState} from 'react';

import {Link} from 'react-router-dom';
import {FiArrowLeft} from  'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';


export default function NewIncident(){
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [value, setvalue] = useState(0);

    async function handleNewIncident(e){
        e.preventDefatul();
        const data = {
            title,
            description,
            value
        }
        
        try{
            const response = await api.post('/incidents', data);

            console.log(response);
        }
        catch(err){
            alert("Erro ao criar um novo caso. Tente novamente!");
        }
    }


    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    <Link className="back-link" to="/Profiles">
                        <FiArrowLeft size={16} color="#e02441"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        required
                        onChange={e => settitle(e.target.value)}    
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        required
                        onChange={e => setdescription(e.target.value)}    
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        required
                        onChange={e => setvalue(e.target.value)}    
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}