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

const GAME_TIME_SECONDS = 30;

const App: Component = () => {
    const [gameActive, setGameActive]: Signal<boolean> = createSignal(false);
    const [score, setScore]: Signal<number> = createSignal(0);
    const [timer, setTimer]: Signal<number> = createSignal(0);
    const [gameInterval, setGameInterval]: Signal<number> = createSignal(0);

    const [buttonState, setButtonState]: Signal<boolean[]> = createSignal(defaultButtonState);

    function handleJouerButton() {

        if (!gameActive()) {
            setGameActive(true);
            let gameInterval = launchGame();
            setGameInterval(gameInterval);
        } else {
            setGameActive(false);
            setTimer(0);
        }
    }

    function launchGame() {

        const randomDuration = Math.floor((Math.random() * 1000) + 500);
        showUpMylou();

        return setInterval(() => {
            setTimer(timer() + 1);
            setTimeout(() => {
                showUpMylou();
            }, randomDuration);
        }, 800);
    }

    function showUpMylou() {
        let randomMylou = Math.floor(Math.random() * 9);
        if (gameActive() && !buttonState()[randomMylou]) {
            mylouAppear(randomMylou);
            setTimeout(() => {
                updateButtonState(false, randomMylou);
            }, 2000);
        }
    }

    function updateButtonState(active: boolean, buttonIndex: number) {
        const tempButtonState = [...buttonState()];
        tempButtonState[buttonIndex] = active;
        setButtonState(tempButtonState);
    }

    function mylouAppear(randomNumber: number) {
        if (gameActive()) {
            updateButtonState(true, randomNumber);
        }
    }

    onCleanup(() => {
        clearInterval(gameInterval());
    });

    createEffect(() => {
        if (timer() > GAME_TIME_SECONDS) {
            // Fin du jeu
            setGameActive(false);
            setButtonState(defaultButtonState);
            setTimer(0);
            clearInterval(gameInterval());
        }
    });


    const handleGameButton = (active: boolean, buttonIndex: number) => {
        if (gameActive() && active) {
            setScore(score() + 1);
            updateButtonState(false, buttonIndex);
        }
    };
    const resetGame = () => {
        setScore(0);
        setTimer(0);
        setButtonState(defaultButtonState);
        clearInterval(gameInterval());
    }

    return (
        <>
            <>
                <h1 class=" text-3xl lg:text-6xl text-center m-6 font-bold text-blue-100">Myla-Tope</h1>
                <header class="text-center text-gray-200 space-x-2 text-xl">
                    <button onClick={() => handleJouerButton()}>{gameActive() ? "Stop" : "Jouer"}</button>
                    <button onClick={resetGame}>Reset</button>

                    <label>Scores : {score()}</label>
                    <label>Temps : {timer()}</label>

                </header>
            </>
            <div class="grid grid-cols-3 w-[310px] md:w-[700px]  mx-auto gap-4 mt-10 md:mt-20 p-2" style={styles.grid}>
                <GameButton active={buttonState()[0]} onClick={() => handleGameButton(buttonState()[0], 0)}/>
                <GameButton active={buttonState()[1]} onClick={() => handleGameButton(buttonState()[1], 1)}/>
                <GameButton active={buttonState()[2]} onClick={() => handleGameButton(buttonState()[2], 2)}/>
                <GameButton active={buttonState()[3]} onClick={() => handleGameButton(buttonState()[3], 3)}/>
                <GameButton active={buttonState()[4]} onClick={() => handleGameButton(buttonState()[4], 4)}/>
                <GameButton active={buttonState()[5]} onClick={() => handleGameButton(buttonState()[5], 5)}/>
                <GameButton active={buttonState()[6]} onClick={() => handleGameButton(buttonState()[6], 6)}/>
                <GameButton active={buttonState()[7]} onClick={() => handleGameButton(buttonState()[7], 7)}/>
                <GameButton active={buttonState()[8]} onClick={() => handleGameButton(buttonState()[8], 8)}/>
            </div>
        </>
    );
};

export default App;
