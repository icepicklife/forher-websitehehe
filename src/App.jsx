import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noBtnPosition, setNoBtnPosition] = useState({position: "static"});

  const yesBtnRef = useRef(null);

  const phrases = [
    "no :(",
    "sure ka na dyan?",
    "sure na sureee?",
    "sige naaaa",
    "pleaasseee 🥺",
    "di ka madidiligan nyan sige ka",
    "ayaw mo ba sakin 😔",
    "di mo na ba ako type :((",
    "ay grabe harsh mo naman",
    "sakit mo naman huhu",
    "wala na bang chance final na yan? 💔",
    "di ako papayag hmph",
    "hala",
    "huy",
    "single ka naman diba",
    "quickie lang oh kain lang sa labas :<",
    "BAKIT BA HUHU",
    "iiyak na ko dito oh 🥲",
    "himlay nalang sa sakit sau 😔"
  ]

  useEffect(() => {

    if (step === 4) {

      document.body.style.backgroundColor = '#ffe4f7'

      const scalar = 6;
      const rose = confetti.shapeFromText({ text: '🌹', scalar });
      const cherry = confetti.shapeFromText({ text: '🌸', scalar });

      const defaults = {
        spread: 360,
        ticks: 60,
        gravity: 0,
        decay: 0.96,
        startVelocity: 20,
        shapes: [rose, cherry],
        scalar: scalar,
      };

      const interval = setInterval(() => {

        const randomX = Math.random();

        confetti({
          ...defaults,
          particleCount: 100, 
          origin: { x: randomX * 0.5, y: 0 } // Random spot on left half
        });

        // Burst 2: Right side area (Fills the screen faster!)
        confetti({
          ...defaults,
          particleCount: 100, 
          origin: { x: 0.5 + randomX * 0.5, y: 0 } // Random spot on right half
        });
        
        // Extra filler confetti (small circles)
        confetti({
          ...defaults,
          particleCount: 50,
          scalar: 1, 
          shapes: ['circle']
        });

      }, 500); 

      return () => {
        clearInterval(interval),
        document.body.style.backgroundColor = '#f9f9f9';
      };
    }
  }, [step]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleNoClick = () => {

    if (!yesBtnRef.current) return;

    setNoCount(noCount + 1);

    // 3. Get the EXACT position and size of the YES button right now
    const yesRect = yesBtnRef.current.getBoundingClientRect();
    
    // Assume the No button is roughly this size (add a buffer to be safe)
    const noBtnWidth = 150;
    const noBtnHeight = 50;

    let newX, newY;
    let isOverlapping = true;
    let attempts = 0;

    // 4. Keep looking for a spot until we find one that DOESN'T overlap
    while (isOverlapping && attempts < 100) {
      newX = Math.random() * (window.innerWidth - noBtnWidth);
      newY = Math.random() * (window.innerHeight - noBtnHeight);

      // Define the "Forbidden Zone" (Yes Button + a 20px gap)
      const buffer = 20;
      const forbiddenLeft = yesRect.left - buffer - noBtnWidth;
      const forbiddenRight = yesRect.right + buffer;
      const forbiddenTop = yesRect.top - buffer - noBtnHeight;
      const forbiddenBottom = yesRect.bottom + buffer;

      // Check if our new spot is inside the forbidden zone
      if (
        newX > forbiddenLeft &&
        newX < forbiddenRight &&
        newY > forbiddenTop &&
        newY < forbiddenBottom
      ) {
        // It overlaps, try again
        isOverlapping = true;
      } else {
        // It's safe!
        isOverlapping = false;
      }
      attempts++;
    }
    setNoBtnPosition({ position: "absolute", top: `${newY}px`, left: `${newX}px` });
  };

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };


  return (
    <>
      <div className="container">
        {/* Frame 1*/}
        {step === 0 && (
          <>
            <h1>HEEYYY ;)</h1>
            <button className="btn" onClick={handleNext}>hiii &gt;</button>
          </>
        )}

        {/* Frame 2*/}
        {step === 1 && (
          <>
            <h1>Cute mo <br/> naman miss</h1>
            <button className="btn" onClick={handleNext}>hihi thank you &gt;</button>
          </>
        )}

        {/* Frame 3*/}
        {step === 2 && (
          <>
            <h1>Dahil dyan, <br/> May tanong ako :&gt;</h1>
            <button className="btn" onClick={handleNext}>ano yan ha &gt;</button>
          </>
        )}

        {/* Frame 4*/}
        {step === 3 && (
          <>
            <div style={{ fontSize: '4rem' }}>💐</div>
          <h1>Paege, Will U be my <br/> valentine ?</h1>
          <div style={{ fontSize: '3rem' }}>🥺</div>

          <div className="buttons-container">
            <button
              className="btn btn-pink"
              style={noBtnPosition} 
              onClick={handleNoClick}
              onMouseOver={handleNoClick}
            >
              {noCount === 0 ? "no :(" : getNoButtonText()} &gt;
            </button>

            <button
              ref={yesBtnRef} // <--- 5. Attach the ref here so we can measure it!
              className="btn btn-pink"
              style={{ fontSize: `${noCount * 20 + 16}px` }}
              onClick={handleNext}
            >
              yess! &gt;
              </button>  
            </div>
          </>
        )}
        {/* Frame 5*/}
        {step === 4 && (
          <>
            <div style={{ fontSize: '4rem'}}>💗</div>
            <h1>YAAYYYY</h1>
            <h1>THANK U</h1>
            <h1>I GET TO B UR MAN <br/> SEE UU MWA !!</h1>
            <div style={{ fontSize: '4rem' }}>🥰</div>
          </>
        )}
      </div>
    </>
  );
}

export default App
