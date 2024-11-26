
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect, useContext } from 'react';
import ComparatoreLeadSystem from './pages/ComparatoreLeadSystem';
import Header from './components/Header';
import Risultati from './pages/Risultati';
import Footer from './components/Footer';
import Home from './pages/Home';
import ComparatoreTech from './pages/ComparatoreTech';
import RisultatiTech from './pages/RisultatiTech';
import ComparatoreTestB from './pages/testb/ComparatoreTestB';
import TestB from './pages/testb/TestB';
import TestC from './pages/testc/TestC';
import ComparatoreTestC from './pages/testc/ComparatoreTestC';
import SchedaCorso from './pages/SchedaCorso';
import LandingAmbassador from './pages/mgm/LandingAmbassador';
import LandingInvitato from './pages/mgm/LandingInvitato';
import { useState } from 'react';
import ParlaConSara from './pages/sara/ParlaConSara';
import ThanksSara from './pages/sara/ThanksSara';
import { useSearch } from './context/SearchContext';
import PrenotaEmail from './pages/sara/PrenotaEmail';

function App() {
  const [showFooter, setShowFooter] = useState(true);
  const { degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, 
    budget, setBudget, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone, enrollmentTime,
    setEnrollmentTime, universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories,
    setCategories, origBudget, setOrigBudget, origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest
  , rangeMax, setRangeMax } = useSearch();
  const storedLead = localStorage.getItem('lead');
  useEffect(() => {
    if (storedLead !== null) {
      const leadData = JSON.parse(storedLead);
      setFirstName(leadData.firstName);
      setLastName(leadData.lastName);
      setEmail(leadData.email);
      setPhone(leadData.phone);
      setBudget(leadData.budget);
      setCategories(leadData.categories);
      setEnrollmentTime(leadData.enrollmentTime);
      setDesiredDegree(leadData.corsoDiLaurea);
      setDegreeType(leadData.tipologiaCorso);
      setSubjectOfInterest(leadData.facolta);
      setUniversityStatus(leadData.universita);
      setWorkStatus(leadData.lavoro);
    } else {
      console.log("Nessun dato lead trovato in localStorage.");
    }
  }, [])


  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universita" element={<ComparatoreLeadSystem />} />
          <Route path="/universita/risultati" element={<Risultati />} />
          {/*<Route path="/universitaB" element={<ComparatoreTestB />} />*/}
          {/*<Route path="/universitaB/risultati" element={<TestB />} />*/}
          {/*<Route path="/universitaC" element={<ComparatoreTestC />} />*/}
          {/*<Route path="/universitaC/risultati" element={<TestC />} />*/}
          <Route path="/digital-tech" element={<ComparatoreTech />} />
          <Route path="/digital-tech/risultati" element={<RisultatiTech />} />
          <Route path="/parla-con-sara" element={<ParlaConSara />} />
          <Route path="/parla-con-sara/thanks" element={<ThanksSara />} />
          <Route path="/universita/risultati/:nomeCorso" element={<SchedaCorso />} />
          <Route path="/mgm/:name/:code" element={<LandingInvitato setShowFooter={setShowFooter} />} />
          <Route path="/mgm/landing-ambassador" element={<LandingAmbassador />} />
          <Route path="/prenota" element={<PrenotaEmail />} />
        </Routes>
        {showFooter && <Footer />}
    </Router>
  );
}

export default App;
