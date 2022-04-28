import { useState } from "react"
const useWorlde = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess,setCurrentGuess ] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history,setHistory] = useState([]);
    const [isCorrect,setIsCorrect] = useState(false);

    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
          return {key: l, color: 'grey'}
        })
    
        // find any green letters
        formattedGuess.forEach((l, i) => {
          if (solution[i] === l.key) {
            formattedGuess[i].color = 'green'
            solutionArray[i] = null
          }
        })
        
        // find any yellow letters
        formattedGuess.forEach((l, i) => {
          if (solutionArray.includes(l.key) && l.color !== 'green') {
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(l.key)] = null
          }
        })
        //console.log(solutionArray)
        //console.log(formattedGuess)
        return formattedGuess
      }
    
      // add a new guess to the guesses state
      // update the isCorrect state if the guess is correct
      // add one to the turn state
      const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
          setIsCorrect(true)
        }
        setGuesses(prevGuesses => {
          let newGuesses = [...prevGuesses]
          newGuesses[turn] = formattedGuess
          return newGuesses
        })
        setHistory(prevHistory => {
          return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
          return prevTurn + 1
        })
        setCurrentGuess('')
      }

    const handleKeyup = ({key}) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log("Nope");
                return
            }
            if(history.includes(currentGuess)){
                console.log("Already Guessed");
                return
            }
            if( currentGuess.length !== 5){
                console.log("Not Long Enough");
                return
            }
            //formatGuess()
            addNewGuess(formatGuess())
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
            return prev.slice(0,-1);
        })
        return;
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {return prev + key})
            }
        }
        //console.log(key);
    }
    return {turn,currentGuess,guesses,history,isCorrect,handleKeyup}
}
export default useWorlde 