// Importa dependencias
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

// Carrega CSS
import './styles.css';

// Carrega imagens
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
        
            alert(`Access ID : ${response.data.id}`);

            history.push('/');

        }catch(err) {
            alert('Error on create ONG');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Register</h1>
                    <p>Register, enter the platform and help people find the cases of your ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        I already have registration
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Name of the ONG" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}  />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}  />

                    <div className="input-group">
                        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)}  />                        
                        <input placeholder="ST" style={{width: 80}} value={uf} onChange={e => setUF(e.target.value)}   />
                    </div>

                    <button type="submit" className="button">REGISTER NOW</button>

                </form>
            </div>
        </div>
    );
}