import React, {useState, useEffect} from 'react'
import sara from '../../imgs/sara.png'
import stella from '../../imgs/stella.png'
import logo from '../../imgs/logospin.png'
import review from '../../imgs/review.png'
import { useLocation } from 'react-router-dom';
import comp2 from '../../imgs/comp2.png';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa'
import { useSearch } from '../../context/SearchContext';
import StepProgress from '../../components/StepProgress'

const ThanksSara = () => {
    window.scrollTo(0, 0);
    const { lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone } = useSearch();
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const giorno = searchParams.get("giorno")
    const orario = searchParams.get("orario")
    const isMobile = () => {
        return window.innerWidth <= 768;
    };
  return (
    <div className='risultati'>
       <div className='thanks-cont'>
        {/*<div className='comparatore-top not-sticky'>
                <div style={isMobile() ? {width: '100%'} : null}>
                    {!isMobile() && <FaGraduationCap />}
                    <h2 style={isMobile() ? {fontSize: '16px', fontWeight: '400', width: '90%'} : null}>La tua call è stata fissata!</h2>
                </div>
                <div>
                    <img alt='sequenza comparatore' src={comp2} />
                </div>
        </div>*/}
        <div className='comparatore-top-new not-sticky'>
            <StepProgress step={3} />
        </div>
        <div className='sara-top-new'>
          <h1 className='h1-tit'>Grazie</h1>
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
        {/*<p>Grazie <i style={{fontWeight: '500'}}>{firstName ? firstName : ''}</i>!</p>*/}
        <div className='recap-sara'>
            <p>Riceverai una chiamata da Sara in <b style={{fontWeight: '500'}}>data:</b></p>
            <div><p>{giorno && giorno}</p></div>
            <p style={{fontWeight: '500'}}>Alle ore</p>
            <div><p>{orario && orario}</p></div>
        </div>
        <div className='sara-bottom'>
            <img alt='logo' src={logo} />
            <p>ti abbiamo appena inviato un <font color='#FF6600'>Reminder per email.</font></p>
        </div>
       </div> 
    </div>
  )
}

export default ThanksSara