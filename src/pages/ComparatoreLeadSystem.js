import React, {useState, useEffect, useRef} from 'react'
import './comparatore.css';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import comp1 from '../imgs/comp1.png';
import {useNavigate} from 'react-router-dom'
import dataCorsi from './output.json';
import icon from '../imgs/Vector.png';
import { useSearch } from '../context/SearchContext';
import compmob1 from '../imgs/comp-mob1.png';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import StepProgress from '../components/StepProgress';
import frecciagiù from '../imgs/frecciagiù.png';
import Autocomplete from 'react-autocomplete';
import { provinces } from './atenei';

const AutocompleteCustom = ({ items, value, onChange, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef(null);

  const handleInputChange = (e) => {
    onChange(e);
    setIsOpen(true);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      handleSelect(items[highlightedIndex]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Digita il nome della provincia"
        style={{
          padding: '8px 20px',
          borderRadius: '7px',
          fontSize: '16px',
          border: value === "" ? '1px solid #044c5a4f' : '1.3px solid #F37E0E',
          margin: '0 0px',
          width: isMobile() ? '90%' : '95%',
          fontFamily: "'Poppins', sans-serif",
          outline: 'none',
          backgroundColor: '#044c5a16',
          //boxShadow: value === "" ? 'none' : "0 0 10px 2px #F37E0E70"
        }}
      />
      {isOpen && (
        <div style={{
          borderRadius: '3px',
          padding: '10px 0px',
          fontSize: '100%',
          backgroundColor: 'transparent',
          width: '100%',
          overflowY: 'scroll',
          position: 'absolute',
          zIndex: '1',
          fontFamily: 'Poppins, Sans-Serif',
          maxHeight: isMobile() ? '300px' : '300px',
        }}>
          {items.map((item, index) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              style={{
                background: index === highlightedIndex ? 'lightgray' : 'white',
                cursor: 'pointer',
                padding: '5px 10px',
                border: '1px solid #00000030',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PrezziSlider = ({ min, max, step, onChange, rangeMax }) => {
    const [value, setValue] = useState([min, rangeMax]);
  
    const handleSliderChange = (newValue) => {
      setValue([min, newValue[1]]);
      onChange([min, newValue[1]]);
    };
  
    return (
      <div className='barra-prezzi' id='price-slider'>
        <div id='price-display' className='price-range-max'  style={{ position: 'relative', left: `${24.5714 + (((value[1] - 3000) / 500) * 7)}%` }}>
            {value[1]}€
          </div>
        <Slider
          id='new-budget-range'
          min={min}
          max={max}
          step={step}
          range
          value={value}
          onChange={handleSliderChange}
          className="custom-slider-prezzo"
        />
      </div>
    );
  };

const ComparatoreLeadSystem = () => {
    const { degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, 
        budget, setBudget, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone, enrollmentTime,
        setEnrollmentTime, universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories,
        setCategories, origBudget, setOrigBudget, origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest
      , rangeMax, setRangeMax, città, setCittà, necessità, setNecessità } = useSearch();

    const navigate = useNavigate();
    const [accept, setAccept] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [filteredProvinces, setFilteredProvinces] = useState(provinces);
    const [acceptTreatment, setAcceptTreatment] = useState(false);
    const [utmCampaign, setUtmCamp] = useState("");
    const [utmSource, setUtmSrc] = useState("");
    const [utmMedium, setUtmMedium] = useState("");
    const [utmTerm, setUtmTerm] = useState("");
    const [utmAdset, setUtmAdset] = useState("");
    const [utmAdgroup, setUtmAdgroup] = useState("");
    const storedLead = localStorage.getItem('lead');
    if (storedLead !== null) {
      const leadData = JSON.parse(storedLead);
    } else {
      console.log("Nessun dato lead trovato in localStorage.");
    }

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
      const [handlePosition, setHandlePosition] = useState(-110);
    
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
            //navigate('/universita/risultati', { state: { showLoad: true }});
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
              //navigate('/universita/risultati', { state: { showLoad: true }});
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
        console.log('ok mandata')
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
            città: città,
            necessità: necessità,
        }
       //https://leadsystem-production.up.railway.app/api/lead-compara-corsi
       //http://localhost:8000/api/lead-compara-corsi
        try {
          const response = await axios.post('https://leadsystemfunnel-production.up.railway.app/api/lead-compara-corsi', formData);
          console.log('Risposta dal server:', response.data);
          localStorage.setItem('lead', JSON.stringify(formData))
          await handleSendSheet()
        } catch (error) {
          console.error('Errore durante la richiesta al server:', error);
        }
      };

      const [missingField, setMissingField] = useState([]);

      const checkFields = () => {
        let missingField = []
        if (firstName === "") missingField.push("Nome");
        if (lastName === "") missingField.push("Cognome");
        if (email === "") missingField.push("Email");
        if (phone === "") missingField.push("Numero di telefono");
        if (categories === "") missingField.push("Categorie");
        if (città === "") missingField.push("Città");
        if (necessità === "") missingField.push("Necessità");
        //if (studyTime === "") missingField.push("Tempo di studio");
        //if (workStatus === "") missingField.push("Stato lavorativo");
        //if (universityStatus === "") missingField.push("Stato universitario");
        //if (enrollmentTime === "") missingField.push("Tempo di iscrizione");
        //if (subjectOfInterest === "") missingField.push("Oggetto di interesse");
        if (desiredDegree === "") missingField.push("Corso di laurea");
        if (degreeType === "") missingField.push("Tipo di laurea");
        if (!accept) missingField.push("Accetta i termini e le condizioni");
        if (!acceptTerms) missingField.push("Accetta i Termini e Condizioni");
    
        if (missingField.length > 0) {
            setMissingField(missingField);
            alert(`Compila i campi: ${missingField.join(", ")}`);
            setIsLoad(false);
            return false;
        }
    
        return true;
    };
      const handleSubmit = async () => {
        setIsLoad(true)
        if (!checkFields()) {
          return;
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
        } else if (!provinces.includes(città)){
          alert("Inserisci una provincia valida")
          setIsLoad(false)
          return
        }
        try {
            handleSendLead();
            //window.scrollTo(0,0);
            navigate('/universita/risultati', { state: { showLoad: true }});
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

      const isMobile = () => {
        return window.innerWidth <= 768;
      };

      const [showFullText, setShowFullText] = useState(false);

      const handleChangeProvincia = (event) => {
        console.log(event)
        const inputValue = event.target.value;
        setCittà(inputValue);
    
        // Filtra le province che includono il testo inserito dall'utente
        const filtered = provinces.filter(province =>
          province.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredProvinces(filtered);
      };

  return (
    <div className='comparatore'>
        {/*<div className='comparatore-top'>
            <div>
                {!isMobile() && <img alt='icon' src={icon} />}
                <h2 style={{fontWeight: '400', lineHeight: '28px'}}>Confronta le <b>migliori università</b> online</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp1} />
            </div>
        </div>
        */}
        <div className='comparatore-top-new'>
          <StepProgress step={1} />
        </div>
        {isMobile() ? <h1 className='h1-tit'>Confronta le migliori <br />
        <font color='#F37E0E'>università online </font><br />
        al costo più basso garantito </h1> : <h1 className='h1-tit'>Confronta le migliori <br />
        <font color='#F37E0E'>università online </font>
        al costo più basso garantito </h1>}
        <h4 className='h1-comp'>Siamo il Comparatore per la formazione <font color='#F37E0E'> migliore </font>d'Italia</h4>
        {/*<div className='come-funziona-comparatore'>
          <h4>Come funziona? <font color='#044B5A'> <b>È semplice:</b></font></h4>
          {isMobile() ? 
          <div className='come-funziona-slide'>
            <div className='slide'>
              <img src={require('../imgs/slide111.png')} alt='Slide 1' />
            </div>
            <div className='slide'>
              <img src={require('../imgs/slide222.png')} alt='Slide 2' />
            </div>
            <div className='slide'>
              <img src={require('../imgs/slide333.png')} alt='Slide 3' />
            </div>
          </div> : 
          <div className='come-funziona-slide-desktop'>
              <img src={require('../imgs/slide111.png')} alt='Slide 1' />
              <img src={require('../imgs/slide222.png')} alt='Slide 2' />
              <img src={require('../imgs/slide333.png')} alt='Slide 3' />
          </div>}
        </div>*/}
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
        <div  class="trustpilot-widget" data-locale="it-IT" data-template-id="5419b732fbfb950b10de65e5" data-businessunit-id="64b965467cc49ff7fef5cd54" data-style-height="24px" data-style-width="100%">
          <a href="https://it.trustpilot.com/review/comparacorsi.it" target="_blank" rel="noopener">Trustpilot</a>
        </div>
        <hr className='separatore' />
        <div className='comparatore-domande' id='form-comparatore-new'>
            <div className='domanda'>
                <label>Quale <b>tipologia</b> di corso di laurea ti interessa?</label>
                <select 
                id='new-course-type-select'
                className={`${degreeType !== "" ? 'filled' : missingField.includes("Tipo di laurea") ? 'campo-mancante' : ''}`} 
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
                <label>A quale <b>corso di laurea</b> sei interessato?</label>
                {degreeType !== "" ? (
                <select 
                id='new-degree-select'
                className={`${desiredDegree !== "" ? 'filled' : missingField.includes("Corso di laurea") ? 'campo-mancante' : ''}`}
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
                id='new-degree-select'
                className={`${desiredDegree !== "" ? 'filled' : missingField.includes("Corso di laurea") ? 'campo-mancante' : ''}`}
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
                <p className='piccolo-arancione'>(La scelta è ampia, confrontiamo per te oltre 200 corsi)</p>
            </div>
            {/*<div className='domanda'>
                <label>Cosa ti piacerebbe studiare?</label>
                {desiredDegree !== "" ? (
                <select 
                className={`${subjectOfInterest !== "" ? 'filled' : missingField.includes("Oggetto di interesse") ? 'campo-mancante' : ''}`}
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
                className={`${subjectOfInterest !== "" ? 'filled' : missingField.includes("Oggetto di interesse") ? 'campo-mancante' : ''}`}
                value={subjectOfInterest} 
                onChange={(e) => handleChange(e, setSubjectOfInterest)} required>
                    <option disabled value="">Seleziona un corso</option>
                </select>                    
                )}

            </div>*/}
            <div className='domanda domanda-prezzo'>
                <label style={{width: '100%'}}>Fino a quanto sei disposto a <b>spendere annualmente</b>?</label>
                <PrezziSlider min={prezzoMin} max={8000} step={500} onChange={handleChangePrezzo} rangeMax={prezzoMax} />
            </div>
            {/*<div className='domanda'>
                <label>Quando vorresti iscriverti?</label>
                <select 
                className={`${enrollmentTime !== "" ? 'filled' : missingField.includes("Tempo di iscrizione") ? 'campo-mancante' : ''}`} 
                value={enrollmentTime} 
                onChange={(e) => handleChange(e, setEnrollmentTime)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Il prima possibile">Il prima possibile</option>
                    <option value="Il prossimo semestre">Il prossimo semestre</option>
                    <option value="Il prossimo anno">Il prossimo anno</option>
                    <option value="Solo curioso">Solo curioso</option>
                </select>
            </div>
            <div className='radio-question'>
              <label>Stai già frequentando l'università?</label>
              <div>
                <div onClick={() => setUniversityStatus("Si")} className={universityStatus === "Si" ? 'domanda filled' : missingField.includes("Stato universitario") ? 'campo-mancante domanda' : 'domanda'}>
                    <input checked={universityStatus === "Si"} type='radio' value={"Si"} />
                    <label>Si</label>
                </div>
                <div onClick={() => setUniversityStatus("No")} className={universityStatus === "No" ? 'domanda filled' : missingField.includes("Stato universitario") ? 'campo-mancante domanda' : 'domanda'}>
                    <input checked={universityStatus === "No"} type='radio' value={"No"} />
                    <label>No</label>
                </div>
              </div>
            </div>
            <div className='radio-question'>
              <label>Stai già lavorando?</label>
              <div>
                <div onClick={() => setWorkStatus("Si")} className={workStatus === "Si" ? 'domanda filled' : missingField.includes("Stato lavorativo") ? 'campo-mancante domanda' : 'domanda'}>
                    <input checked={workStatus === "Si"} type='radio' value={"Si"} />
                    <label>Si</label>
                </div>
                <div onClick={() => setWorkStatus("No")} className={workStatus === "No" ? 'domanda filled' : missingField.includes("Stato lavorativo") ? 'campo-mancante domanda' : 'domanda'}>
                    <input type='radio' value={"No"} checked={workStatus === "No"} />
                    <label>No</label>
                </div>
              </div>
            </div>
            <div className='domanda'>
                <label>Quanto tempo hai da dedicare alla tua formazione?</label>
                <select 
                className={`${studyTime !== "" ? 'filled' : missingField.includes("Tempo di studio") ? 'campo-mancante' : ''}`} 
                value={studyTime} 
                onChange={(e) => handleChange(e, setStudyTime)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Massimo 1 ora al giorno">Massimo 1 ora al giorno</option>
                    <option value="1-3h al giorno">1-3h al giorno</option>
                    <option value="+ 3 ore al giorno">+ 3 ore al giorno</option>
                </select>
            </div>*/}
            <div className='domanda dn'>
              <label>Raccontaci quali sono <b>le tue necessità</b></label>
              <p className='piccolo-arancione'>(seleziona una di queste scelte)</p>
              <div className='button-necessità' id='new-needs-buttons'>
                <button onClick={() => setNecessità("Supporto per Iscrizione")} className={necessità === "Supporto per Iscrizione" && "active-necessità"}>Supporto per Iscrizione</button>
                <button onClick={() => setNecessità("Riconoscimento CFU per cambio università")} className={necessità === "Riconoscimento CFU per cambio università" && "active-necessità"}>Riconoscimento CFU per cambio università</button>
                <button onClick={() => setNecessità("Laurea per Scatto di carriera")} className={necessità === "Laurea per Scatto di carriera" && "active-necessità"}>Laurea per Scatto di carriera</button>
                <button onClick={() => setNecessità("Richiesta Informazioni")} className={necessità === "Richiesta Informazioni" && "active-necessità"}>Richiesta Informazioni</button>
              </div>
            </div>
            <div className='domanda'>
                <label>Ti riconosci in uno di <b>Questi profili</b>?</label>
                <select 
                id='new-profile-select'
                className={`${categories !== "" ? 'filled' : missingField.includes("Categorie") ? 'campo-mancante' : ''}`} 
                value={categories} 
                onChange={(e) => handleChange(e, setCategories)} required>
                    <option disabled value="">Seleziona una categoria</option>
                    <option value="Neo diplomato">Neo diplomato</option>
                    <option value="Forze dell'ordine">Forze dell'ordine</option>
                    <option value="Neo Genitore">Neo Genitore</option>
                    <option value="Dipendenti pubblici">Dipendenti pubblici</option>
                    <option value="Diversamente abili e DSA">Diversamente abili e DSA</option>
                    <option value="Lavoratore">Lavoratore</option>
                    <option value="Nessuna di queste categorie">Nessuna di queste categorie</option>
                </select>
                <p className='pa piccolo-arancione'>(Sapevi che ci sono agevolazioni per queste categorie? Comparacorsi ti aiuta a scoprirle)</p>
            </div>
            <div className='domanda domanda-autocomplete'>
                <label>In quale <b>provincia</b> vivi?</label>
                <AutocompleteCustom
                    id='new-province-autocomplete'
                    items={filteredProvinces}
                    value={città}
                    onChange={handleChangeProvincia}
                    onSelect={(val) => setCittà(val)}
                  />
                <p className='pa piccolo-arancione'>(Ci servirà per trovare e proporti le sedi d'esame più vicine e comode per te)</p>
            </div>
            <div className='domanda-anagrafica'>
              <div>
                <div className='domanda domanda-input'>
                    <label>Nome</label>
                    <input
                    id='new-name-input'
                    required
                    className={`${firstName !== "" ? 'filled' : missingField.includes("Nome") ? 'campo-mancante' : ''}`}
                    type="text"
                    value={firstName}
                    onChange={(e) => handleChange(e, setFirstName)}
                    />
                </div>
                <div className='domanda domanda-input'>
                    <label>Cognome</label>
                    <input
                    id='new-surname-input'
                    required
                    className={`${lastName !== "" ? 'filled' : missingField.includes("Cognome") ? 'campo-mancante' : ''}`}
                    type="text"
                    value={lastName}
                    onChange={(e) => handleChange(e, setLastName)}
                    />
                </div>
                <div className='domanda domanda-input'>
                    <label>Email</label>
                    <input
                    id='new-email-input'
                    required
                    className={`${email !== "" ? 'filled' : missingField.includes("Email") ? 'campo-mancante' : ''}`}
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e, setEmail)}
                    />
                </div>
                <div className='domanda domanda-input'>
                    <label>Telefono (valido per il codice di verifica)</label>
                    <input
                    id='new-phone-input'
                    required
                    className={`${phone !== "" ? 'filled' : missingField.includes("Numero di telefono") ? 'campo-mancante' : ''}`}
                    type="tel"
                    value={phone}
                    onChange={(e) => handleChange(e, setPhone)}
                    />
                </div>                  
              </div>
            </div>
            <div className='domanda-checkbox dck1'>
                <input
                id='new-privacy-checkbox'
                type='checkbox'
                required
                value={accept}
                onChange={() => setAccept(!accept)}
                className={!accept && missingField.includes("Accetta i termini e le condizioni") ? 'campo-mancante-checkbox' : ''}
                />
                <label>
                Ho preso visione della <a href='https://www.comparacorsi.it/privacy-policy/'>Privacy Policy</a>.
                </label>
            </div>
            <div className='domanda-checkbox dck2'>
                <input
                id='new-terms-checkbox'
                type='checkbox'
                required
                value={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className={!acceptTerms && missingField.includes("Accetta i termini e le condizioni") ? 'campo-mancante-checkbox' : ''}
                />
                <label>
                Ho preso visione dei <a href='https://www.iubenda.com/termini-e-condizioni/62720878'>Termini e Condizioni</a>.
                </label>
            </div>
         
        </div>
        {!isLoad ? 
        <button id='comparatore-new-discover-courses-btn' onClick={handleSubmit} className='button-prosegui'>Scopri tutti i corsi</button> : 
        <button className='button-prosegui'>Invio in corso..</button>
        }
        <p className='p-under-btn'>Verrai contattato solo da un <font color='#F37E0E'>nostro orientatore</font>, che, se vuoi, ti supporterà nella scelta, nelle agevolazioni e nella burocrazia</p>
        <div className='comparatore-bottom'>
            <h2>
            <b>Ti orientiamo tra i corsi <br /> online, e lo facciamo al <br />meglio. <font color='#FF692D'>Gratuitamente.</font>
            </b>
            </h2>
        </div>
    </div>
  )
}

export default ComparatoreLeadSystem
