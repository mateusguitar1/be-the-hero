// Importa dependencias
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

// Carrega CSS
import './styles.css';

// Carrega imagens
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongID');

    if(ongId === null){
        history.push({
            pathname: '/',
            state: {
                message: "Log in before to enter the application"
            }
        });
    }

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        }catch (err) {
            alert('Error on create New Case');       
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Register new case</h1>
                    <p>Describe the case in detail to find a hero to solve it.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Title of case"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea name="" id="" 
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="numeric" 
                        placeholder="Amount in BRL"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button type="submit" className="button">SAVE</button>
                    

                </form>
            </div>
        </div>
    );
}