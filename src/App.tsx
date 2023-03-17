import type {Component, Signal} from 'solid-js';
import {createEffect, createSignal, onCleanup} from "solid-js";
import styles from './App.module.css';
import {GameButton} from "./GameButton";

const defaultButtonState = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

const App: Component = () => {
    const [gameActive, setGameActive]: Signal<boolean> = createSignal(false);
    const [score, setScore]: Signal<number> = createSignal(0);
    const [timer, setTimer]: Signal<number> = createSignal(0);

    const [buttonState, setButtonState]: Signal<boolean[]> = createSignal(defaultButtonState);
    let timerInterval: number = setInterval(() => setTimer(timer() + 1), 1000);
    let gameInterval: number = setInterval(() => {

        if (gameActive()) {
            let random = Math.floor(Math.random() * 9);
            console.info(random);
            const newButtonState = [...defaultButtonState];
            newButtonState[random] = true;
            setButtonState(newButtonState);
        }
    }, 2000);


    onCleanup(() => {
        clearInterval(timerInterval);
        clearInterval(gameInterval);
    });

    createEffect(() => {
        if (timer() > 5) {
            setTimer(0);
        }
    })

    const handleGameButton = (active: boolean) => {

        if (gameActive() && active) {
            setScore(score() + 1);
            setButtonState(defaultButtonState);
        }
    };
    const resetGame = () => {
        setScore(0);
        setTimer(0);
    }


    return (
        <>
            <>
                <h1 class=" text-3xl lg:text-6xl text-center m-6 font-bold text-blue-100">Myla-Tope</h1>
                <header class="text-center text-gray-200 space-x-2 text-xl">
                    <button onClick={() => setGameActive(!gameActive())}>Jouer</button>
                    <button onClick={resetGame}>Reset</button>

                    <label>Scores : {score()}</label>
                    <label>Temps : {timer()}</label>

                </header>
            </>
            <div class="grid grid-cols-3 w-[310px] md:w-[700px]  mx-auto gap-4 mt-10 md:mt-20 p-2" style={styles.grid}>
                <GameButton active={buttonState()[0]} onClick={() => handleGameButton(buttonState()[0])}/>
                <GameButton active={buttonState()[1]} onClick={() => handleGameButton(buttonState()[1])}/>
                <GameButton active={buttonState()[2]} onClick={() => handleGameButton(buttonState()[2])}/>
                <GameButton active={buttonState()[3]} onClick={() => handleGameButton(buttonState()[3])}/>
                <GameButton active={buttonState()[4]} onClick={() => handleGameButton(buttonState()[4])}/>
                <GameButton active={buttonState()[5]} onClick={() => handleGameButton(buttonState()[5])}/>
                <GameButton active={buttonState()[6]} onClick={() => handleGameButton(buttonState()[6])}/>
                <GameButton active={buttonState()[7]} onClick={() => handleGameButton(buttonState()[7])}/>
                <GameButton active={buttonState()[8]} onClick={() => handleGameButton(buttonState()[8])}/>
            </div>
        </>
    );
};

export default App;
