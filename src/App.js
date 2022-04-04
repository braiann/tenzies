import './App.css';
import Die from './Die';
import React from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(() => {
      if (dice.every(die => die.isHeld && die.value === dice[0].value)) {
        setTenzies(true)
        console.log('Ganaste!')
      }
    }, [dice]
  )

  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
          id: nanoid(),
          value: Math.round(Math.random() * 5) + 1,
          isHeld: false,
        })
    }
    return newDice
  }

  function rollDice() {
    setDice(prevDice => 
      dice.map(die => {
        if (die.isHeld) {
          return die
        }
        return {
          ...die,
          value: Math.round(Math.random() * 5) + 1,
          id: nanoid(),
        }
      })
    )
    setRolls(prev => prev + 1)
  }

  function holdDice(id) {
    setDice(prevDice => 
      prevDice.map(die => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          }
        }
        return die
      })
    )
  }

  function newGame() {
    setTenzies(false)
    setDice(allNewDice)
    setRolls(0)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <p>Tira los dados hasta que todos tengan el mismo valor. Toca un dado para congelar su valor.</p>
      <div className='dice'>
        {dice.map(die =>
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        )}
      </div>
      <p className='rolls'>Tiradas: {rolls}</p>
      <button onClick={tenzies ? newGame : rollDice}>
        {tenzies ? 'Nuevo juego' : 'Tirar'}
      </button>
    </main>
  );
}

export default App;
