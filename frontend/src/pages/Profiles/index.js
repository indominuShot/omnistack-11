import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


export default function Profile(){
    const ong_name = localStorage.getItem('ong_name');
    const ong_id = localStorage.getItem('ong_id');
    const [incidents, setincidents] = useState([]);

    const history = useHistory();

        useEffect(() => {
           api.get('Profile', {
               headers: {
                   authorization: ong_id
               }
           }).then(response => {
               setincidents(response.data);
           });

        }, [ong_id, incidents]);

        function handleLogout(){
            localStorage.clear();

            history.push('/');
        }

        async function handleDeleteIncident(id){
            try{
                await api.delete(`incidents/${id}`, {
                    headers: {
                        authorization: ong_id
                    }
                });
            }
            catch(err){
                alert("Erro ao deletar o caso, tente novamente!")
            }
        }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo"/>
                <span>Bem vindo, {ong_name}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={() => handleLogout()}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso: {incident.title}</strong>
                            <p>Caso teste</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}</p>

                            <button type="button">
                                <FiTrash2 size={20} color="#a8a8b3" onClick={
                                    () => handleDeleteIncident(incident.id)
                                    }
                                />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}