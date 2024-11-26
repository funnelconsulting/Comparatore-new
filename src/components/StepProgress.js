import React, { useState } from "react";
import './stepProgress.css'; // Collega qui il tuo CSS
import step1 from '../imgs/step1.png';
import step2 from '../imgs/step2.png';
import step3 from '../imgs/step3.png';
import step1D from '../imgs/step1desktop.png';
import step2D from '../imgs/step2desktop.png';
import step3D from '../imgs/step3desktop.png';

/*const StepProgress = () => {
  const [step, setStep] = useState(1); // Inizia dal primo step

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div>
      <div className="progress-container2">
        <div className="progress-labels2">
          <span className={`progress-label2 ${step >= 1 ? "active-label" : ""}`}>
            COMPILA
          </span>
          <span className={`progress-label2 ${step >= 2 ? "active-label" : ""}`}>
            CONFRONTA
          </span>
          <span className={`progress-label2 ${step >= 3 ? "active-label" : ""}`}>
            CONOSCI IL TUO <br /> ORIENTATORE
          </span>
        </div>

        <div className="progress-bar-container">
          <div className={`progress-item ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
          </div>
          <div className={`progress-bar ${step >= 2 ? "fill" : ""}`}></div>
          <div className={`progress-item ${step >= 2 ? "active" : ""}`}>
            <span>2</span>
          </div>
          <div className={`progress-bar ${step >= 3 ? "fill" : ""}`}></div>
          <div className={`progress-item ${step >= 3 ? "active" : ""}`}>
            <span>3</span>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleNextStep}>Avanza allo step {step + 1}</button>
      </div>
    </div>
  );
};*/

const StepProgress = ({ step }) => {
  const isMobile = () => {
    return window.innerWidth <= 768;
  };
    return (
      <div className="step-container">
        {step === 1 ? (
            <img src={isMobile() ? step1 : step1D} alt="step 1 comparatore" />
        ) : step === 2 ? (
            <img src={isMobile() ? step2 : step2D} alt="step 2 comparatore" />
        ) : (
            <img src={isMobile() ? step3 : step3D} alt="step 3 comparatore" />
        )}
      </div>
    );
  };

export default StepProgress;