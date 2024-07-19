import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Affirmation.module.scss';

const CreateList = () => {
  const navigate = useNavigate();
  const [currentAffirmation, setCurrentAffirmation] = useState("");

  const affirmations = [
    "You got this!",
    "Keep pushing!",
    "Believe in yourself!",
    "You are unstoppable!",
    "Stay positive!",
    "Dream big!",
    "You are amazing!",
    "Keep going because you are doing great!",
    "You've got strength!",
    "Stay focused!",
    "You can do it!",
    "Keep moving forward!",
    "You are enough!",
    "Embrace the journey!",
    "You are resilient!",
    "Make it happen!",
    "Keep growing!",
    "Trust yourself!",
    "You are powerful!",
    "You TEACH people this shit!",
    "You boss famous people around for a living!",
    "Enjoy this!",
    "Take four deep breaths!",
    "Close your eyes and remember why you're here!",
    "You are literally great at your job!",
    "Take it one minute at a time!",
    "Achieving your dreams!"
  ];

  useEffect(() => {
    randomAffirmation();
  }, []);


  const randomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className={styles.affirmContainer}>
      <button onClick={() => navigate("/")}>Back</button>
      
      <div className={styles.affirmationText}>{currentAffirmation}</div>
      <button className={styles.button} onClick={randomAffirmation}>Tell me more?</button>
    </div>
  );
};

export default CreateList;
