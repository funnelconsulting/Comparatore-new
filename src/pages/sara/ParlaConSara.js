import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import sara from '../../imgs/sara.png'
import stella from '../../imgs/stella.png'
import review from '../../imgs/review.png'
import check from '../../imgs/check.png'
import chiama from '../../imgs/chiama.png'
import comp2 from '../../imgs/comp2.png';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa'
import './parlaConSara.css'
import { useSearch } from '../../context/SearchContext'
import axios from 'axios'
import StepProgress from '../../components/StepProgress'
import backsara from '../../imgs/saraback.png'
import conosciamo from '../../imgs/ori.png'
import orario from '../../imgs/orario.png'
import saramobile from '../../imgs/saramobile.png'

const ParlaConSara = () => {
  //window.scrollTo(0, 0);
  const { lastName, firstName, email, phone } = useSearch();
  const navigate = useNavigate()
  const [giorni, setGiorni] = useState([]);
  const [daySelected, setDaySelected] = useState();
  const [ora, setOra] = useState('09');
  const [minuto, setMinuto] = useState('00'); 
  const oggi = new Date();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const setAppData = (data, orario) => {
    const partiData = data.split("/");

    const giorno = parseInt(partiData[0], 10);
    const mese = parseInt(partiData[1], 10);
    const anno = parseInt(partiData[2], 10);

    const annoFormattato = anno.toString().slice(-2);
    const meseFormattato = mese.toString().padStart(2, '0');
    const giornoFormattato = giorno.toString().padStart(2, '0');

    const dataOraFinale = `${annoFormattato}-${meseFormattato}-${giornoFormattato} ${orario}`;
    return dataOraFinale;
  }
    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    const [startIndex, setStartIndex] = useState(0);
    const giorniPerPagina = isMobile() ? 5 : 7; // Mostra 3 giorni su mobile, 7 su desktop

    const handleNext = () => {
      if (startIndex + giorniPerPagina < giorni.length) {
        setStartIndex(startIndex + giorniPerPagina);
      }
    };
    
    const handlePrev = () => {
      if (startIndex - giorniPerPagina >= 0) {
        setStartIndex(startIndex - giorniPerPagina);
      }
    };
    
    const nomeGiorno = (d) => {
        const giorniSettimana = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        return giorniSettimana[d.getDay()];
      };
    useEffect(() => {
        const prossimiGiorni = [];
        const formatter = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'numeric', year: 'numeric' });
        for (let i = 0; i < 7; i++) {
          const dataGiorno = new Date(oggi);
          dataGiorno.setDate(oggi.getDate() + i);
          const dataFormattata = formatter.format(dataGiorno); // Formatta la data GG/MM/YYYY

          prossimiGiorni.push({
            nome: nomeGiorno(dataGiorno),
            numero: dataGiorno.getDate(),
            dataFormattata: dataFormattata,
            oggi: i === 0,
            weekend: dataGiorno.getDay() === 6 || dataGiorno.getDay() === 0
          });
        }
        setDaySelected(prossimiGiorni[0])
        setGiorni(prossimiGiorni);
      }, []);
      console.log(daySelected)
      const handleSchedule = async () => {
        const orario = `${ora}:${minuto}`;
        const data = daySelected.dataFormattata;
        const appData = setAppData(data, orario)
        const leadData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          appointment_date: appData,
          provenienzaApp: "comparatore",
        };
        console.log(leadData)
        try {
          //https://servercpchatbot.up.railway.app/api/setAppComparacorsi
          //http://localhost:8000/api/setAppComparacorsi
          const response = await axios.post('https://servercpchatbot.up.railway.app/api/setAppComparacorsi', leadData);
          console.log(response.data);
          navigate(`/parla-con-sara/thanks?orario=${orario}&giorno=${data}`)
        } catch (error) {
          console.error(error)
        }
      }

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
  return (
    <div className='risultati'>
      <div>
        {/*<div className='comparatore-top not-sticky'>
            <div style={isMobile() ? {width: '100%'} : null}>
                {!isMobile() && <FaGraduationCap />}
                <h2 style={isMobile() ? {fontSize: '16px', fontWeight: '400', width: '90%'} : null}><b>Parla con Sara</b> gratuitamente per ricevere tutte le informazioni di cui hai bisogno.</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp2} />
            </div>
        </div>*/}
        <div className='comparatore-top-new not-sticky'>
          <StepProgress step={3} />
        </div>
        <div className='sara-top-new'>
          <h1 className='h1-tit'>Sei a un passo dal futuro che <font color='#F37E0E'>desideri</font></h1>
          <h4 className='h1-comp'>Il tuo <font color='#F37E0E'>orientatore </font>
              è qui per ascoltarti e supportarti per tutta la durata del tuo percorso,
              <font color='#F37E0E'> sempre gratuitamente.</font></h4>
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
        <div className='sara-middle' id='call'>
            {/*<p>Orientatrice universitaria dal 2016, ho guidato oltre 3.000 persone verso l'università ideale, personalizzando ogni percorso accademico.</p>
            <hr />*/}
            <h2>Prenota una <font color='#F37E0E'>call</font></h2>
            <h4>Seleziona il giorno</h4>
            <div className='giorni-container'>
              {giorni.slice(startIndex, startIndex + giorniPerPagina).map((giorno, index) => {
                const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
                const meseNome = mesi[parseInt(giorno.dataFormattata.split('/')[1], 10) - 1]; // Ottieni il nome del mese
                return (
                  <div onClick={giorno.weekend ? null : () => setDaySelected(giorno)} key={index} className={`${daySelected?.nome === giorno.nome ? 'oggi' : ''} ${giorno.weekend ? 'weekend' : ''}`}>
                    <div>{giorno.numero}</div>
                    <div>
                      <div>{giorno.nome}</div>
                      {isMobile() ? <div>{meseNome + ' ' + giorno.dataFormattata.split('/')[2]}</div> :
                      (
                        <>
                        <div>{meseNome}</div>
                        <div>{giorno.dataFormattata.split('/')[2]}</div>                        
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='hour-container'>
              <img src={orario} alt='seleziona un orario' />
              <h4>Seleziona un <font color='#F37E0E'> orario</font></h4>
              <div className='select-orario'>
                <select value={ora} onChange={(e) => setOra(e.target.value)}>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                </select>
                <p>:</p>
                <select value={minuto} onChange={(e) => setMinuto(e.target.value)}>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
              </div>
            </div>
            <div className='cta-sara'>
                <p>Durata <font color='#FF6600'>15 minuti</font> | 100% gratuita | 100% di studenti soddisfatti </p>
                <button id='btn-book-call-2' className='book-call-btn' onClick={handleSchedule}>Prenota una call</button>
                {/*<hr />
                <p>Oppure</p>
                <button onClick={whatsClick}>Scrivile su Whatsapp</button>*/}
            </div>
           
            <div style={{ maxWidth: '1200px', margin: '50px auto 100px auto', paddingLeft: '16px', paddingRight: '16px' }}>
              <div class="trustpilot-widget" data-locale="it-IT" data-template-id="54ad5defc6454f065c28af8b" data-businessunit-id="64b965467cc49ff7fef5cd54" data-style-height="240px" data-style-width="100%" data-stars="4,5" data-review-languages="it">
              </div>
            </div>

            <div className='sara-img'>
              <img src={isMobile() ? saramobile : backsara} alt='parla con orientatore' />
            </div>
            <div className='conosciamo-sara'>
              <img src={conosciamo} />
              <h1 className='h1-tit'>Conosciamo personalmente i nostri <font color='#F37E0E'>orientatori</font></h1>
              <h4 className='h1-comp'>
              Da sempre al fianco degli <font color='#F37E0E'>studenti </font>
              nella scelta dell'università.
              </h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ParlaConSara