import React, {useState, useEffect} from 'react'
import Slider from 'react-slick';
import slide1 from '../imgs/slide1.png';
import slide2 from '../imgs/slide2.png';
import slide3 from '../imgs/slide3.png';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHeart, FaShare, FaTimes } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import logoSpin from '../imgs/lw.png';
import svgPianoStudi from '../imgs/pianostudisvg.svg';
import dopoImg from '../imgs/dopo.png';
import closePianoStudi from '../imgs/svgclosepiano.svg';
import servizio1 from '../imgs/servizio1.png';
import mobilereview from '../imgs/mobile-review.png';
import servizio2 from '../imgs/servizio2.png';
import servizio3 from '../imgs/servizio3.png';
import servizio4 from '../imgs/servizio4.png';
import sbocchi from '../imgs/sbocchi.png';
import info from '../imgs/info.png';
import unidav from '../imgs/Unidav.png';
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
import Lottie from 'react-lottie';

import unidavT from '../imgs/UniversitàLeonardoDaVinciT.png';
import unipegasoT from '../imgs/pegasoT.png';
import uninettunoT from '../imgs/UninettunoT.png';
import unimercT from '../imgs/MercatorumT.png';
import unifotunatoT from '../imgs/giustino fortunato.png';
import unicusanoT from '../imgs/cusanoT.png';
import sapienzaT from '../imgs/unitelmasapienzaT.png';
import ecampusT from '../imgs/e- campusT.png';
import uniMarconiT from '../imgs/unimarconiT.png';
import sanraffaeleT from '../imgs/san raffaeleT.png';
import iulT from '../imgs/IULT.png';
import './schedaCorso.css'
import { schedaCorsi } from '../context/SchedaCorsiArray';
import { ArraySchede } from '../context/SchedaCorsiArrayTrue';
import { atenei } from './atenei';
import dataCorsi from './output.json';
import { useSearch } from '../context/SearchContext';
import successJson from '../imgs/successJson.json';

const SchedaCorso = () => {
    const { nomeCorso } = useParams();
    const [randomNumber, setRandomNumber] = useState(0);
    const [schedaCorso, setSchedaCorso] = useState({});
    const [ateneoR, setAteneoR] = useState();
    const [corsiConsigliati, setCorsiConsigliati] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [infoPopup, setInfoPopup] = useState(false);
    const [thanks, setThanks] = useState(false);

    const isMobile = () => {
      return window.innerWidth <= 768;
    };

    const { degreeType, desiredDegree, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone
    , percorsoDiStudi, budgetOk, enrollmentTime, workStatus, studyTime, universityStatus, categories  } = useSearch();

    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: successJson,
    };
    const ateneo = location.state && location.state.ateneo;

    const [aperto, setAperto] = useState(true);
    const [aperto2, setAperto2] = useState(false);
    const [aperto3, setAperto3] = useState(false);

    const [apertoF, setApertoF] = useState(true);
    const [apertoF2, setApertoF2] = useState(false);
    const [apertoF3, setApertoF3] = useState(false);
    const [apertoF4, setApertoF4] = useState(false);
    const [apertoF5, setApertoF5] = useState(false);

    const toggleApertura = (number) => {
        if(number == 1) {
            setAperto(true);
            setAperto2(false);
            setAperto3(false);
        } else if (number == 2) {
            setAperto(false);
            setAperto2(true);
            setAperto3(false);
        } else {
            setAperto(false);
            setAperto2(false);
            setAperto3(true);
        }
    };

    const toggleAperturaFaq = (number) => {
      if(number == 1) {
          setApertoF(true);
          setApertoF2(false);
          setApertoF3(false);
          setApertoF4(false);
          setApertoF5(false);
      } else if (number == 2) {
          setApertoF(false);
          setApertoF2(true);
          setApertoF3(false);
          setApertoF4(false);
          setApertoF5(false);
      } else if (number == 3) {
          setApertoF(false);
          setApertoF2(false);
          setApertoF3(true);
          setApertoF4(false);
          setApertoF5(false);
      } else if (number == 4) {
          setApertoF(false);
          setApertoF2(false);
          setApertoF3(false);
          setApertoF4(true);
          setApertoF5(false);
      } else {
          setApertoF(false);
          setApertoF2(false);
          setApertoF3(false);
          setApertoF4(false);
          setApertoF5(true);
      }
  };

    const handleGoBack = () => {
        navigate(-1);
        navigate(`/universita/risultati`, { state: { showLoad: false } });
      };
    
      const navigateCorsoPage = (corso, ateneo) => {
        window.scrollTo(0, 0);

        const setSchedaCorsoCheck = (corsi, nomeCorso, operatore) => {
          const corsoFiltrato = corsi.find(
            (corso) => corso.nome === nomeCorso && corso["operatore 1"] === operatore
          );
        
          if (corsoFiltrato){
            setSchedaCorso(corsoFiltrato);
          } else {
            alert('Stiamo ancora aggiungendo il corso cliccato');
          }
          
        };
        setSchedaCorsoCheck(ArraySchede, corso, ateneo);
        const ateneoDaCercare = atenei.find((item) => item.ateneo === ateneo);
        setAteneoR(ateneoDaCercare);

        const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data))];
        const corsiConsigliati = shuffleArray(filteredCorsoNames).slice(0, 6);
        console.log(corsiConsigliati)
        setCorsiConsigliati(corsiConsigliati);
        const min = 30;
        const max = 60;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(random);
        navigate(`/universita/risultati/${corso}`, { state: { ateneo: ateneo, } });
      }

      function shuffleArray(array) {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
        }
        return shuffledArray;
      }

      useEffect(() => {
        const ateneo = location.state && location.state.ateneo;

        const setSchedaCorsoCheck = (corsi, nomeCorso, operatore) => {
          const corsoFiltrato = corsi.find(
            (corso) => corso.nome === nomeCorso && corso["operatore 1"] === operatore
          );
        console.log(ArraySchede);
        console.log(nomeCorso, operatore);
          setSchedaCorso(corsoFiltrato);
        };

        const generateRandomNumber = () => {
          const min = 30;
          const max = 60;
          const random = Math.floor(Math.random() * (max - min + 1)) + min;
          setRandomNumber(random);
          const ateneoDaCercare = atenei.find((item) => item.ateneo === ateneo);
          setAteneoR(ateneoDaCercare);

          const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data))];
          const corsiConsigliati = shuffleArray(filteredCorsoNames).slice(0, 6);
          console.log(corsiConsigliati)
          setCorsiConsigliati(corsiConsigliati);
          window.scrollTo(0, 0);
        }

        setSchedaCorsoCheck(ArraySchede, nomeCorso, ateneo);
        generateRandomNumber();
      }, []);

      const closePopup = () => {
        setTimeout(() => {
          setThanks(false);
          setInfoPopup(false);
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
              closePopup();
            } else {
              console.error("Errore nell'invio dei dati");
            }
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
      };

      const infoSara = async () => {
          const leadData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            saraClick: 'si',
          };
          console.log(leadData)
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
      }

  return (
    <>
    {schedaCorso ? (
    <div className='container-scheda-corso'>
            {infoPopup && (
        <div className='popup-shadows'>
          {thanks == true ? (
            <div className='popup-send'>
             <Lottie options={defaultOptions} width={300} height={300} />
           </div>  
          ) : (
            <div className='popup-send'>
              <p onClick={() => setInfoPopup(false)}><FaTimes /></p>
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
        {/*<div className='top-scheda-corso'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaArrowLeft color='white' onClick={handleGoBack} style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2>{nomeCorso + ' '+ ateneo} </h2>
            </div>
            {<div style={{ display: 'flex', alignItems: 'center' }}>
                <FaHeart color='white' style={{ marginRight: '20px', cursor: 'pointer' }} />
                <FaShare color='white' style={{ cursor: 'pointer' }} />
              </div>}
        </div>*/}
        <div className='intestazione'>
          <div className='image-logo-mobile'>
        {ateneo && ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
          </div>
          <div className='image-logo'>
        {ateneo && ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}             
        </div>
          <h1>{schedaCorso["H1"]}</h1>
        </div>
        <div className='title-scheda-corso'>
          <div className='tag-scheda-corso'>
            <div>
                <span>{schedaCorso["tag 1"]}</span>
                <span>{schedaCorso["tag 2"]}</span>
                <span>{schedaCorso["tag 3"]}</span>
                <span>{schedaCorso["tag 5"]}</span>
            </div>
          </div>                  
        </div>
        <div className='prezzocomparato-scheda-corso'>
            <h3>Prezzo comparato</h3>
            <div className='table'>
                <div className='top-table'>
                  <div>
                    <p>Operatori</p>
                  </div>
                  <div>
                    <p>Prezzo</p>
                  </div>
                </div>
                <div className='table-item'>
                  <div>
                    <p>{ateneo && ateneo}</p>
                  </div>
                  <div>
                    <p>{schedaCorso["prezzo 1"]}</p>
                  </div>
                </div>
                <div className='table-item'>
                  <div>
                    <p>Comparacorsi</p>
                  </div>
                  <div>
                    <button onClick={infoSara}>{schedaCorso["prezzo 2"]}</button>
                  </div>
                </div>
                <div className='table-item'>
                  <div>
                    <p>Altri operatori</p>
                  </div>
                  <div>
                    <p>{schedaCorso["prezzo 3"]}</p>
                  </div>
                </div>
            </div>
        </div>
        {/*<div className='image-logo-mobile2'>
        {isMobile() ? <img alt='logo trust' src={mobilereview} /> :
        ateneo && ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidavT} />
                          ) : ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegasoT} />
                          ) : ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettunoT} />
                          ) : ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimercT} />
                          ) : ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunatoT} />
                          ) : ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusanoT} />
                          ) : ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienzaT} />
                          ) : ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampusT} />
                          ) : ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconiT} />
                          ) : ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaeleT} />
                          ) : ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iulT} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}    
                        </div>*/}

        <hr className='line' />
        <div className='description-scheda-corso'>
            <h2>Descrizione corso</h2> 
            <p>{schedaCorso["Descrizione"]}</p>
        </div>
         <div className='pianodistudi-scheda-corso'>
            <h3>Piano di studi</h3>
            <div className={`pianodistudi-item ${aperto ? 'aperto' : ''}`}>
                <div className={`accordion-header ${aperto ? 'aperto-header' : ''}`} onClick={() => toggleApertura(1)}>
                    <span>1° Anno</span>
                    {aperto ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {aperto && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Piano di studi 1"]}</p>
                    </div>
                )}
            </div>
            <div className={`pianodistudi-item ${aperto2 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${aperto2 ? 'aperto-header' : ''}`} onClick={() => toggleApertura(2)}>
                    <span>2° Anno</span>
                    {aperto2 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {aperto2 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Piano di studi 2"]}</p>
                    </div>
                )}
            </div>
            {schedaCorso["Piano di studi 3"] && 
            <div className={`pianodistudi-item ${aperto3 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${aperto3 ? 'aperto-header' : ''}`} onClick={() => toggleApertura(3)}>
                    <span>3° Anno</span>
                    {aperto3 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {aperto3 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Piano di studi 3"]}</p>
                    </div>
                )}
            </div>}
         </div>

         <div className='recensioni-scheda-corso'>
            <h3>Cosa pensano gli utenti di <b>{ateneo && ateneo}</b></h3>
            {ateneo && ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidavT} />
                          ) : ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegasoT} />
                          ) : ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettunoT} />
                          ) : ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimercT} />
                          ) : ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunatoT} />
                          ) : ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusanoT} />
                          ) : ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienzaT} />
                          ) : ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampusT} />
                          ) : ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconiT} />
                          ) : ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaeleT} />
                          ) : ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iulT} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}                
        </div>
        <div className='slider-recensioni'>
            <ImmagineSlider />
        </div>

        <hr className='line' />

        <div className='mappa-scheda-corso'>
          <h2>Sedi dell'universita telematica <span>{ateneo && ateneo}</span></h2>
          <h3>{ateneoR?.sedi}</h3>
          {ateneo && ateneo === "Unidav" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1LMSNcvFCGYVGH9Ebm_uMrLao69iB9Lg&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Unipegaso" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1YWobQb9CtkfQSXVOfxhHHeUX7pJ74Eo&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Uninettuno" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1a97c2hn6wKwOfEgYSeiDetNVj_dbisQ&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Mercatorum" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1-IYpCpuai6UqvMrrzJ_pkVbgxjuKJDY&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Unifortunato" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1P431GL-3FaSca65yia_p-2wC7EvXRmo&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Unicusano" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1Rw_pGIK8_WkyNK8gml9ohX4B--bUWMk&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Unitelma" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=17eVoHHdPyLR_lxDUc-YA5VnChtaHX00&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "eCampus" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1EyzuB65JKTxaf17dh32-KJ7CvZFFkTM&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Unimarconi" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1b9K0xLN7xbFp8kWi0x_iVe9pMgaPyrM&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "San Raffaele" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1sJRl5M_U43HmO0etjUvUgR9-9f6mu34&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : ateneo === "Iul" ? (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1gUBDPRHm-JwKtgbWdgKHmnscMFJMHIA&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          ) : (
                            <iframe src="https://www.google.com/maps/d/embed?mid=1YWobQb9CtkfQSXVOfxhHHeUX7pJ74Eo&ehbc=2E312F" width="100%" height={!isMobile() ? "480" : "230"}></iframe>
                          )}  
        </div>


        <div className='pianodistudi-scheda-corso'>
            <h3>Domande frequenti</h3>
            <div className={`pianodistudi-item ${apertoF ? 'aperto' : ''}`}>
                <div className={`accordion-header ${apertoF ? 'aperto-header' : ''}`} onClick={() => toggleAperturaFaq(1)}>
                    <span>{schedaCorso["Domanda 1"]}</span>
                    {apertoF ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {apertoF && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Risposta 1"]}</p>
                    </div>
                )}
            </div>
            <div className={`pianodistudi-item ${apertoF2 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${apertoF2 ? 'aperto-header' : ''}`} onClick={() => toggleAperturaFaq(2)}>
                    <span>{schedaCorso["Domanda 2"]}</span>
                    {apertoF2 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {apertoF2 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Risposta 2"]}</p>
                    </div>
                )}
            </div>
            <div className={`pianodistudi-item ${apertoF3 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${apertoF3 ? 'aperto-header' : ''}`} onClick={() => toggleAperturaFaq(3)}>
                    <span>{schedaCorso["Domanda 3"]}</span>
                    {apertoF3 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {apertoF3 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Risposta 3"]}</p>
                    </div>
                )}
            </div>
            <div className={`pianodistudi-item ${apertoF4 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${apertoF4 ? 'aperto-header' : ''}`} onClick={() => toggleAperturaFaq(4)}>
                    <span>{schedaCorso["Domanda 4"]}</span>
                    {apertoF4 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {apertoF4 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Risposta 4"]}</p>
                    </div>
                )}
            </div>
            <div className={`pianodistudi-item ${apertoF5 ? 'aperto' : ''}`}>
                <div className={`accordion-header ${apertoF5 ? 'aperto-header' : ''}`} onClick={() => toggleAperturaFaq(5)}>
                    <span>{schedaCorso["Domanda 5"]}</span>
                    {apertoF5 ? svgPianoStudi && <img src={svgPianoStudi} alt="Icona" /> : <img src={closePianoStudi} className='closesvg' />}
                </div>
                {apertoF5 && (
                    <div className='accordion-content'>
                    <p>{schedaCorso["Risposta 5"]}</p>
                    </div>
                )}
            </div>
         </div>

         <div className='dopo-scheda-corso'>
            <h3>Come funziona dopo l'iscrizione?</h3>
            <p>Dopo l'iscrizione all'università {ateneo && ateneo}, gli studenti hanno accesso a:</p>
            <div className='dopo-item'>
                <div>
                  <img src={dopoImg} alt="dopo"/>
                  <p>{ateneoR?.dopo1}</p>
                </div>
                <div>
                  <img src={dopoImg} alt="dopo"/>
                  <p>{ateneoR?.dopo2}</p>
                </div>
                <div>
                  <img src={dopoImg} alt="dopo"/>
                  <p>{ateneoR?.dopo3}</p>
                </div>
                <div>
                  <img src={dopoImg} alt="dopo"/>
                  <p>{ateneoR?.dopo4}</p>
                </div>
                <div>
                  <img src={dopoImg} alt="dopo"/>
                  <p>{ateneoR?.dopo5}</p>
                </div>
                {ateneoR?.dopo6 ? (
                  <div>
                    <img src={dopoImg} alt="dopo"/>
                    <p>{ateneoR?.dopo1}</p>
                  </div>
                ) : null}
            </div>
         </div>


         <div className='servizi-scheda-corso'>
              <h3>Servizi</h3>
              <div className='servizi'>
                  <div>
                    <img src={servizio1} />
                    <p>Servizi di tutoraggio</p>
                  </div>
                  <div>
                    <img src={servizio2} />
                    <p>Materiali disponibili 24/24h</p>
                  </div>
              </div>
              <div className='servizi'>
                  <div>
                    <img src={servizio3} />
                    <p>{ateneoR?.servizio3}</p>
                  </div>
                  <div>
                    <img src={servizio4} />
                    <p>Iscrizione online</p>
                  </div>
              </div>
         </div>

         <div className='info-scheda-corso'>
          <h3>Sbocchi lavorativi</h3>
          <div className='sbocchi-div'>
            {schedaCorso["Sbocchi"] && schedaCorso["Sbocchi"].map((item, index) => (
             <p key={index}>
              <img src={sbocchi} />
              <span>{item}</span>
            </p>              
            ))}

          </div>
         </div>

         <hr className='line' />

         <div className='info-scheda-corso'>
          <h3>Informazioni sull'ateneo <img src={info} /></h3>
          <p>{ateneoR?.info}</p>
         </div>

         <div className='prezzocomparato-scheda-corso'>
          <h3 style={{marginBottom: '20px'}}>Potrebbe interessarti anche</h3>
          <div className='table'>
                <div className='top-table-consigliati'>
                  <div>
                    <p>Corso di laurea</p>
                  </div>
                  <div>
                    <div>
                      <p>Ateneo</p> 
                    </div>
                    <div>
                      <p>Costo</p>  
                    </div>    
                  </div>
                </div>
                {corsiConsigliati && corsiConsigliati.map((corso) => (
                  <div className='table-item-consigliati' key={corso["Corsi di laurea + (non lo so)"]}>
                    <div>
                      <p onClick={() => navigateCorsoPage(corso["Corsi di laurea + (non lo so)"], corso.Ateneo)}>{corso["Corsi di laurea + (non lo so)"]}</p>
                    </div>
                    <div>
                      <div>
                        <p>{corso.Ateneo}</p>  
                      </div>
                      <div>
                        <p>{corso['Costo ']}</p>   
                      </div>    
                    </div>
                  </div>                  
                ))}
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
         {/*<div className='bottom-fix'>
            <img src={logoSpin} />
            <div>
              <button onClick={infoSara}>Richiedi info</button>
            </div>
         </div>*/}
    </div>      
    ) : (
    <div className='loader-container'>
      <div className="loader"></div>
    </div>
    )}
   </>
  )
}

export default SchedaCorso


const ImmagineSlider = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
    const immagini = [
      slide1,
      slide2,
      slide3,
      slide1,
      slide2,
      slide3,
    ];
  
    const sliderSettings = {
      infinite: true,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      dots: true,
      appendDots: (dots) => (
        <ul style={{ bottom: '-30px' }}>{dots}</ul>
      ),
    };
  
    return (
        <Slider {...sliderSettings}>
          {immagini.map((immagine, index) => (
            <div key={index}>
              <img src={immagine} alt={`Immagine ${index + 1}`} />
            </div>
          ))}
        </Slider>
    );
  };