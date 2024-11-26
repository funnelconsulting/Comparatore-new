import React, { useEffect, useState } from 'react';
import './landingMgm.css'
import axios from 'axios'
import successJson from '../../imgs/successJson.json';
import Lottie from 'react-lottie';
import corso2 from '../../imgs/scegli il corso 2.png';
import vantaggi from '../../imgs/vantaggi 2.png';
import { useParams } from 'react-router-dom';

const LandingInvitato = ({setShowFooter}) => {
  const [nomeAmb, setNomeAmb] = useState("");
  const [cognomeAmb, setCognomeAmb] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [codiceUnivoco, setCodiceUnivoco] = useState("");
  const { name, code } = useParams();
  const [thanks, setThanks] = useState(false);
  useEffect(() => {
    setShowFooter(false); 
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    privacyAccepted: false,
  });

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successJson,
  };

  useEffect(() => {
    function getParamValues(url, paramName) {
      const params = new URLSearchParams(url.split("?")[1]);
      return params.get(paramName); 
    }

    const secondLandingPageUrl = window.location.href; 

    const codiceUnivoco = getParamValues(secondLandingPageUrl, "codice_univoco");
    const nome = getParamValues(secondLandingPageUrl, "nome");
    const cognome = getParamValues(secondLandingPageUrl, "cognome");
    const fullName = name.replace(/_/g, ' ');

    console.log(code, fullName)

    setNomeCompleto(fullName);
    setNomeAmb(nome);
    setCognomeAmb(cognome);
    setCodiceUnivoco(code);
  }, []); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.email !== '' &&
      formData.phone !== '' &&
      formData.privacyAccepted == true
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      const form = {
       firstName: formData.firstName,
       lastName: formData.lastName,
       email: formData.email,
       phone: formData.phone,
       privacyAccepted: formData.privacyAccepted,
       codiceUnivoco,
       nomeAmb: nomeCompleto,
      }
        //https://leadsystem-production.up.railway.app/api/landing-create-lead-mgm
        //http://localhost:8000/api/landing-create-lead-mgm
        try {
            const response = await axios.post('https://leadsystemfunnel-production.up.railway.app/api/landing-create-lead-mgm', form);
            console.log('Dati inviati con successo:', response.data);
            setThanks(true);
          } catch (error) {
            console.error('Errore nell\'invio dei dati:', error);
          }
        
    } else {
      alert('Per favore, compila tutti i campi del modulo e accetta la privacy.');
    }
  };

  return (
    <div className='lading-invitato'>
        <div className='top-landing-invitato'>
            <div className='tli-left'>
                <p>{nomeCompleto && nomeCompleto} ti ha invitato in comparacorsi</p>
                <h2>
                Iscriviti all’università online che preferisci tramite <font color='#1B4A58'>Comparacorsi</font> e ottieni <font color='#1B4A58'>un Buono Amazon di 50€!</font></h2> 
                <p>Sei stato selezionato da {nomeCompleto && nomeCompleto} per un'offerta esclusiva per iscriverti alle università telematiche tramite Comparacorsi.</p>
                <p>Se ti iscrivi attraverso questo invito speciale, non solo inizi il tuo viaggio accademico, ma ricevi anche un Buono Regalo Amazon.it di 50€.</p>
                <a href='#form'>Compila il form</a>
            </div>
            <div className='tli-right' id='form'>
                <p>Inserisci i tuoi dati* ed inizia il tuo percorso formativo con un buono Amazon</p>
                <p>I tuoi dati verrano utilizzati solo per comunicazioni inerenti a questa iniziativa.
                <br /><br />*Ci raccomandiamo di inserire i dati correti per poter usufruire dell’iniziativa</p>
                {thanks == true ? (
                <div className='popup-send-form'>
                    <Lottie options={defaultOptions} width={180} height={180} />
                    <p>Grazie, a breve verrai ricontattato al telefono dal nostro orientatore universitario!</p>
                </div>  
                ) : (
                <form className='form-landing-invitato'>
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
                    <div className='checked-privacy'>
                        <label>
                            <input
                            type="checkbox"
                            name="privacyAccepted"
                            checked={formData.privacyAccepted}
                            onChange={handleChange}
                            required
                            />
                            Accetto la privacy
                        </label>
                    </div>
                    <div className='btn-cont'>
                        <button onClick={handleSubmit}>Invia form</button>
                    </div>
                </form>
                )}

            </div>
        </div>
        <div className='come-funziona'>
            <div className='cf-left tli-left'>
                <p>INIZIA IL TUO PERCORSO</p>
                <h4>Come funziona</h4>
                <div className='come-funziona-item'>
                    <span>1</span>
                    <div>
                        <p>Compila il Form:</p>
                        <p>Inserisci i tuoi dati nel modulo per essere contattato dal nostro orientatore.</p>
                    </div>
                </div>
                <div className='come-funziona-item'>
                    <span>2</span>
                    <div>
                        <p>Orientamento:</p>
                        <p>Esplora con lui tutte le offerte formative dei vari atenei online italiani come Unipegaso, Mercatorum, E-Campus, Unimarconi ed altri.</p>
                    </div>
                </div>
                <div className='come-funziona-item'>
                    <span>3</span>
                    <div>
                        <p>Iscriviti</p>
                        <p>Il nostro orientatore si occuperà della tua iscrizione all’ateneo in linea alle tue esigenze e di tutte le trafile burocratiche.</p>
                    </div>
                </div>
                <div className='come-funziona-item'>
                    <span>4</span>
                    <div>
                        <p>Ricevi il Tuo Buono:</p>
                        <p>Dopo l'immatricolazione riuscita, riceverai un Buono Regalo Amazon.it del valore di 50€ direttamente via e-mail entro la fine del mese.</p>
                    </div>
                </div>
                <p>Garanzia e Validità - L'iniziativa è valida per tutti i corsi universitari online selezionati da Comparacorsi. Assicurati di inserire i dati correttamente per usufruire dell'offerta.</p>
                <a href='#form'>Compila il form</a>
            </div>
            <div className='cf-right'>
                <img alt='img' src={corso2} />
            </div>
        </div>
        <div className='università-telematica'>
            <p>ISCRIVITI TRAMITE COMPARACORSI</p>
            <h4>Perché scegliere l’università telematica</h4>
            <p>Le università offrono una formazione di alta qualità, accessibile e flessibile in base alle tue esigenze. Le lezioni sono sempre disponibili online, puoi studiare dove e quando preferisci, con la comodità di doverti recare in sede solo per gli esami. Scegli tra un'ampia offerta formativa il corso che fa per te e inizia il tuo percorso verso il successo professionale e personale.</p>
        </div>
        <div className='vantaggi-landing'>
          <div className='vl-left'>
              <img src={vantaggi} alt='img landing comparacorsi' />
          </div>
          <div className='vl-right'>
            <p>I VANTAGGI</p>
            <h4>I Vantaggi delle università telematiche</h4>
            <div className='come-funziona-item'>
                    <span>1</span>
                    <div>
                        <p>Flessibile come te:</p>
                        <p>Le università telematiche permettono di studiare dove e quando vuoi, adattandosi perfettamente alle esigenze di studenti che lavorano, hanno famiglie o altri impegni.</p>
                    </div>
            </div>
            <div className='come-funziona-item'>
                    <span>2</span>
                    <div>
                        <p>Scegli il tuo percorso:</p>
                        <p>Gli atenei online offrono una vasta gamma di corsi e lauree, inclusi corsi di laurea, master e corsi di perfezionamento, per soddisfare un'ampia varietà di interessi e obiettivi professionali.</p>
                    </div>
            </div>
            <div className='come-funziona-item'>
                    <span>3</span>
                    <div>
                        <p>Dove e quando vuoi</p>
                        <p>Con le lezioni disponibili online, gli studenti possono accedere ai materiali di studio da qualsiasi luogo, eliminando la necessità di spostamenti e risparmiando tempo e risorse.</p>
                    </div>
            </div>
            <div className='come-funziona-item'>
                    <span>4</span>
                    <div>
                        <p>Tutto il supporto che ti serve:</p>
                        <p>Le università telematiche forniscono un eccellente supporto didattico e tutoraggio personalizzato, assicurando che gli studenti ricevano l'aiuto e la guida di cui hanno bisogno per avere successo nel loro percorso di studi e ti preparano al mondo del lavoro.</p>
                    </div>
            </div>
            <div className='come-funziona-item'>
                    <span>5</span>
                    <div>
                        <p>Il tuo titolo riconosciuto:</p>
                        <p>I titoli conseguiti presso le università telematiche sono riconosciuti a livello nazionale e internazionale dal MIUR, offrendo agli studenti una qualificazione solida e rispettata per il loro futuro professionale.</p>
                    </div>
            </div>
            <a href='#form'>Compila il form</a>
          </div>
        </div>
        <div className='bottom-landing'>
          <p>UN MONDO DI CONOSCENZA TI ASPETTA</p>
          <h4>Sei pronto a trasformare il tuo futuro con l'istruzione di qualità grazie a Comparacorsi?</h4>
          <p>Compila il modulo, inizia il tuo percorso formativo e approfitta del tuo bonus speciale.</p>
        </div>
        <div className='footer-landing'>
            <p>
              Funnel Consulting s.r.l | Partitiva IVA 15214991000 <br />
              Via C. Ferrero di Cambiano 91, <br />
              00191 Roma
            </p>
            <div>
              <a href="#">Termini e condizioni</a>
              <a href='#'>Privacy policy</a>
              <a href='#'>Cookie policy</a>
              <a href='#'>Regolamento</a>
            </div>
        </div>
    </div>
  );
}

export default LandingInvitato;