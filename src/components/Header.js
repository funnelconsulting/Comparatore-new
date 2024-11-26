import React from 'react'
import logo from '../imgs/LOGO_COMPARA_CORSI_COLOR-2048x289.webp';
import logow from '../imgs/LOGO_COMPARA_CORSI_BIANCO-1536x217.webp';
import whats from '../imgs/whats.png'
import './header.css';
import { useSearch } from '../context/SearchContext';
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone } = useSearch();
  const whatsClick = async () => {
    const leadData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      whatsClick: 'si',
    };
    console.log(leadData)
    window.open(`https://wa.me/393513583765`, '_blank')
  try {
      //https://servercpchatbot.up.railway.app/api/setWhatsClick
      //http://localhost:8000/api/setWhatsClick
      const response = await axios.post('https://servercpchatbot.up.railway.app/api/setWhatsClick', leadData);
      console.log(response.data);
  } catch (error) {
      console.error(error)
    }
  }
  const goBack = () => {
    if(window.history.length > 1){
      window.history.back();
      window.scrollTo(0, 0);
    } else {
      navigate('/universita', { replace: true });
    }
  }
  return (
    <div className='header'>
      <FaAngleLeft onClick={goBack} className='indietro-header' style={{cursor: 'pointer'}} size={24} color='white' />
      <div>
        <img src={logow} alt='logo comparacorsi' />
      </div>
      {/*<div>
        <button onClick={whatsClick}>
          <img alt='bottone whatsapp' src={whats} />
            Contattaci
        </button>
      </div>*/}
    </div>
  )
}

export default Header