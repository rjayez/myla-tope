import type {Component, Signal} from 'solid-js';
import {createEffect, createSignal, onCleanup} from "solid-js";
import styles from './App.module.css';

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
            <div>
                <h1>Myla-Tope</h1>
                <header class={styles.header}>
                    <button onClick={() => setGameActive(!gameActive())}>Jouer</button>
                    <button onClick={resetGame}>Reset</button>

                    <label>Scores : {score()}</label>
                    <label>Temps : {timer()}</label>

                </header>
            </div>
            <div class={styles.gameButton}>
                <button classList={{buttonActive: buttonState()[0]}}
                        onClick={() => handleGameButton(buttonState()[0])}>1
                </button>
                <button classList={{buttonActive: buttonState()[1]}}
                        onClick={() => handleGameButton(buttonState()[1])}>2
                </button>
                <button classList={{buttonActive: buttonState()[2]}}
                        onClick={() => handleGameButton(buttonState()[2])}>3
                </button>
                <button classList={{buttonActive: buttonState()[3]}}
                        onClick={() => handleGameButton(buttonState()[3])}>4
                </button>
                <button classList={{buttonActive: buttonState()[4]}}
                        onClick={() => handleGameButton(buttonState()[4])}>5
                </button>
                <button classList={{buttonActive: buttonState()[5]}}
                        onClick={() => handleGameButton(buttonState()[5])}>6
                </button>
                <button classList={{buttonActive: buttonState()[6]}}
                        onClick={() => handleGameButton(buttonState()[6])}>7
                </button>
                <button classList={{buttonActive: buttonState()[7]}}
                        onClick={() => handleGameButton(buttonState()[7])}>8
                </button>
                <button classList={{buttonActive: buttonState()[8]}}
                        onClick={() => handleGameButton(buttonState()[8])}>9
                </button>
            </div>
        </>
    );
};

export default App;
