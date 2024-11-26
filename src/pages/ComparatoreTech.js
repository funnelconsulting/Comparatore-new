import React, {useState, useEffect} from 'react'
import './comparatore.css';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import comp1 from '../imgs/comp1.png';
import {useNavigate} from 'react-router-dom'
import dataCorsi from './output-tech.json';
import icon from '../imgs/Vector.png';
import { useSearchDT } from '../context/SearchContextDT';
import compmob1 from '../imgs/comp-mob1.png';
import axios from 'axios';

const ComparatoreTech = () => {
    const { lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone,
        areaTech, setAreaTech, corsoTech, setCorsoTech, budgetTech, setBudjetTech, timeTech, setTimeTech,
        workStatusTech, setWorkStatusTech, livelloCompetenze, setLivelloCompetenze } = useSearchDT();

    const navigate = useNavigate();
    const [accept, setAccept] = useState(false);
  
    const handleChange = (e, setter) => {
      setter(e.target.value);
    };

    const [isLoad, setIsLoad] = useState(false);

    const handleSendSheet = async () => {
        const urlSheet = 'https://sheet.best/api/sheets/1f7916cf-d261-4484-99ed-b915ec9b6b69';
        const formData = {
          Data: new Date(),
          nome: firstName,
          cognome: lastName,
          email: email,
          ["Percorso di studi"]: corsoTech,
        };
      
        await fetch(urlSheet, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
      
            if (response.ok) {
              console.log("Dati inviati con successo");
              setIsLoad(false);
              navigate('/digital-tech/risultati');
            } else {
              console.error("Errore nell'invio dei dati");
            }
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
      };
    
      const handleSendLead = async () => {

        /*const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            lavoro: workStatusTech,
            orario: timeTech,
            corsoDiLaurea: areaTech,
            facolta: corsoTech,
        }
       //https://leadsystem-production.up.railway.app/api/lead-compara-corsi
       //http://localhost:8000/api/lead-compara-corsi
        try {
          const response = await axios.post('https://leadsystem-production.up.railway.app/api/lead-compara-corsi', formData);
          console.log('Risposta dal server:', response.data);
          navigate('/digital-tech/risultati');
        } catch (error) {
          console.error('Errore durante la richiesta al server:', error);
        }*/
        await handleSendSheet();
      };

      const handleSubmit = () => {
        setIsLoad(true);
        if (firstName == "" || lastName == "" || email == "" || phone == "" || areaTech == "" || corsoTech == "" || workStatusTech == ""
        || livelloCompetenze == "" || timeTech == "" || accept == false) {
            alert('Compila tutti i campi');
            setIsLoad(false);
            return
        }
        try {
            handleSendLead();
        } catch (error) {
           console.error(error); 
           setIsLoad(false);
        }
      };

      const [uniqueArea, setUniqueArea] = useState([]);
      const [uniqueCorso, setUniqueCorso] = useState([]);

      useEffect(() => {
        const filteredAreaNames = [...new Set(dataCorsi.filter(data => data.Area === areaTech).map(data => data['Corsi + (non lo so) ']))];
        setUniqueArea(filteredAreaNames);
        setCorsoTech("");
        setBudjetTech("");
      }, [areaTech]);

      useEffect(() => {
        const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Area === areaTech && data['Corsi + (non lo so) '] === corsoTech).map(data => data['Costo ']))];
        console.log(filteredCorsoNames)
        setUniqueCorso(filteredCorsoNames)
        setBudjetTech("");
      }, [corsoTech]);

  return (
    <div className='comparatore'>
        <div className='comparatore-top'>
            <div>
                <img alt='icon' src={icon} />
                <h2>Corsi Digital Tech online</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp1} />
            </div>
        </div>
        <img alt='comparatore mobile' src={compmob1} className='compmob' />
        <h1 className='h1-comp'>Il tuo portale di riferimento per corsi online e le Università Telematiche in Italia</h1>
        <h2 className='h2-comp'>Iscriviti tramite noi al prezzo più basso garantito.</h2>
        <div className='comparatore-domande'>
            <div className='domanda'>
                <label>Quale area ti interessa?</label>
                <select 
                className={`${areaTech !== "" ? 'filled' : ''}`} 
                value={areaTech} 
                onChange={(e) => handleChange(e, setAreaTech)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="e Commerce">e Commerce</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="informatica di base">informatica di base</option>
                    <option value="Web Developer">Web Developer</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Quale corso ti interessa?</label>
                {areaTech !== "" ? (
                <select 
                className={`${corsoTech !== "" ? 'filled' : ''}`} 
                value={corsoTech} 
                onChange={(e) => handleChange(e, setCorsoTech)} required>
                    <option disabled value="">Seleziona un corso</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select> 
                ) : (
                <select 
                disabled
                className={`${corsoTech !== "" ? 'filled' : ''}`} 
                value={corsoTech} 
                onChange={(e) => handleChange(e, setCorsoTech)} required>
                    <option disabled value="">Quale corso ti interessa?</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>                    
                )}
            </div>
            {/*<div className='domanda'>
                <label>Quanto sei disposto a spendere?</label>
                {corsoTech !== "" ? (
                <select 
                className={`${budgetTech !== "" ? 'filled' : ''}`} 
                value={budgetTech} 
                onChange={(e) => handleChange(e, setBudjetTech)} required>
                    <option disabled value="">Seleziona</option>
                    {uniqueCorso && uniqueCorso.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                    <option value='Non lo so'>
                        Non lo so
                    </option>
                </select>
                ) : (
                <select 
                disabled
                className={`${budgetTech !== "" ? 'filled' : ''}`} 
                value={budgetTech} 
                onChange={(e) => handleChange(e, setBudjetTech)} required>
                    <option disabled value="">Seleziona</option>
                </select>                    
                )}

                </div>*/}
            <div className='domanda'>
                <label>Durata corso</label>
                <select 
                className={`${timeTech !== "" ? 'filled' : ''}`} 
                value={timeTech} 
                onChange={(e) => handleChange(e, setTimeTech)} required>
                    <option disabled value="">Seleziona una durata</option>
                    <option value="Massimo 3 mesi">Massimo 3 mesi</option>
                    <option value="3- 6 mesi">3- 6 mesi</option>
                    <option value="Più di 6 mesi">Più di 6 mesi</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Stai già lavorando?</label>
                <select 
                className={`${workStatusTech !== "" ? 'filled' : ''}`} 
                value={workStatusTech} 
                onChange={(e) => handleChange(e, setWorkStatusTech)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Il tuo livello di competenze</label>
                <select 
                className={`${livelloCompetenze !== "" ? 'filled' : ''}`} 
                value={livelloCompetenze} 
                onChange={(e) => handleChange(e, setLivelloCompetenze)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>
            <div className='domanda domanda-input'>
                <label>Nome</label>
                <input
                required
                className={`${firstName !== "" ? 'filled' : ''}`}
                type="text"
                value={firstName}
                onChange={(e) => handleChange(e, setFirstName)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Cognome</label>
                <input
                required
                className={`${lastName !== "" ? 'filled' : ''}`}
                type="text"
                value={lastName}
                onChange={(e) => handleChange(e, setLastName)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Email</label>
                <input
                required
                className={`${email !== "" ? 'filled' : ''}`}
                type="email"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Telefono</label>
                <input
                required
                className={`${phone !== "" ? 'filled' : ''}`}
                type="tel"
                value={phone}
                onChange={(e) => handleChange(e, setPhone)}
                />
            </div>
            <div className='domanda-checkbox'>
                <input
                type='checkbox'
                required
                value={accept}
                onChange={() => setAccept(!accept)}
                />
                <label>
                Accetto la Normativa Privacy e Termini e Condizioni.
                </label>
            </div>
        </div>
        {!isLoad ? 
        <button onClick={handleSubmit} className='button-prosegui'>Scopri tutti i corsi <FaArrowRight /></button> : 
        <button className='button-prosegui'>Invio in corso..</button>
        }
        <div className='comparatore-bottom'>
            <h2>
            <b>Compariamo corsi online</b>, e lo facciamo <font color='#FF692D'>bene</font>.
            </h2>
            <p>
            Siamo il primo comparatore di corsi online in Italia. Il nostro obiettivo è quello di fare chiarezza nel mare di offerte formative che trovi in rete: mettiamo a confronto i migliori enti di istruzione telematici e le <b>università telematiche</b> per aiutarti a scegliere l’opzione adatta alle tue esigenze. 
            Grazie a ComparaCorsi puoi valutare le caratteristiche delle migliori realtà formative italiane online, tra cui: corsi triennali, corsi magistrali, corsi a ciclo unico, corsi post laurea, corsi professionalizzanti, corsi di perfezionamento, corsi di preparazione ai test di ingresso e molti altri. 
            Con ComparaCorsi, trovi in pochi minuti il percorso formativo che più si avvicina alle tue esigenze, confrontando le proposte delle principali istituzioni, enti e <b>università telematiche</b> italiane fruibili online. Il nostro servizio è gratuito e ti offre una panoramica completa delle opzioni disponibili, 
            aiutandoti nella scelta del percorso giusto per la tua crescita personale e professionale. Se sei indeciso su quale percorso universitario seguire, la nostra sezione dedicata ai corsi triennali e magistrali ti permetterà di confrontare diversi indirizzi e specializzazioni, dandoti una chiara visione delle opportunità.
            Se devi superare un concorso e non sai quale corso di preparazione fa al caso tuo, puoi affidarti alla sezione dedicata ai corsi per le professioni. Se vuoi perfezionare le tue competenze dopo la laurea, puoi facilmente mettere a confronto i migliori corsi post laurea e professionalizzanti. Grazie alla nostra piattaforma, 
            rimani sempre aggiornato sulle ultime novità del mondo della formazione e puoi fare una scelta consapevole, trasparente e in linea con gli obiettivi del tuo futuro.
            </p>
        </div>
    </div>
  )
}

export default ComparatoreTech