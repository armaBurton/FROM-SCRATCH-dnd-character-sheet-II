import React from 'react';
import { useState, useEffect } from 'react';
import style from './Form.css';
import { useCharacter } from '../../context/CharacterContext';
import { useForm } from '../../hooks/useForm';
import { useUserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function CharacterForm() {
  const { user } = useUserContext();
  const { character, setCharacter, handleCreateNewCharacter } = useCharacter();

  const history = useHistory();

  const { formState, handleChange } = useForm({
    characterName: '',
    characterClass: 'Monk',
    characterRace: 'Human',
    characterAlignment: 'Lawful Good',
  });

  const [stats, setStats] = useState(statObj);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('formState', formState)
    const newCharacter = {
      user_id: user.id,
      name: formState.characterName,
      class: formState.characterClass,
      race: formState.characterRace,
      alignment: formState.characterAlignment,
      xp: 0,
      ac: 0,
      hp: 0,
      level: 1,
      stats: stats,
    };
    
    await handleCreateNewCharacter({ ...newCharacter });
    history.replace('/characters');
  }

  const statObj = {
    str: '',
    dex: '',
    con: '',
    int: '',
    wis: '',
    cha: '',
  };

  function roll3d6() {
    const d1 = Math.ceil(Math.random() * 6);
    const d2 = Math.ceil(Math.random() * 6);
    const d3 = Math.ceil(Math.random() * 6);
    const stat = d1 + d2 + d3;
    return stat;
  }

  function rollStats() {
    statObj.str = roll3d6();
    statObj.dex = roll3d6();
    statObj.con = roll3d6();
    statObj.int = roll3d6();
    statObj.wis = roll3d6();
    statObj.cha = roll3d6();
    setStats(statObj);
  }

  useEffect(() => {
    rollStats();
  }, []);

  return (
    <section className={style.sectionForm}>
      <h2>New Character Form</h2>
      <form onSubmit={handleSubmit} className={style.characterForm}>
        <div>
          <label htmlFor="characterName">Character Name</label>
          <input
            name="characterName"
            value={formState.characterName || ''}
            type="text"
            id="characterName"
            onChange={handleChange}
          />
        </div>
        <div className={style.flexColumn}>
          <label htmlFor="characterClass">Character Class</label>
          <select
            name="characterClass"
            id="characterClass"
            onChange={(e) => handleChange(e)}
          >
            <option value="Monk">Monk</option>
            <option value="Knight">Knight</option>
          </select>
        </div>
        <div className={style.flexColumn}>
          <label htmlFor="characterRace">Character Race</label>
          <select 
            name="characterRace" 
            id="characterRace"
            onChange={(e) => handleChange(e)}
          >
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Half-Elf">Half Elf</option>
          </select>
        </div>
        <div className={style.flexColumn}>
          <label htmlFor="characterAlignment">Character Alignment</label>
          <select 
            name="characterAlignment" 
            id="characterAlignment"
            onChange={(e) => handleChange(e)}
            >
            <option value="Lawful-Good">Lawful Good</option>
            <option value="Neutral-Good">Neutral Good</option>
            <option value="Chaotic-Good">Chaotic Good</option>
          </select>
        </div>
        <section className={style.statSection}>
          <p>Str: {stats?.str}</p>
          <p>Dex: {stats?.dex}</p>
          <p>Con: {stats?.con}</p>
          <p>Int: {stats?.int}</p>
          <p>Wis: {stats?.wis}</p>
          <p>Cha: {stats?.cha}</p>
        </section>
        <button type='submit'>Create Character</button>
      </form>
        <button onClick={rollStats}>Reroll Stats</button>
    </section>
  );
}
