import React, {useState, useEffect} from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import comp2 from '../imgs/comp2.png';
import './comparatore.css';
import dataCorsi from './output-tech.json';
import './risultati.css';
import offerta from '../imgs/Group.png';
import trustpilot from '../imgs/trustpilot.png'
import { ateneiTech } from './atenei';
import epicode from '../imgs/Logo epicode.png';
import digitazon from '../imgs/digitazon.png';
import Executy from '../imgs/Executy.png';
import aulab from '../imgs/logo aulab.png';
import boolean from '../imgs/Logo Boolean.png';
import musa from '../imgs/Logo musa formazione.png';
import start from '../imgs/start2impact.png';
import ttf from '../imgs/TTF.png';
import compmob2 from '../imgs/comp-mob2.png';
import bollino from '../imgs/BollinoSconto50.png';
import { FaTimes } from 'react-icons/fa';
import Lottie from 'react-lottie';
import successJson from '../imgs/successJson.json';
import bolMob from '../imgs/sconto-mobile.png';
import { useSearchDT } from '../context/SearchContextDT';

const RisultatiTech = () => {
  window.scrollTo(0, 0);
  const { lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone,
    areaTech, setAreaTech, corsoTech, setCorsoTech, budgetTech, setBudjetTech, timeTech, setTimeTech,
    workStatusTech, setWorkStatusTech, livelloCompetenze, setLivelloCompetenze } = useSearchDT();

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

  useEffect(() => {
    const filteredAreaNames = [...new Set(dataCorsi.filter(data => data.Area === areaTech).map(data => data['Corsi + (non lo so) ']))];
    setUniqueArea(filteredAreaNames);
  }, [areaTech]);

  useEffect(() => {
    const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Area === areaTech && data['Corsi + (non lo so) '] === corsoTech).map(data => data['Costo ']))];
    console.log(filteredCorsoNames)
    setUniqueCorso(filteredCorsoNames)
  }, [corsoTech]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [origCorsi, setOrigCorsi] = useState([]);

  useEffect(() => {

    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (areaTech && corso.Area !== areaTech) {
        return false;
      }
  
      if (corsoTech && corso['Corsi + (non lo so) '] !== corsoTech) {
        return false;
      }
  
      if (timeTech && corso.DurataOk !== timeTech) {
        return false;
      }
  
      return true;
  });

  console.log(initialFilteredCourses);
  setFilteredCourses(initialFilteredCourses);
  setOrigCorsi(dataCorsi);

  }, [])

  console.log(dataCorsi);

  const modifyFilter = () => {
    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (areaTech && corso.Area !== areaTech) {
        return false;
      }
  
      if (corsoTech && corso['Corsi + (non lo so) '] !== corsoTech) {
        return false;
      }
  
      if (timeTech && corso.DurataOk !== timeTech) {
        return false;
      }
  
      return true;
  });
  console.log(initialFilteredCourses);
  setFilteredCourses(initialFilteredCourses);
  }

  const [openFilter, setOpenFilter] = useState(false);
  const [talkOr, setTalkOr] = useState(false);
  const [ateneo, setAteneo] = useState("");
  const [budgetOk, setBudgetOk] = useState("");
  const [percorsoDiStudi, setPercorsoDiStudi] = useState("");
  const [thanks, setThanks] = useState(false);

  const talkOrientatore = (ateneo, percorso, budg) => {
    console.log(ateneo);
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

  const handleSendSheet = () => {
    setThanks(true);
    const urlSheet = 'https://sheet.best/api/sheets/6aed96cc-820d-44cf-b34e-86ba128fb55e';
    const formData = {
      Data: new Date(),
      Nome: firstName,
      Cognome: lastName,
      Telefono: phone,
      Email: email,
      ["Quale area ti interessa"]: areaTech,
      ["Quale corso ti interessa"]: percorsoDiStudi,
      ["Durata corso"]: timeTech,
      ["Stai già lavorando?"]: workStatusTech,
      ["Il tuo livello di competenze"]: livelloCompetenze,
      Academy: ateneo && ateneo,
    };
  
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

  const handleChangeArea = (e) => {
    setFilteredCourses(origCorsi);
    setAreaTech(e.target.value);

    setCorsoTech("")
    setBudjetTech("");
  };

  const handleChangeCorso = (e) => {
    setFilteredCourses(origCorsi);
    setCorsoTech(e.target.value);

    setBudjetTech("");
  }

  const handleChangeSub = (e) => {
    setFilteredCourses(origCorsi);
    setBudjetTech(e.target.value);
  };

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoad(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
}, []);


  return (
    <div className='risultati'>
      {load && (
        <div className='loader-container'>
          <div className="loader"></div>
        </div>
      )}
      {talkOr && (
        <div className='popup-shadows'>
          {thanks == true ? (
            <div className='popup-send'>
             <Lottie options={defaultOptions} width={300} height={300} />
           </div>  
          ) : (
            <div className='popup-send'>
              <p onClick={() => setTalkOr(false)}><FaTimes /></p>
              <h2>Parla con un orientatore</h2>
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
              <button className='button-orientatore' onClick={handleSendSheet}>Parla con l'orientatore</button>
            </div>          
          )}

        </div>
      )}
        <div className='comparatore-top not-sticky'>
            <div>
                <FaGraduationCap />
                <h2>Compara corsi universitari</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp2} />
            </div>
        </div>
        <div className='comparatore-top2'>
            <h3>Iscriviti tramite noi al prezzo più basso garantito.</h3>
        </div>
        <img alt='comparatore mobile' src={compmob2} className='compmob' />
        <div className='risultati-container' id='top'>
          <div className='filtri'>
            <button onClick={modifyFilter}>Modifica la tua ricerca</button>
            <div className='comparatore-domande'>
            <div className='domanda'>
                <label>Quale area ti interessa?</label>
                <select 
                className={`${areaTech !== "" ? 'filled' : ''}`} 
                value={areaTech} 
                onChange={(e) => handleChangeArea(e)} required>
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
                onChange={(e) => handleChangeCorso(e)} required>
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
                    <option disabled value="">Seleziona un corso</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>                    
                )}
            </div>
            <div className='domanda'>
                <label>Durata corso</label>
                <select 
                className={`${timeTech !== "" ? 'filled' : ''}`} 
                value={timeTech} 
                onChange={(e) => handleChange(e, setTimeTech)} required>
                    <option disabled value="">Seleziona una durata</option>
                    <option value="Massimo 3 mesi">Massimo 3 mesi</option>
                    <option value="3- 6 mesi">3- 6 mesi</option>
                    <option value="Più di 6 mesi">Più di sei mesi</option>
                </select>
            </div>
            </div>
          </div>
          <div className={!openFilter ? 'filtri-mobile sticky' : 'filtri-mobile sticky bg'}>
            <button onClick={setOpenClose}>Modifica la tua ricerca</button>
              {openFilter && (
              <div className='comparatore-domande'>
              <div className='domanda'>
                  <label>Quale area ti interessa?</label>
                  <select 
                  className={`${areaTech !== "" ? 'filled' : ''}`} 
                  value={areaTech} 
                  onChange={(e) => handleChangeArea(e)} required>
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
                  onChange={(e) => handleChangeCorso(e)} required>
                      <option disabled value="">Seleziona</option>
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
                  onChange={(e) => handleChangeCorso(e)} required>
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
              </div>
              )}
          </div>
          <div className='corsi'>
              <p><span><img alt='offerta' src={offerta} /></span>Offerta aggiornata al <b>19 ottobre</b></p>
              <div className='corsi-container'>
                  {areaTech !== "" && filteredCourses.length > 0 && origCorsi
                  .filter((corso) => {
                    if (areaTech && corso.Area !== areaTech) {
                      return false;
                    }
                
                    if (corsoTech && corso["Corsi + (non lo so) "] !== corsoTech) {
                      return false;
                    }
                
                    if (timeTech && corso.DurataOk !== timeTech) {
                      return false;
                    }
                
                    return true;
                  }).length > 0
                   ? (
                    filteredCourses
                  .filter((corso) => {
                    if (areaTech && corso.Area !== areaTech) {
                      return false;
                    }
                
                    if (corsoTech && corso["Corsi + (non lo so) "] !== corsoTech) {
                      return false;
                    }
                
                    if (timeTech && corso.DurataOk !== timeTech) {
                      return false;
                    }
                
                    return true;
                  })
                  .map((corso, index) =>  {
                    const ateneo = ateneiTech && ateneiTech.find((item) => item.ateneo && corso["Digital Academy"] && item.ateneo === corso["Digital Academy"]);
                    console.log(ateneo);
                  return (
                    <div className='single-corso' key={index}>
                      {/*corso && corso["Digital Academy"] && corso["Digital Academy"] == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                      <>
                        <img className='bollino-mobile' src={bolMob} />                        
                        <img className='bollino' src={bollino} />
                      </>
                      ): (
                        null
                      )*/}
                      <div>
                      {ateneo && ateneo.ateneo && ateneo.ateneo === "MUSA FORMAZIONE" ? (
                            <img alt='logo ateneo' src={musa} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "AULAB" ? (
                            <img alt='logo ateneo' src={aulab} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "EPICODE" ? (
                            <img alt='logo ateneo' src={epicode} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "START2IMPACT" ? (
                            <img alt='logo ateneo' src={start} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Executy" ? (
                            <img alt='logo ateneo' src={Executy} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "TTF" ? (
                            <img alt='logo ateneo' src={ttf} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "DIGITAZON" ? (
                            <img alt='logo ateneo' src={digitazon} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO:</p>
                          </div>
                          <div>
                            <p>{corso["Digital Academy"] && corso["Digital Academy"]}</p>
                            <p>{corso['Corsi + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>CORSO:</p>
                            <p>CERTIFICAZIONE:</p>
                            <p>DURATA CORSO:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>Nessuna certificazione</p>
                            <p>{corso.Durata ? corso.Durata : "Durata non specificata"}</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})) : (
                    <>
                    <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Coerente con il filtro: Corso</h4>
                    {origCorsi.length > 0 && origCorsi.filter((corso) => {
                    if (areaTech && corso.Area !== areaTech) {
                      return false;
                    }
                    
                    if (corsoTech && corso['Corsi + (non lo so) '] !== corsoTech) {
                      return false;
                    }
                
                    return true;
                  })
                  .map((corso, index) =>  {
                    const ateneo = ateneiTech && ateneiTech.find((item) => item.ateneo && corso["Digital Academy"] && item.ateneo === corso["Digital Academy"]);
                  return (
                    <div className='single-corso' key={index}>
                      {/*corso && corso["Digital Academy"] && corso["Digital Academy"] == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                      <>
                        <img className='bollino-mobile' src={bolMob} />                        
                        <img className='bollino' src={bollino} />
                      </>
                      ): (
                        null
                      )*/}
                      <div>
                      {ateneo && ateneo.ateneo && ateneo.ateneo === "MUSA FORMAZIONE" ? (
                            <img alt='logo ateneo' src={musa} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "AULAB" ? (
                            <img alt='logo ateneo' src={aulab} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "EPICODE" ? (
                            <img alt='logo ateneo' src={epicode} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "START2IMPACT" ? (
                            <img alt='logo ateneo' src={start} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Executy" ? (
                            <img alt='logo ateneo' src={Executy} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "TTF" ? (
                            <img alt='logo ateneo' src={ttf} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "DIGITAZON" ? (
                            <img alt='logo ateneo' src={digitazon} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO TECH:</p>
                          </div>
                          <div>
                            <p>{corso["Digital Academy"] && corso["Digital Academy"]}</p>
                            <p>{corso['Corsi + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>CORSO:</p>
                            <p>CERTIFICAZIONE:</p>
                            <p>DURATA CORSO:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>Nessuna certificazione</p>
                            <p>{corso.Durata ? corso.Durata : "Durata non specificata"}</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  <hr className='linea-separatoria' />


                  <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Coerente con il filtro: Durata</h4>
                    {origCorsi && origCorsi.filter((corso) => {
                    if (areaTech && corso.Area !== areaTech) {
                      return false;
                    }
                    
                    if (timeTech && corso.DurataOk !== timeTech) {
                      return false;
                    }
                
                    return true;
                  })
                  .map((corso, index) =>  {
                    const ateneo = ateneiTech && ateneiTech.find((item) => item.ateneo && corso["Digital Academy"] && item.ateneo === corso["Digital Academy"]);
                  return (
                    <div className='single-corso' key={index}>
                      {/*corso && corso["Digital Academy"] && corso["Digital Academy"] == "Unipegaso" || corso["Digital Academy"] == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                        <>
                          <img className='bollino-mobile' src={bolMob} />                        
                          <img className='bollino' src={bollino} />
                        </>
                      ): (
                        null
                      )*/}
                      <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "MUSA FORMAZIONE" ? (
                            <img alt='logo ateneo' src={musa} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "AULAB" ? (
                            <img alt='logo ateneo' src={aulab} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "EPICODE" ? (
                            <img alt='logo ateneo' src={epicode} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "START2IMPACT" ? (
                            <img alt='logo ateneo' src={start} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Executy" ? (
                            <img alt='logo ateneo' src={Executy} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "TTF" ? (
                            <img alt='logo ateneo' src={ttf} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "DIGITAZON" ? (
                            <img alt='logo ateneo' src={digitazon} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO TECH:</p>
                          </div>
                          <div>
                            <p>{corso["Digital Academy"] && corso["Digital Academy"]}</p>
                            <p>{corso['Corsi + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>CORSO:</p>
                            <p>CERTIFICAZIONE:</p>
                            <p>DURATA CORSO:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>Nessuna certificazione</p>
                            <p>{corso.Durata ? corso.Durata : "Durata non specificata"}</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  {origCorsi && origCorsi.filter((corso) => {
                    if (areaTech && corso.Area !== areaTech) {
                      return false;
                    }
                    
                    if (timeTech && corso.DurataOk !== timeTech) {
                      return false;
                    }
                
                    return true;
                  }).length == 0 && (
                    <h5 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400', fontSize: '17px', color: 'white', backgroundColor: '#004B5A', padding: '8px 15px'}}>Non ci sono corsi disponibili per la tua durata.</h5>
                  )}
                  <hr className='linea-separatoria' />


                  <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Altri corsi che potrebbero interessarti</h4>
                    {origCorsi && origCorsi.filter((corso) => {
                    if (areaTech && corso.Area == areaTech) {
                      return false;
                    }
                                        
                    if (timeTech && corso.DurataOk == timeTech) {
                      return false;
                    }
                
                    return true;
                  })
                  .map((corso, index) =>  {
                    const ateneo = ateneiTech && ateneiTech.find((item) => item.ateneo && corso["Digital Academy"] && item.ateneo === corso["Digital Academy"]);
                  return (
                    <div className='single-corso' key={index}>
                      {/*corso && corso["Digital Academy"] && corso["Digital Academy"] == "Unipegaso" || corso["Digital Academy"] == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                        <>
                          <img className='bollino-mobile' src={bolMob} />                        
                          <img className='bollino' src={bollino} />
                        </>
                      ): (
                        null
                      )*/}
                      <div>
                      {ateneo && ateneo.ateneo && ateneo.ateneo === "MUSA FORMAZIONE" ? (
                            <img alt='logo ateneo' src={musa} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "AULAB" ? (
                            <img alt='logo ateneo' src={aulab} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "EPICODE" ? (
                            <img alt='logo ateneo' src={epicode} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "START2IMPACT" ? (
                            <img alt='logo ateneo' src={start} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Executy" ? (
                            <img alt='logo ateneo' src={Executy} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "TTF" ? (
                            <img alt='logo ateneo' src={ttf} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "DIGITAZON" ? (
                            <img alt='logo ateneo' src={digitazon} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO TECH:</p>
                          </div>
                          <div>
                            <p>{corso["Digital Academy"] && corso["Digital Academy"]}</p>
                            <p>{corso['Corsi + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>CORSO:</p>
                            <p>CERTIFICAZIONE:</p>
                            <p>DURATA CORSO:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>Nessuna certificazione</p>
                            <p>{corso.Durata ? corso.Durata : "Durata non specificata"}</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  {origCorsi && origCorsi.filter((corso) => {
                    if (areaTech && corso.Area == areaTech) {
                      return false;
                    }
                    
                    if (timeTech && corso.DurataOk == timeTech) {
                      return false;
                    }
                
                    return true;
                  }).length == 0 && (
                    <h5 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400', fontSize: '17px', color: 'white', backgroundColor: '#004B5A', padding: '8px 15px'}}>Non ci sono corsi altri corsi simili a quelli già presenti.</h5>
                  )}
                  </>
                  )}
              </div>
          </div>
        </div>
    </div>
  )
}

export default RisultatiTech