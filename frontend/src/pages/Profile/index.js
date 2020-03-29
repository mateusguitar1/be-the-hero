// Importa dependencias
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

// Carrega CSS
import './styles.css';

// Carrega imagens
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongID');

    if(ongId === null){
        history.push({
            pathname: '/',
            state: {
                message: "Log in before to enter the application"
            }
        });
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('Error on delete Case');
        }
    }

    async function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
       <div className="profile-container">
           <header>
               <img src={logoImg} alt="Be The Hero"/>
                <span>Welcome, {ongName}</span>

               <Link className="button" to="/incidents/new">Register new case</Link>
               <button type="button" onClick={handleLogout}>
                   <FiPower size={18} color="#E02041" />
               </button>
           </header>

           <h1>Registered Cases</h1>

           <ul>
               {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASE:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIPTION:</strong>
                    <p>{incident.description}</p>

                    <strong>AMOUNT:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} className="delete" />
                    </button>
                </li>
               ))}               
           </ul>
       </div>
    );
}