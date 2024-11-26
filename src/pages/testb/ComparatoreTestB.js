import React, {useState, useEffect} from 'react'
import '../comparatore.css';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import comp1 from '../../imgs/comp1.png';
import {useNavigate} from 'react-router-dom'
import dataCorsi from '../output.json';
import icon from '../../imgs/Vector.png';
import { useSearch } from '../../context/SearchContext';
import compmob1 from '../../imgs/comp-mob1.png';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PrezziSlider = ({ min, max, step, onChange, rangeMax }) => {
    const [value, setValue] = useState([min, rangeMax]);
  
    const handleSliderChange = (newValue) => {
      setValue([min, newValue[1]]);
      onChange([min, newValue[1]]);
    };
  
    return (
      <div className='barra-prezzi'>
        <Slider
          min={min}
          max={max}
          step={step}
          range
          value={value}
          onChange={handleSliderChange}
          className="custom-slider-prezzo"
        />
        <div>
          Min: {value[0]}€ - Max: {value[1]}€
        </div>
      </div>
    );
  };

const ComparatoreTestB = () => {
    const { degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, 
        budget, setBudget, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone, enrollmentTime,
        setEnrollmentTime, universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories,
        setCategories, origBudget, setOrigBudget, origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest
      , rangeMax, setRangeMax } = useSearch();

    const navigate = useNavigate();
    const [accept, setAccept] = useState(false);
    const [acceptTreatment, setAcceptTreatment] = useState(false);

    const [utmCampaign, setUtmCamp] = useState("");
    const [utmSource, setUtmSrc] = useState("");
    const [utmMedium, setUtmMedium] = useState("");
    const [utmTerm, setUtmTerm] = useState("");
    const [utmAdset, setUtmAdset] = useState("");
    const [utmAdgroup, setUtmAdgroup] = useState("");

    const prezzoMin = 1000;
    const [prezzoMax, setPrezzoMax] = useState(3000);
  
    const handleChangePrezzo = (nuoviValori) => {
      setPrezzoMax(nuoviValori[1]);
      setRangeMax(nuoviValori[1]);
    };

    useEffect(() => {
        const currentUrl = window.location.href;
    
        const searchParams = new URLSearchParams(currentUrl);
    
        const utmSource = searchParams.get('utm_source');
        const utmCampaign = searchParams.get('utm_campaign');
        const utmContent = searchParams.get('utm_medium');
        const utmTerm = searchParams.get('utm_term');
        const utmAdgroup = searchParams.get("utm_adset");
        const utmAdset = searchParams.get("utm_ad");
    
        setUtmCamp(utmCampaign);
        setUtmSrc(utmSource);
        setUtmMedium(utmContent);
        setUtmTerm(utmTerm)
        setUtmAdset(utmAdset);
        setUtmAdgroup(utmAdgroup);

        console.log(utmSource, utmContent, utmCampaign, utmTerm, utmAdgroup, utmAdset);
        setRangeMax(3000)
      }, []);
  
    const handleChange = (e, setter) => {
      setter(e.target.value);
    };
    const handleUniversityStatusChange = (e) => {
        setUniversityStatus(e);
      };
    
      const handleWorkStatusChange = (e) => {
        setWorkStatus(e);
      };

      const handleSendSheet = async () => {
        const urlSheetTUTTE = "https://sheet.best/api/sheets/de0ffbe6-fabe-446d-ae08-29673f574ddf";
        const urlSheet = 'https://sheet.best/api/sheets/2b48a2f8-bc37-4c32-9927-390557b57bd2';
        const checkUrl = `${urlSheet}?search=email:${email}`; 
        const formData = {
          Data: new Date(),
          nome: firstName,
          cognome: lastName,
          email: email,
          ["Percorso di studi"]: desiredDegree,
          ["Campagna UTM"]: utmCampaign,
          ["Source UTM"]: utmSource,
          ["Content UTM"]: utmMedium,
          Cellulare: phone,
          ["Keywords UTM"]: utmTerm,
          ["Adgroup UTM"]: utmAdgroup,
          ["Adset UTM"]: utmAdset,
        };

        const tuttaResponse = await fetch(urlSheetTUTTE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const checkResponse = await fetch(checkUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const existingData = await checkResponse.json();
          const matchingData = existingData.filter(item => item.email === email);

          if (matchingData.length > 0) {
            console.log('I dati con questa email esistono già. Non è possibile inviare duplicati.', matchingData);
            setIsLoad(false);
            navigate('/universita/risultati', { state: { showLoad: true }});  
            return; 
          }
      
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
              navigate('/universita/risultati', { state: { showLoad: true }}); 
            } else {
              console.error("Errore nell'invio dei dati");
            }
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
      };

      const [isLoad, setIsLoad] = useState(false);

      const handleSendLead = async () => {

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            lavoro: workStatus,
            universita: universityStatus,
            orario: studyTime,
            corsoDiLaurea: desiredDegree,
            facolta: subjectOfInterest,
            utmCampaign: utmCampaign,
            utmSource: utmSource,
            utmContent: utmMedium,
            utmTerm: utmTerm,
            categories: categories,
            enrollmentTime: enrollmentTime,
            budget: rangeMax.toString(),
            utmAdgroup: utmAdgroup,
            utmAdset: utmAdset,
            tipologiaCorso: degreeType,
        }
       //https://leadsystem-production.up.railway.app/api/lead-compara-corsi
       //http://localhost:8000/api/lead-compara-corsi
        try {
          const response = await axios.post('https://leadsystemfunnel-production.up.railway.app/api/lead-compara-corsi', formData);
          console.log('Risposta dal server:', response.data);
          await handleSendSheet()
        } catch (error) {
          console.error('Errore durante la richiesta al server:', error);
        }
        console.log(rangeMax);
        //navigate('/universita/risultati');
      };

      const [missingField, setMissingField] = useState("");

      const handleSubmit = () => {
        setIsLoad(true)
        if (firstName == "" || lastName == "" || email == "" || phone == "" || categories == "" || studyTime == "" || workStatus == ""
        || universityStatus == "" || enrollmentTime == "" || subjectOfInterest == "" || desiredDegree == "" || degreeType == "" || accept == false) {

          if (firstName === "") setMissingField("Nome");
          else if (degreeType === "") setMissingField("Tipo di laurea");
          else if (lastName === "") setMissingField("Cognome");
          else if (email === "") setMissingField("Email");
          else if (phone === "") setMissingField("Numero di telefono");
          else if (categories === "") setMissingField("Categorie");
          else if (studyTime === "") setMissingField("Tempo di studio");
          else if (workStatus === "") setMissingField("Stato lavorativo");
          else if (universityStatus === "") setMissingField("Stato universitario");
          else if (enrollmentTime === "") setMissingField("Tempo di iscrizione");
          else if (subjectOfInterest === "") setMissingField("Oggetto di interesse");
          else if (desiredDegree === "") setMissingField("Corso di laurea");
          else if (!accept) setMissingField("Accetta i termini e le condizioni");
        
          alert(`Compila il campo: ${missingField}`);
          setIsLoad(false);
          return
        } else if (!isValidMobileNumber(phone)){
            alert('Inserisci un numero valido');
            setMissingField("Numero di telefono");
            setIsLoad(false);
            setPhone("");
            return
        } else if (!isValidEmail(email)){
            alert('Inserisci una mail valida');
            setMissingField("Email");
            setIsLoad(false);
            setEmail("");
            return
        }
        try {
            handleSendLead();
        } catch (error) {
           console.error(error); 
           setIsLoad(false)
        }
      };

      const [uniqueArea, setUniqueArea] = useState([]);
      const [uniqueCorso, setUniqueCorso] = useState([]);
      const [uniquePrice, setUniquePrice] = useState([]);

      useEffect(() => {
        const filteredAreaNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType).map(data => data.Area))];
        setUniqueArea(filteredAreaNames);
        setDesiredDegree("");
        setSubjectOfInterest("");
        setBudget("");
      }, [degreeType]);

      useEffect(() => {
        const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Corsi di laurea + (non lo so)']))];
        setUniqueCorso(filteredCorsoNames)
        setSubjectOfInterest("");
        setBudget("");
      }, [desiredDegree]);

      useEffect(() => {
        const filteredBudgetNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Costo ']))];
        setUniquePrice(filteredBudgetNames);
        setBudget("");
      }, [subjectOfInterest]);

      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        return emailRegex.test(email);
      };

      const isValidMobileNumber = (phoneNumber) => {
        const mobileNumberRegex = /^[0-9]{10}$/;
      
        return mobileNumberRegex.test(phoneNumber);
      };

  return (
    <div className='comparatore'>
        <div className='comparatore-top'>
            <div>
                <img alt='icon' src={icon} />
                <h2>Corso di laurea online</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp1} />
            </div>
        </div>
        <img alt='comparatore mobile' src={compmob1} className='compmob' />
        <h1 className='h1-comp'>Il tuo portale di riferimento per corsi online e le Università Telematiche in Italia</h1>
        {/*<h2 className='h2-comp'><b>Iscriviti tramite noi al prezzo più basso garantito. comparacorsi.it è il portavoce di tutte le università telematiche italiane riconosciute dal miur.</b></h2>*/}
        <div className='comparatore-domande'>
            <h3>Compila tutti i campi per scoprire l'università migliore per te</h3>
            <div className='domanda'>
                <label>Quale tipologia di corso di laurea ti interessa?</label>
                <select 
                className={`${degreeType !== "" ? 'filled' : missingField == "Tipo di laurea" ? 'campo-mancante' : ''}`} 
                value={degreeType} 
                onChange={(e) => {handleChange(e, setDegreeType); handleChange(e, setOrigDegreeType)}} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Laurea Triennale">Laurea Triennale</option>
                    <option value="Laurea Magistrale">Laurea Magistrale</option>
                    <option value="Ciclo Unico">Ciclo Unico</option>
                    <option value="Master 1° livello">Master 1° livello</option>
                    <option value="Master 2° livello">Master 2° livello</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Quale corso di laurea sei interessato?</label>
                {degreeType !== "" ? (
                <select 
                className={`${desiredDegree !== "" ? 'filled' : missingField == "Corso di laurea" ? 'campo-mancante' : ''}`} 
                value={desiredDegree} 
                onChange={(e) => {handleChange(e, setDesiredDegree); handleChange(e, setOrigDesiredDegree)}} required>
                    <option disabled value="">Seleziona un'area</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select> 
                ) : (
                <select 
                disabled
                className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                value={desiredDegree} 
                onChange={(e) => {handleChange(e, setDesiredDegree); handleChange(e, setOrigDesiredDegree)}} required>
                    <option disabled value="">Seleziona un'area</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>                    
                )}
            </div>
            <div className='domanda'>
                <label>Cosa ti piacerebbe studiare?</label>
                {desiredDegree !== "" ? (
                <select 
                className={`${subjectOfInterest !== "" ? 'filled' : missingField == "Oggetto di interesse" ? 'campo-mancante' : ''}`} 
                value={subjectOfInterest} 
                onChange={(e) => {handleChange(e, setSubjectOfInterest); handleChange(e, setOrigSubjectOfInterest)}} required>
                    <option disabled value="">Seleziona un corso</option>
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
                className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                value={subjectOfInterest} 
                onChange={(e) => handleChange(e, setSubjectOfInterest)} required>
                    <option disabled value="">Seleziona un corso</option>
                </select>                    
                )}

            </div>
            <div className='domanda domanda-prezzo'>
                <label style={{maxWidth: '330px', width: '100%'}}>Fino a quanto sei disposto a spendere?</label>
                {/*subjectOfInterest !== "" ? (
                <select 
                className={`${budget !== "" ? 'filled' : ''}`} 
                value={budget} 
                onChange={(e) => {handleChange(e, setBudget); handleChange(e, setOrigBudget)}} required>
                    <option disabled value="">Seleziona un costo</option>
                    {uniquePrice && uniquePrice.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>
                ) : (
                <select 
                disabled
                className={`${budget !== "" ? 'filled' : ''}`} 
                value={budget} 
                onChange={(e) => handleChange(e, setBudget)} required>
                    <option disabled value="">Seleziona un costo</option>
                </select>                    
                )*/}
                <PrezziSlider min={prezzoMin} max={8000} step={500} onChange={handleChangePrezzo} rangeMax={prezzoMax} />
            </div>
            <div className='domanda'>
                <label>Quando vorresti iscriverti?</label>
                <select 
                className={`${enrollmentTime !== "" ? 'filled' : missingField == "Tempo di iscrizione" ? 'campo-mancante' : ''}`} 
                value={enrollmentTime} 
                onChange={(e) => handleChange(e, setEnrollmentTime)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Il prima possibile">Il prima possibile</option>
                    <option value="Il prossimo semestre">Il prossimo semestre</option>
                    <option value="Il prossimo anno">Il prossimo anno</option>
                    <option value="Solo curioso">Solo curioso</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Stai già frequentando l'università?</label>
                <select 
                className={`${universityStatus !== "" ? 'filled' : missingField == "Stato universitario" ? 'campo-mancante' : ''}`} 
                value={universityStatus} 
                onChange={(e) => handleChange(e, setUniversityStatus)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Stai già lavorando?</label>
                <select 
                className={`${workStatus !== "" ? 'filled' : missingField == "Stato lavorativo" ? 'campo-mancante' : ''}`} 
                value={workStatus} 
                onChange={(e) => handleChange(e, setWorkStatus)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Quanto tempo hai da dedicare alla tua formazione?</label>
                <select 
                className={`${studyTime !== "" ? 'filled' : missingField == "Tempo di studio" ? 'campo-mancante' : ''}`} 
                value={studyTime} 
                onChange={(e) => handleChange(e, setStudyTime)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Massimo 1 ora al giorno">Massimo 1 ora al giorno</option>
                    <option value="1-3h al giorno">1-3h al giorno</option>
                    <option value="+ 3 ore al giorno">+ 3 ore al giorno</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Fai parte di una di queste categorie?</label>
                <select 
                className={`${categories !== "" ? 'filled' : missingField == "Categorie" ? 'campo-mancante' : ''}`} 
                value={categories} 
                onChange={(e) => handleChange(e, setCategories)} required>
                    <option disabled value="">Seleziona una categoria</option>
                    <option value="Forze armate">Forze armate</option>
                    <option value="Neo Mamme">Neo Mamme</option>
                    <option value="Sindacati">Sindacati</option>
                    <option value="Terzo settore">Terzo settore</option>
                    <option value="Diversamente Abili e SDA">Diversamente Abili e SDA</option>
                    <option value="Nessuna">Nessuna delle precedenti</option>
                </select>
            </div>
            <div className='domanda domanda-input'>
                <label>Nome</label>
                <input
                required
                className={`${firstName !== "" ? 'filled' : missingField == "Nome" ? 'campo-mancante' : ''}`}
                type="text"
                value={firstName}
                onChange={(e) => handleChange(e, setFirstName)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Cognome</label>
                <input
                required
                className={`${lastName !== "" ? 'filled' : missingField == "Cognome" ? 'campo-mancante' : ''}`}
                type="text"
                value={lastName}
                onChange={(e) => handleChange(e, setLastName)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Email</label>
                <input
                required
                className={`${email !== "" ? 'filled' : missingField == "Email" ? 'campo-mancante' : ''}`}
                type="email"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
                />
            </div>
            <div className='domanda domanda-input'>
                <label>Telefono (valido per il codice di verifica)</label>
                <input
                required
                className={`${phone !== "" ? 'filled' : missingField == "Numero di telefono" ? 'campo-mancante' : ''}`}
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
                className={!accept && missingField == "Accetta i termini e le condizioni" ? 'campo-mancante' : ''}
                />
                <label>
                Accetto la Normativa <a href='https://www.comparacorsi.it/privacy-policy/'>Privacy</a> e <a href='https://www.iubenda.com/termini-e-condizioni/62720878'>Termini e Condizioni</a>.
                </label>
            </div>
            <div className='domanda-checkbox' style={{textAlign: 'left', display: 'flex', justifyContent:'center', gap: '0.4rem', paddingLeft: '12px'}}>
                <input
                type='checkbox'
                required
                value={acceptTreatment}
                onChange={() => setAcceptTreatment(!acceptTreatment)}
                />
                <label style={{textAlign: 'left'}}>
                Presto il consenso al trattamento dei miei dati personali per comunicarli e ricevere informazioni promozionali da parte di terzi ai sensi dell’art. 2.3 lett. c) dell’<a href='https://www.comparacorsi.it/privacy-policy/'>informativa privacy</a>
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

export default ComparatoreTestB