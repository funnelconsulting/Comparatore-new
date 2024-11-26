import React, { createContext, useContext, useState } from 'react';

const SearchContextDT = createContext();

export function useSearchDT() {
  return useContext(SearchContextDT);
}

export function SearchProviderDT({ children }) {
  const [areaTech, setAreaTech] = useState('');
  const [corsoTech, setCorsoTech] = useState('');
  const [budgetTech, setBudjetTech] = useState('');
  const [timeTech, setTimeTech] = useState('');
  const [workStatusTech, setWorkStatusTech] = useState('');
  const [livelloCompetenze, setLivelloCompetenze] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <SearchContextDT.Provider 
    value={{ areaTech, setAreaTech, corsoTech, setCorsoTech, budgetTech, setBudjetTech, timeTech, setTimeTech,
      workStatusTech, setWorkStatusTech, livelloCompetenze, setLivelloCompetenze, firstName, setFirstName, lastName, setLastName, phone, setPhone, email, setEmail }}>
      {children}
    </SearchContextDT.Provider>
  );
}