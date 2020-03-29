// Importa dependencias
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

// Carrega CSS
import './styles.css';

// Carrega imagens
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(props) {
    const [id, setId] = useState('');
    const history = useHistory();
    let messageError = useState('');

    function clearMessage(){
        history.push('/');
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
           
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch (err) {
            alert('Error on Login');
        }
    }

    if(props.location.state){
        if(props.location.state.message !== ""){
            messageError = <div className="alert alert-danger">
                {props.location.state.message}
                <button type="button" className="close" onClick={clearMessage}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>;
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" className=""/>

                <form onSubmit={handleLogin} className="form-control">
                    <h1>I already have registration</h1>
                    
                    {messageError}

                    <input placeholder="Your ID" value={id} onChange={e => setId(e.target.value)} />
                    <button type="submit" className="button">GET IN</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        I have no registration
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}