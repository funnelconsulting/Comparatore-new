import React from 'react'
import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
        <h1 className='h1-comp'>Il tuo portale di riferimento per corsi e le Università Telematiche in Italia.</h1>
        <h2 className='h2-comp'>Iscriviti tramite noi al prezzo più basso garantito.</h2>   
        <p>
        In un'era sempre più digitalizzata, l'educazione e la formazione professionale seguono il ritmo delle innovazioni tecnologiche, proponendo una vasta gamma di opzioni online. Ecco dove entra in gioco Comparacorsi. Questa piattaforma nasce con lo specifico obiettivo di fungere da bussola per tutti gli studenti e i professionisti in cerca di formazione. L'intento è semplice, ma fondamentale: confrontare i corsi online offerti da svariati enti formativi, dalle academy alle università telematiche, in modo da garantire una scelta informata, consapevole e, soprattutto, personalizzata alle esigenze di ciascuno. Ciò permette di risparmiare non solo denaro, ma anche tempo prezioso nella ricerca del percorso formativo ideale. <br /><br />
Al fine di semplificare ulteriormente la tua ricerca, Comparacorsi mette a disposizione ben tre specifici comparatori:<br /><br />
1) Università: analizza e mette a confronto tutte le lauree triennali, magistrali e i master erogati dalle università telematiche, offrendo una panoramica completa delle opzioni accademiche a tua disposizione.<br />
2) Corsi tech: si focalizza sul mondo tecnologico, confrontando i corsi delle migliori academy nel settore. Un'opzione ideale per chi è alla ricerca di competenze aggiornate in ambito tech. <br />
3) Corsi professionalizzanti: pensato per chi mira a una formazione specialistica, questo strumento confronta le scuole che erogano corsi online di preparazione all'esame di stato per avvocatura, magistratura e notariato. <br /><br />
Affidati a Comparacorsi e trova il tuo percorso formativo ideale, senza sorprese e con la sicurezza di avere sempre il prezzo più conveniente!
        </p>
        <div className='cta-home'>
            <div className='cta-item'>
                <a href='/universita'>Università telematiche</a>
            </div>
            <div className='cta-item'>
                <a href='/digital-tech'>Corsi Digital Tech</a>
            </div>
            <div className='cta-item'>
                <a href='https://www.comparacorsi.it/corsi-magistratura/'>Corsi professionalizzanti</a>
            </div>
        </div>  
    </div>
  )
}

export default Home