import React, { useState } from 'react';
import './landingMgm.css'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const LandingAmbassador = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orientatore: {},
  });

  const [url, setUrl] = useState("");
  /*const orientatori = [
    {
      _id: '64c3811ba6da4afb4d117514',
      nome: 'Emilie',
      cognome: 'Morosetto',
      email: 'emilie.m@funnelconsulting.it',
      telefono: '333333331',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64c38138a6da4afb4d11751c',
      nome: 'Modificato',
      cognome: 'Modific',
      email: 'test@test.it',
      telefono: '333333399',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64c387fca6da4afb4d11c579',
      nome: 'Francesca',
      cognome: 'Di Lallo',
      email: 'dilallofrancesca@gmail.com',
      telefono: '3400559975',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64c39f42a6da4afb4d126609',
      nome: 'Test1',
      cognome: 'X',
      email: 'x@gmail.com',
      telefono: '33333',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64c3c3b0f67b84dfe6535356',
      nome: 'Alessia',
      cognome: 'Rossi',
      email: 'e@gmail.com',
      telefono: '333333',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64c3c99cf67b84dfe653be62',
      nome: 'Chiara',
      cognome: 'X',
      email: 'x@yahoo.it',
      telefono: '3333',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
    {
      _id: '64f70025c3839c005fd45007',
      nome: 'Marcello',
      cognome: 'Napoli',
      email: 'marcello@gmail.com',
      telefono: '3313968790',
      utente: '64ba3df7e1c3aea9bdc02785',
    },
  ];*/
  const orientatori = [
    {
      _id: '65647927e1a167777fc15157',
      nome: 'Monica',
      cognome: 'Masini',
      email: 'm.masini@onenetworksrl.it',
      telefono: '3338510337',
      utente: '655f707143a59f06d5d4dc3b',
    },
    {
      _id: '65647986e1a167777fc15161',
      nome: 'Riccardo',
      cognome: 'Rosati',
      email: 'r.rosati@onenetworksrl.it',
      telefono: '3277952611',
      utente: '655f707143a59f06d5d4dc3b',
    },
    {
      _id: '656479ace1a167777fc15164',
      nome: 'Claudia',
      cognome: 'Rinaldi',
      email: 'c.rinaldi@onenetworksrl.it',
      telefono: '3393492094',
      utente: '655f707143a59f06d5d4dc3b',
    },
    {
      _id: '65647e57e1a167777fc1539d',
      nome: 'Cinzia',
      cognome: 'Nada',
      email: 'unicoordinamento@onenetworksrl.it',
      telefono: '3394168452',
      utente: '655f707143a59f06d5d4dc3b',
    },
    {
      _id: '65797751388946caed958521',
      nome: 'Cristina',
      cognome: 'Saltarelli',
      email: 'c.saltarelli@onenetworksrl.it',
      telefono: '3803082276',
      utente: '655f707143a59f06d5d4dc3b',
    },
  ]; 

  const [selectedOri, setSelectedOri] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'orientatore') {
      const selectedOrientatore = orientatori.find((orient) => orient._id === value);
      setFormData({ ...formData, [name]: selectedOrientatore });
      setSelectedOri(value)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [viewUrl, setViewUrl] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.orientatore
      ) {
        setIsLoading(true);
        const min = 100000; // Valore minimo a 6 cifre
        const max = 999999; // Valore massimo a 6 cifre
        const uniqueCode = Math.floor(Math.random() * (max - min + 1)) + min;
        const uniqueCodeString = uniqueCode.toString().padStart(6, '0'); 
        
        const cognomeSenzaSpazi = formData.lastName.replace(/\s+/g, '_');
        //const url = `https://comparatore.comparacorsi.it/mgm/landing-invitato?nome=${formData.firstName}&cognome=${formData.lastName}&codice_univoco=${uniqueCode}`;
        const url = `https://comparatore.comparacorsi.it/mgm/${formData.firstName}_${cognomeSenzaSpazi}/${uniqueCode}`;
        //const url = `https://test-comparatore.netlify.app/mgm/landing-invitato?nome=${formData.firstName}&cognome=${formData.lastName}&codice_univoco=${uniqueCode}`;
        setUrl(url);
        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            orientatore: formData.orientatore,
            uniqueCode: uniqueCodeString,
            url: url,
          };
          //https://leadsystem-production.up.railway.app/api/landing-ambassador
          //http://localhost:8000/api/landing-ambassador
          try {
            const response = await axios.post('https://leadsystemfunnel-production.up.railway.app/api/landing-ambassador', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
            console.log('Dati inviati con successo:', response.data);
            setViewUrl(true);
            setIsLoading(false);
          } catch (error) {
            console.error('Errore nell\'invio dei dati:', error);
            setIsLoading(false);
          }
      } else {
        alert('Per favore, compila tutti i campi del modulo.');
      }
  };

  return (
    <div className='landing-ambassador'>
      <h1>Genera il link Ambassador</h1>
      <form className='form-ambassador'>
        <div>
          <label htmlFor="firstName">Nome:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Cognome:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Cellulare:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="orientatore">Orientatore:</label>
          <select
            id="orientatore"
            name="orientatore"
            value={selectedOri}
            onChange={handleChange}
            required
          >
            <option value="">
              Seleziona un orientatore
            </option>
            {orientatori.map((orientatore) => (
              <option key={orientatore._id} value={orientatore._id}>
                {orientatore.nome + ' ' + orientatore.cognome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>{!loading ? 'Genera link': 'Loading...'}</button>
      </form>
      {viewUrl && url && (
        <div className='url-redirect'>
            <p>{url}</p>
            <CopyToClipboard text={url}>
                <button className='copy-button'>Copy</button>
            </CopyToClipboard>
        </div>
      )}
    </div>
  );
};

export default LandingAmbassador;