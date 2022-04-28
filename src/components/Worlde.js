import React, { useEffect } from "react";
import useWorlde from '../hooks/useWordle';
import Grid from './Grid';
export default function Worlde({solution}){

    const {currentGuess, handleKeyup,guesses,turn,isCorrect} = useWorlde(solution)
    useEffect(() =>{
        window.addEventListener('keyup',handleKeyup);

        return () => window.removeEventListener('keyup',handleKeyup);
    }, [handleKeyup])
// <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    return (
        <div>
        <div>solution - {solution}</div>
        <div>Current Guess - {currentGuess}</div>
        <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        </div>
    )
}