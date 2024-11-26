import React, {useState, useEffect} from 'react'
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa'
import comp2 from '../imgs/comp2.png';
import './comparatore.css';
import { useSearch } from '../context/SearchContext';
import dataCorsi from './output.json';
import './risultati.css';
import axios from 'axios';
import { atenei } from './atenei';
import unidav from '../imgs/Unidav.png';
import stelleverdi from '../imgs/stelleverdi.png';
import unipegaso from '../imgs/pegaso.png';
import uninettuno from '../imgs/Uninettuno.png';
import unimerc from '../imgs/Mercatorum.png';
import unifotunato from '../imgs/giustino fortunato.png';
import unicusano from '../imgs/cusano.png';
import sapienza from '../imgs/unitelmasapienza.png';
import ecampus from '../imgs/e- campus.png';
import uniMarconi from '../imgs/unimarconi.png';
import sanraffaele from '../imgs/san raffaele.png';
import iul from '../imgs/IUL.png';
import compmob2 from '../imgs/comp-mob2.png';
import bollino from '../imgs/BollinoSconto50.png';
import { FaTimes } from 'react-icons/fa';
import Lottie from 'react-lottie';
import successJson from '../imgs/successJson.json';
import bolMob from '../imgs/sconto-mobile.png';
import logo from '../imgs/LOGO_COMPARA_CORSI_COLOR-2048x289.webp';
import {useNavigate} from 'react-router-dom';
import { schedaCorsi } from '../context/SchedaCorsiArray';
import { ArraySchede } from '../context/SchedaCorsiArrayTrue';
import logospin from '../imgs/logospin.png';
import sara from '../imgs/sara.png'
import stella from '../imgs/stella.png'
import review from '../imgs/review.png'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import StepProgress from '../components/StepProgress';
import migliorcorso from '../imgs/migliorcorso.png';
import checkO from '../imgs/checkO.png'
import frecciagiù from '../imgs/frecciagiù.png';

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

const Risultati = () => {
  //window.scrollTo(0, 0);
  const { degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, 
    budget, setBudget, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone, enrollmentTime,
    setEnrollmentTime, universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories,
    setCategories, origBudget, setOrigBudget, origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest,
  rangeMax, setRangeMax } = useSearch();
  const prezzoMin = 1000;
  const [prezzoMax, setPrezzoMax] = useState(3000);
  const location = useLocation();
  const { showLoad } = location.state || false;

  const handleChangePrezzo = (nuoviValori) => {
    setPrezzoMax(nuoviValori[1]);
    setRangeMax(nuoviValori[1]);
  };

  const navigate = useNavigate();
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successJson,
  };

  const [uniqueArea, setUniqueArea] = useState([]);
  const [uniqueCorso, setUniqueCorso] = useState([]);
  const [uniquePrice, setUniquePrice] = useState([]);
  const [schedaCorso, setSchedaCorso] = useState({});

  useEffect(() => {
      const filteredAreaNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType).map(data => data.Area))];
      setUniqueArea(filteredAreaNames)

  }, [degreeType]);

  useEffect(() => {
    
    const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Corsi di laurea + (non lo so)']))];
    setUniqueCorso(filteredCorsoNames)

  }, [desiredDegree]);

  useEffect(() => {

    const filteredBudgetNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Costo ']))];
    setUniquePrice(filteredBudgetNames);

  }, [desiredDegree, subjectOfInterest]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [origCorsi, setOrigCorsi] = useState([]);
  useEffect(() => {

    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (origDegreeType && corso.Tipologia !== origDegreeType) {
        return false;
      }
  
      /*if (origSubjectOfInterest && corso['Corsi di laurea + (non lo so)'] !== origSubjectOfInterest) {
        return false;
      }*/
  
      if (origDesiredDegree && corso.Area !== origDesiredDegree) {
        return false;
      }
  
      /*if (budget && corso['Costo '] !== budget) {
        return false;
      }*/
      if (corso.min > rangeMax) {
        return false;
      }
  
      return true;
  });

  setFilteredCourses(initialFilteredCourses);
  setOrigCorsi(dataCorsi);
  }, []);

  const migliorCorso = origCorsi
  .filter((corso) => {
    if (degreeType && corso.Tipologia !== degreeType) {
      return false;
    }
    if (desiredDegree && corso.Area !== desiredDegree) {
      return false;
    }
    if (corso.min > rangeMax) {
      return false;
    }
    return true;
  })
  .reduce((minCorso, currentCorso) => {
    return currentCorso.min < minCorso.min ? currentCorso : minCorso;
  }, origCorsi[0]);

  const risultatiCorso = origCorsi
  .filter((corso) => {
    if (degreeType && corso.Tipologia !== degreeType) {
      return false;
    }
    if (desiredDegree && corso.Area !== desiredDegree) {
      return false;
    }
    if (corso.min > rangeMax) {
      return false;
    }
    return true;
  });

  const migliorCorsoArray = [migliorCorso];


  const schedaExist = (corso) => {
    return !!ArraySchede.find((item) => item.nome === corso);
  };

  const modifyFilter = () => {
    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (degreeType && corso.Tipologia !== degreeType) {
        return false;
      }
  
      /*if (subjectOfInterest && corso['Corsi di laurea + (non lo so)'] !== subjectOfInterest) {
        return false;
      }*/
  
      if (desiredDegree && corso.Area !== desiredDegree) {
        return false;
      }
  
      /*if (budget && corso['Costo '] !== budget) {
        return false;
      }*/

      if (corso.min > rangeMax) {
        return false;
      }
  
      return true;
  });
  setFilteredCourses(initialFilteredCourses);
  }

  const [openFilter, setOpenFilter] = useState(false);
  const [talkOr, setTalkOr] = useState(false);
  const [ateneo, setAteneo] = useState("");
  const [budgetOk, setBudgetOk] = useState("");
  const [percorsoDiStudi, setPercorsoDiStudi] = useState("");
  const [thanks, setThanks] = useState(false);
  const [load, setLoad] = useState(true);

  const talkOrientatore = (ateneo, percorso, budg) => {
    setAteneo(ateneo);
    setPercorsoDiStudi(percorso);
    setBudgetOk(budg);
    setTalkOr(true);
  }

  const setOpenClose = () => {
    if (openFilter == true) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  };

  const closePopup = () => {
    setTimeout(() => {
      setThanks(false);
      setTalkOr(false);
    }, 2000);
  }

  const handleSendSheet = async () => {
    setThanks(true);
    const urlSheet = 'https://sheet.best/api/sheets/eaef7ae5-c150-4232-acea-ed55599ff0fd';
    const checkUrl = `${urlSheet}?search=email:${email}`; 

    const formData = {
      Data: new Date(),
      Nome: firstName,
      Cognome: lastName,
      Telefono: phone,
      Email: email,
      ["Quale tipologia di corso di laurea ti interessa?"]: degreeType,
      ["Quale corso di laurea sei interessato?"]: desiredDegree,
      ["Cosa ti piacerebbe studiare?"]: percorsoDiStudi,
      ["Quanto sei disposto a spendere?"]: budgetOk,
      ["Quando vorresti iscriverti?"]: enrollmentTime,
      ["Stai già frequentando l'università?"]: universityStatus,
      ["Stai già lavorando?"]: workStatus,
      ["Quanto tempo hai da dedicare alla tua formazione?"]: studyTime,
      ["Fai parte di uno o più categorie?"]: categories,
      Ateneo: ateneo && ateneo,
    };

    const checkResponse = await fetch(checkUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const existingData = await checkResponse.json();
      const matchingData = existingData.filter(item => item.Email === email);

      if (matchingData.length > 0) {
        closePopup();
        console.log('I dati con questa email esistono già. Non è possibile inviare duplicati.', matchingData);
        return; 
      }
  
    fetch(urlSheet, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
  
        if (response.ok) {
          console.log("Dati inviati con successo");
          setBudget("");
          setFilteredCourses(origCorsi);
          closePopup();
        } else {
          console.error("Errore nell'invio dei dati");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  const handleChangeLaurea = (e) => {
    setFilteredCourses(origCorsi);
    setDegreeType(e.target.value);

    setDesiredDegree("")
    setSubjectOfInterest("")
    setBudget("");
  };

  const handleChangeArea = (e) => {
    setFilteredCourses(origCorsi);
    setDesiredDegree(e.target.value);

    setSubjectOfInterest("");
    setBudget("");

  }

  const handleChangeSub = (e) => {
    setFilteredCourses(origCorsi);
    setSubjectOfInterest(e.target.value);

    setBudget("");
  }

  const ateneiPrioritari = ["Unipegaso", "Mercatorum", "San Raffaele"];

  const [exit, setExit] = useState(false);
  const [what, setWhat] = useState("");

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Sei sicuro di voler lasciare la pagina?";
      event.returnValue = message; // Standard per la maggior parte dei browser
      setExit(true);
      return message; // Per Internet Explorer
    };
    const handlePopState = (event) => {
      const message = "Sei sicuro di voler lasciare la pagina?";
      event.returnValue = message; // Standard per la maggior parte dei browser
      setExit(true);
      return message; // Per Internet Explorer
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTalk = () => {
    setExit(false);
  }

  const navigateSchedaCorso = async (nomeCorso, ateneo) => {
    const leadData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      schedaCorsoClick: nomeCorso + ' - ' + ateneo,
    };
    try {
      //https://servercpchatbot.up.railway.app/api/setSchedaCorsoClick
      //http://localhost:8000/api/setSchedaCorsoClick
      const response = await axios.post('https://servercpchatbot.up.railway.app/api/setSchedaCorsoClick', leadData);
      console.log(response.data);
      navigate(`/universita/risultati/${nomeCorso}`, { state: { ateneo: ateneo, showLoad: false } });
    } catch (error) {
      console.error(error);
      navigate(`/universita/risultati/${nomeCorso}`, { state: { ateneo: ateneo, showLoad: false } });
    }
  }

  const getMondayDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday if today is Sunday
    const monday = new Date(today.setDate(diff));
  
    const options = { day: 'numeric', month: 'long' };
    return monday.toLocaleDateString('it-IT', options);
  };

  
  const isMobile = () => {
    return window.innerWidth <= 768;
  };
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const texts = ['Stiamo analizzando i risultati...', 'Analizzo i corsi migliori...', 'Identifico le migliori recensioni...'];
  useEffect(() => {
    const duration = showLoad ? 10000 : 2000;
    const textDuration = 3300;
  
    let startTime = null;
  
    const updateLoading = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
  
      const progress = Math.min((elapsedTime / duration) * 100, 100);
      setProgress(progress);
  
      const textIndex = Math.floor((elapsedTime / textDuration) % texts.length);
      setTextIndex(textIndex);
  
      if (elapsedTime < duration) {
        requestAnimationFrame(updateLoading);
      }
    };
  
    requestAnimationFrame(updateLoading);
  
    const timeoutId = setTimeout(() => {
      setLoad(false);
    }, duration);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {load ? (
        <div className='risultati risultati-loading'>
          <Header />
          <div className='comparatore-top'>
              <h2 style={{textAlign: 'center', color: 'white', fontSize: '18px', fontWeight: '400'}}>Stiamo <b>comparando</b> i migliori risultati</h2>
          </div>
          <div className='loader-container'>
            <img className='loader' src={logospin}/>
            <div className="loading-text">{texts[textIndex]}</div>
            <div className="progress-container">
              <div className="progress" style={{ width: `${progress}%`, background: '#F37E0E' }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className='risultati'>
      {talkOr && (
        <div className='popup-shadows'>
          {thanks == true ? (
            <div className='popup-send'>
             <Lottie options={defaultOptions} width={300} height={300} />
           </div>  
          ) : (
            <div className='popup-send'>
              <p onClick={() => setTalkOr(false)}><FaTimes /></p>
              <h2>Parla con il nostro team di supporto</h2>
                <div className='domanda domanda-input'>
                  <label>Nome</label>
                  <input
                  disabled
                  className={`${firstName !== "" ? 'filled' : ''}`}
                  type="text"
                  value={firstName}
                  />
              </div>
              <div className='domanda domanda-input'>
                  <label>Cognome</label>
                  <input
                  disabled
                  className={`${lastName !== "" ? 'filled' : ''}`}
                  type="text"
                  value={lastName}
                  />
              </div>
              <div className='domanda domanda-input'>
                  <label>Telefono</label>
                  <input
                  disabled
                  className={`${phone !== "" ? 'filled' : ''}`}
                  type="tel"
                  value={phone}
                  />
              </div>
              <button className='button-orientatore' onClick={handleSendSheet}>Parla con il nostro team di supporto</button>
            </div>          
          )}

        </div>
      )}
      {exit && (
        <div className='popup-shadows'>
            <div className='popup-send popup-exit'>
              <p onClick={() => {setExit(false); setWhat("")} }><FaTimes /></p>
              <img alt='logo comparacorsi' src={logo} style={{width: '150px', height: 'auto'}} />
              <h2 style={{fontSize: '26px'}}>ASPETTA!</h2>
              <p className='pLast' style={{textAlign: 'center'}}>I risultati ancora non <br /> ti convincono?</p>
              <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', gap: '0.2rem', border: '2px solid #FF692D', width: '90%', borderRadius: '10px', paddingBottom: '25px'}}>
                <p><b>Ti garantiamo il </b><font color='#FF692D'>prezzo più basso</font> <br /> sulla retta universitaria.</p>
                <button className='button-orientatore btn-or-close' onClick={handleTalk}>Parla con il <br /> nostro team di supporto.</button>
              </div>
            </div>         
        </div>
      )}
      <div className='risultati-top-container'>
        {/*<div className='comparatore-top not-sticky'>
            <div style={isMobile() ? {width: '100%'} : {width: '80%'}}>
                {!isMobile() ? <FaGraduationCap /> : null}
                <h2 style={isMobile() ? {fontSize: '16px', fontWeight: '400', width: '100%'} : null}>Ciao {firstName ? firstName : ''} sono <b><i>Sara</i></b>, la tua <b>orientatrice dedicata</b>.</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp2} />
            </div>
        </div>*/}
        <div className='comparatore-top-new not-sticky'>
          <StepProgress step={2} />
        </div>
        {/*<div className='sara-top'>
          <div>
            <img alt='sara orientatrice' src={sara} />
          </div>
          <div>
            <p>Sara</p>
            <p><b>Orientatrice</b> <img alt='review' src={stella} /></p>
            <hr />
            <img alt='review' src={review} />
            <p>Su 178 recensioni</p>
          </div>
        </div>*/}
          <h1 className='h1-tit'>Abbiamo selezionato i corsi online <font color='#F37E0E'>ideali per te</font>!</h1>
          <h4 className='h1-comp'>Se non hai ancora le idee chiare
            non preoccuparti, un <font color='#F37E0E'>nostro orientatore </font>
            ti guiderà gratuitamente verso la
            scelta più giusta.</h4>
        <div className='miglior-risultato'>
          <p>Sulla base delle tue preferenze,{isMobile() && <br />}
          il <font color='#F37E0E'>miglior risultato</font> è:</p>
        </div>
      </div>
        <div className='risultati-container' id='top'>
           {!isMobile() &&
                      <div className='cosa-fa-orientatore-desktop'>
                        <h4>Cosa fa per te l'<font color='#F37E0E'>orientatore</font></h4>
                        <div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Ti aiuterà a <font color='#F37E0E'><b>fare chiarezza</b></font> sul corso di laurea perfetto per te</span>
                          </div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Si occuperà di proporti le migliori <font color='#F37E0E'><b>agevolazioni economiche</b></font></span>
                          </div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Ti alleggerirà il carico occupandosi di tutte le <font color='#F37E0E'><b>pratiche burocratiche</b></font></span>
                          </div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Ti aiuterà a comprendere al meglio la <font color='#F37E0E'><b>struttura dei corsi</b></font></span>
                          </div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Sarà <font color='#F37E0E'><b>al tuo fianco sempre</b></font>, anche dopo l’iscrizione</span>
                          </div>
                          <div>
                            <img src={checkO} alt="check icon" />
                            <span>Ti fornirà un <font color='#F37E0E'><b>servizio totalmente gratuito</b></font> e senza impegno</span>
                          </div>
                        </div>
                      </div>/*<div className='filtri'>
            <button onClick={modifyFilter}>Modifica la tua ricerca</button>
            <div className='comparatore-domande'>
            <div className='domanda'>
                <label>Quale tipologia di corso di laurea ti interessa?</label>
                <select 
                className={`${degreeType !== "" ? 'filled' : ''}`} 
                value={degreeType} 
                onChange={(e) => handleChangeLaurea(e)} required>
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
                className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                value={desiredDegree} 
                onChange={(e) => handleChangeArea(e)} required>
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
                onChange={(e) => handleChange(e, setDesiredDegree)} required>
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
                className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                value={subjectOfInterest} 
                onChange={(e) => handleChangeSub(e)} required>
                    <option disabled value="">Seleziona un corso</option>
                    {uniqueCorso && uniqueCorso.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
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
                <label style={{maxWidth: '330px', width: '100%'}}>Quanto sei disposto a spendere?</label>
                  <PrezziSlider min={prezzoMin} max={8000} step={500} onChange={handleChangePrezzo} rangeMax={rangeMax} />    
                </div>
            </div>
          </div>*/}
          <div>
            <div className='corsi'>
                <div className='corsi-container'>
                    {degreeType !== "" && migliorCorsoArray.length > 0 ? (
                      <>
                      {migliorCorsoArray
                    .map((corso, index) =>  {
                      const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                    return (
                      <>
                      <h4 className='best-result' style={{textAlign:'left', marginTop:'1rem', textAlign: 'center'}}>Risultato N.1 su {risultatiCorso?.length}</h4>
                      <div className='border-match-corso'>
                        <img src={migliorcorso} alt='miglior corso comparacorsi' />
                        <div className='single-corso match-corso' key={index}>
                          {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                          <>
                            <img className='bollino' src={bolMob} />
                          </>
                          ): (
                            null
                          )}
                          <div className='top-corso'>
                            <div>
                            {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                                <img alt='logo ateneo' src={unidav} />
                              ) : ateneo && ateneo.ateneo === "Unipegaso" ? (
                                <img alt='logo ateneo' src={unipegaso} />
                              ) : corso && corso.Ateneo === "Uninettuno" ? (
                                <img alt='logo ateneo' src={uninettuno} />
                              ) : ateneo && ateneo.ateneo === "Mercatorum" ? (
                                <img alt='logo ateneo' src={unimerc} />
                              ) : ateneo && ateneo.ateneo === "Unifortunato" ? (
                                <img alt='logo ateneo' src={unifotunato} />
                              ) : ateneo && ateneo.ateneo === "Unicusano" ? (
                                <img alt='logo ateneo' src={unicusano} />
                              ) : corso && corso.Ateneo === "Unitelma" ? (
                                <img alt='logo ateneo' src={sapienza} />
                              ) : ateneo && ateneo.ateneo === "eCampus" ? (
                                <img alt='logo ateneo' src={ecampus} />
                              ) : ateneo && ateneo.ateneo === "Unimarconi" ? (
                                <img alt='logo ateneo' src={uniMarconi} />
                              ) : ateneo && ateneo.ateneo === "San Raffaele" ? (
                                <img alt='logo ateneo' src={sanraffaele} />
                              ) : ateneo && ateneo.ateneo === "Iul" ? (
                                <img alt='logo ateneo' src={iul} />
                              ) : (
                                <img alt='logo ateneo' />
                              )}
                            </div>
                            <div className='corso-info'>
                              <p><span style={{fontWeight: '500'}}>Ateneo</span> <b>{corso.Ateneo && corso.Ateneo}</b></p>
                              <p><span style={{fontWeight: '500'}}>Corso</span> <b>{corso['Corsi di laurea + (non lo so)']}</b></p>
                              <p><span style={{fontWeight: '500'}}>Settore</span> <b>{corso.Area}</b></p>
                            </div>
                          </div>
                          <div className='bottom-corso'>
                              <div className='prezzo-corso'>
                                <div>
                                  <div className='sconto-corso'>
                                    Sconto fino al 50%
                                    <p>TRAMITE COMPARACORSI</p>
                                  </div>
                                  <div className='costo'>
                                    <p>RETTA ANNUA</p>
                                    <p><span>{corso?.min}€</span><span><del>{corso?.max}</del></span></p>
                                  </div>
                                </div>
                              </div>
                              <div className='tag-corso'>
                                <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} sedi</p>
                                <p>Online</p>
                                <p>Riconoscimento CFU</p>
                              </div>
                          </div>
                          <div className='trustpilot'>
                              <img alt='logo trustpilot' src={stelleverdi} />
                              <p><b>Valutato {ateneo && ateneo.punteggio}</b> sulla base <br /> di <u>{ateneo && ateneo.recensioni} recensioni</u></p>
                          </div>
                        </div>
                        {schedaExist(corso['Corsi di laurea + (non lo so)']) ? (
                                <button onClick={() => navigateSchedaCorso(corso['Corsi di laurea + (non lo so)'], ateneo && ateneo.ateneo)}>
                                  Vai a scheda corso  <FaArrowRight />
                                </button>
                              ) : (
                                <button onClick={async() => {
                                  const leadData = {
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    phone: phone,
                                    saraClick: 'si',
                                  };
                              try {
                                  //https://servercpchatbot.up.railway.app/api/setSaraClick
                                  //http://localhost:8000/api/setSaraClick
                                  const response = await axios.post('https://servercpchatbot.up.railway.app/api/setSaraClick', leadData);
                                  console.log(response.data);
                                  navigate("/parla-con-sara")
                              } catch (error) {
                                console.error(error)
                                navigate("/parla-con-sara")
                              }
                              }}>Conosci il tuo Orientatore</button>
                            )}
                      </div>
                      </>
                    )})}

                    <div className='scorri-risultati'>
                      <p>Scorri per scoprire <b>altri risultati</b></p>  
                      <img src={frecciagiù} alt='scorri' />
                    </div>

                    </>) : (

                      <>
                      {origCorsi.length > 0 && origCorsi.filter((corso) => {
                      if (degreeType && corso.Tipologia !== degreeType) {
                        return false;
                      }
                  
                      if (desiredDegree && corso.Area !== desiredDegree) {
                        return false;
                      }
                  
                      return true;
                    }).length > 0 && <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Coerente con il filtro: Percorso di studi</h4>}
                      {origCorsi.length > 0 && origCorsi.filter((corso) => {
                      if (degreeType && corso.Tipologia !== degreeType) {
                        return false;
                      }
                  
                      if (desiredDegree && corso.Area !== desiredDegree) {
                        return false;
                      }
                  
                      return true;
                    })
                    .sort((corsoA, corsoB) => {
                      const ateneoA = corsoA.Ateneo;
                      const ateneoB = corsoB.Ateneo;
                  
                      const isPrioritarioA = ateneiPrioritari.includes(ateneoA);
                      const isPrioritarioB = ateneiPrioritari.includes(ateneoB);
                  
                      if (isPrioritarioA && !isPrioritarioB) {
                        return -1; // metti corsoA prima di corsoB
                      } else if (!isPrioritarioA && isPrioritarioB) {
                        return 1; // metti corsoB prima di corsoA
                      }
                  
                      return 0;
                    })
                    .map((corso, index) =>  {
                      const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                    return (
                      <div className='border-not-match-corso'>
                        <img src={migliorcorso} alt='miglior corso comparacorsi' />
                        <div className='single-corso' key={index}>
                          {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                          <>
                            <img className='bollino' src={bolMob} />
                          </>
                          ): (
                            null
                          )}
                          <div className='top-corso'>
                            <div>
                            {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                                <img alt='logo ateneo' src={unidav} />
                              ) : ateneo && ateneo.ateneo === "Unipegaso" ? (
                                <img alt='logo ateneo' src={unipegaso} />
                              ) : corso && corso.Ateneo === "Uninettuno" ? (
                                <img alt='logo ateneo' src={uninettuno} />
                              ) : ateneo && ateneo.ateneo === "Mercatorum" ? (
                                <img alt='logo ateneo' src={unimerc} />
                              ) : ateneo && ateneo.ateneo === "Unifortunato" ? (
                                <img alt='logo ateneo' src={unifotunato} />
                              ) : ateneo && ateneo.ateneo === "Unicusano" ? (
                                <img alt='logo ateneo' src={unicusano} />
                              ) : corso && corso.Ateneo === "Unitelma" ? (
                                <img alt='logo ateneo' src={sapienza} />
                              ) : ateneo && ateneo.ateneo === "eCampus" ? (
                                <img alt='logo ateneo' src={ecampus} />
                              ) : ateneo && ateneo.ateneo === "Unimarconi" ? (
                                <img alt='logo ateneo' src={uniMarconi} />
                              ) : ateneo && ateneo.ateneo === "San Raffaele" ? (
                                <img alt='logo ateneo' src={sanraffaele} />
                              ) : ateneo && ateneo.ateneo === "Iul" ? (
                                <img alt='logo ateneo' src={iul} />
                              ) : (
                                <img alt='logo ateneo' />
                              )}
                            </div>
                            <div className='corso-info'>
                              <p><span style={{fontWeight: '500'}}>Ateneo</span> <b>{corso.Ateneo && corso.Ateneo}</b></p>
                              <p><span style={{fontWeight: '500'}}>Corso</span> <b>{corso['Corsi di laurea + (non lo so)']}</b></p>
                              <p><span style={{fontWeight: '500'}}>Settore</span> <b>{corso.Area}</b></p>
                            </div>
                          </div>
                          <div className='bottom-corso'>
                              <div className='prezzo-corso'>
                                <div>
                                  <div className='sconto-corso'>
                                  Sconto fino al 50%
                                    <p>TRAMITE COMPARACORSI</p>
                                  </div>
                                  <div className='costo'>
                                    <p>RETTA ANNUA</p>
                                    <p><span>{corso?.min}€</span><span><del>{corso?.max}</del></span></p>
                                  </div>
                                </div>
                              </div>
                              <div className='tag-corso'>
                                <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} sedi</p>
                                <p>Online</p>
                                <p>Riconoscimento CFU</p>
                              </div>
                          </div>
                          <div className='trustpilot'>
                              <img alt='logo trustpilot' src={stelleverdi} />
                              <p><b>Valutato {ateneo && ateneo.punteggio}</b> sulla base <br /> di <u>{ateneo && ateneo.recensioni} recensioni</u></p>
                          </div>
                        </div>
                        {schedaExist(corso['Corsi di laurea + (non lo so)']) ? (
                                <button onClick={() => navigateSchedaCorso(corso['Corsi di laurea + (non lo so)'], ateneo && ateneo.ateneo)}>
                                  Vai a scheda corso  <FaArrowRight />
                                </button>
                              ) : (
                                <button onClick={async() => {
                                  const leadData = {
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    phone: phone,
                                    saraClick: 'si',
                                  };
                              try {
                                  //https://servercpchatbot.up.railway.app/api/setSaraClick
                                  //http://localhost:8000/api/setSaraClick
                                  const response = await axios.post('https://servercpchatbot.up.railway.app/api/setSaraClick', leadData);
                                  console.log(response.data);
                                  navigate("/parla-con-sara")
                              } catch (error) {
                                console.error(error)
                                navigate("/parla-con-sara")
                              }
                              }}>Conosci il tuo Orientatore</button>
                            )}
                      </div>
                    )})}
                    </>
                    )}
                </div>
            </div>
            {isMobile() && <div className='cosa-fa-orientatore'>
              <h4>Cosa fa per te l'<font color='#F37E0E'>orientatore</font></h4>
              <div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Ti aiuterà a <font color='#F37E0E'><b>fare chiarezza</b></font> sul corso di laurea perfetto per te</span>
                </div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Si occuperà di proporti le migliori <font color='#F37E0E'><b>agevolazioni economiche</b></font></span>
                </div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Ti alleggerirà il carico occupandosi di tutte le <font color='#F37E0E'><b>pratiche burocratiche</b></font></span>
                </div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Ti aiuterà a comprendere al meglio la <font color='#F37E0E'><b>struttura dei corsi</b></font></span>
                </div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Sarà <font color='#F37E0E'><b>al tuo fianco sempre</b></font>, anche dopo l’iscrizione</span>
                </div>
                <div>
                  <img src={checkO} alt="check icon" />
                  <span>Ti fornirà un <font color='#F37E0E'><b>servizio totalmente gratuito</b></font> e senza impegno</span>
                </div>
              </div>
            </div>}

            <div className='corsi'>
              <div className='corsi-container'>
              {origCorsi && origCorsi.filter((corso) => {
                  if (degreeType && corso.Tipologia !== degreeType) {
                    return false;
                  }
                  if (desiredDegree && corso.Area !== desiredDegree) {
                    return false;
                  }
                  if (corso.min > rangeMax) {
                    return false;
                  }
                  return corso !== migliorCorso; // Esclude il miglior corso
                })
                  .sort((corsoA, corsoB) => {
                    const ateneoA = corsoA.Ateneo;
                    const ateneoB = corsoB.Ateneo;
                
                    const isPrioritarioA = ateneiPrioritari.includes(ateneoA);
                    const isPrioritarioB = ateneiPrioritari.includes(ateneoB);
                
                    if (isPrioritarioA && !isPrioritarioB) {
                      return -1; // metti corsoA prima di corsoB
                    } else if (!isPrioritarioA && isPrioritarioB) {
                      return 1; // metti corsoB prima di corsoA
                    }
                
                    return 0;
                  })
                  .map((corso, index) =>  {
                    const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                  return (
                    <div className='border-not-match-corso'>
                    <div className='single-corso' key={index}>
                      {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                      <>
                        <img className='bollino' src={bolMob} />
                      </>
                      ): (
                        null
                      )}
                      <div className='top-corso'>
                        <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo && ateneo.ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : corso && corso.Ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo && ateneo.ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo && ateneo.ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo && ateneo.ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : corso && corso.Ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo && ateneo.ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo && ateneo.ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo && ateneo.ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo && ateneo.ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        </div>
                        <div className='corso-info'>
                          <p><span style={{fontWeight: '500'}}>Ateneo</span> <b>{corso.Ateneo && corso.Ateneo}</b></p>
                          <p><span style={{fontWeight: '500'}}>Corso</span> <b>{corso['Corsi di laurea + (non lo so)']}</b></p>
                          <p><span style={{fontWeight: '500'}}>Settore</span> <b>{corso.Area}</b></p>
                        </div>
                      </div>
                      <div className='bottom-corso'>
                          <div className='prezzo-corso'>
                            <div>
                              <div className='sconto-corso'>
                              Sconto fino al 50%
                                <p>TRAMITE COMPARACORSI</p>
                              </div>
                              <div className='costo'>
                                <p>RETTA ANNUA</p>
                                <p><span>{corso?.min}€</span><span><del>{corso?.max}</del></span></p>
                              </div>
                            </div>
                          </div>
                          <div className='tag-corso'>
                            <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} sedi</p>
                            <p>Online</p>
                            <p>Riconoscimento CFU</p>
                          </div>
                      </div>
                      <div className='trustpilot'>
                          <img alt='logo trustpilot' src={stelleverdi} />
                          <p><b>Valutato {ateneo && ateneo.punteggio}</b> sulla base <br /> di <u>{ateneo && ateneo.recensioni} recensioni</u></p>
                      </div>
                    </div>
                    {schedaExist(corso['Corsi di laurea + (non lo so)']) ? (
                            <button onClick={() => navigateSchedaCorso(corso['Corsi di laurea + (non lo so)'], ateneo && ateneo.ateneo)}>
                              Vai a scheda corso  <FaArrowRight />
                            </button>
                          ) : (
                            <button onClick={async() => {
                              const leadData = {
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                phone: phone,
                                saraClick: 'si',
                              };
                          try {
                              //https://servercpchatbot.up.railway.app/api/setSaraClick
                              //http://localhost:8000/api/setSaraClick
                              const response = await axios.post('https://servercpchatbot.up.railway.app/api/setSaraClick', leadData);
                              console.log(response.data);
                              navigate("/parla-con-sara")
                          } catch (error) {
                            console.error(error)
                            navigate("/parla-con-sara")
                          }
                          }}>Conosci il tuo Orientatore</button>
                        )}
                  </div>
                  )})}
              </div>
            </div>            
          </div>

        </div>
        <div className='sara-fix'>
          <p>Ultimo step:</p>
          <button onClick={async() => {
                const leadData = {
                  first_name: firstName,
                  last_name: lastName,
                  email: email,
                  phone: phone,
                  saraClick: 'si',
                };
            try {
                //https://servercpchatbot.up.railway.app/api/setSaraClick
                //http://localhost:8000/api/setSaraClick
                const response = await axios.post('https://servercpchatbot.up.railway.app/api/setSaraClick', leadData);
                console.log(response.data);
                navigate("/parla-con-sara")
            } catch (error) {
              console.error(error)
              navigate("/parla-con-sara")
            }
            }}>Conosci il tuo Orientatore</button>
            <p>Il nostro servizio <font color='#044B5A'><b>È GRATUITO</b></font> e lo sarà sempre</p>
        </div>
        </div>     
      )}
    </>
  )
}

export default Risultati