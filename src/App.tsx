import type {Component, Signal} from 'solid-js';
import {createEffect, createSignal, For, onCleanup} from "solid-js";
import {GameButton} from "./GameButton";
import {Modal} from "./Modal";

interface ButtonState {
    active: boolean;
    type: MYLOU_TYPE;
}

export type MYLOU_TYPE = "DIABLE" | "FIAK" | "ANGE";

const TYPE: MYLOU_TYPE[] = ["DIABLE", "ANGE", "FIAK"]

const defaultButtonState: ButtonState[] = [
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"},
    {active: false, type: "DIABLE"}
];

const GAME_TIME_SECONDS = 30;

const App: Component = () => {
    const [gameActive, setGameActive]: Signal<boolean> = createSignal(false);
    const [score, setScore]: Signal<number> = createSignal(0);
    const [timer, setTimer]: Signal<number> = createSignal(0);
    const [gameInterval, setGameInterval]: Signal<number> = createSignal(0);
    const [isOpen, setIsOpen]: Signal<boolean>  = createSignal(false);

    const [buttonState, setButtonState]: Signal<ButtonState[]> = createSignal(defaultButtonState);


    const timeoutIdStore: number[] = [];

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
        setScore(0);
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
        const randomMylou = Math.floor(Math.random() * 9);
        const randomType = Math.floor(Math.random() * 2);
        let mylouType = TYPE[randomType];
        if ((timer()+1) % 5 === 0){
            mylouType = "FIAK";
        }

        if (gameActive() && !buttonState()[randomMylou].active) {
            //Apparition
            updateButtonState(true, mylouType, randomMylou);
            timeoutIdStore[randomMylou] = setTimeout(() => {
                // Disparition
                updateButtonState(false, mylouType, randomMylou);
            }, 2000);
        }
    }

    // TODO Relocaliser le state au niveau du bouton
    function updateButtonState(active: boolean, type: MYLOU_TYPE | undefined, buttonIndex: number) {
        let tempButtonState = [...buttonState()];
        tempButtonState[buttonIndex] = {
            active: active,
            type: type ?? "DIABLE"
        };

        setButtonState(tempButtonState);
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
            setIsOpen(true);
        }
    });

    function handleGameButton(active: boolean, buttonIndex: number, point: number) {
        if (gameActive() && active) {
            setScore(prev => prev + point);
            updateButtonState(false, undefined, buttonIndex);
            clearTimeout(timeoutIdStore[buttonIndex]);
        }
    }

    function resetGame() {
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
            <div class="grid grid-cols-3 w-[310px] md:w-[700px]  mx-auto gap-4 mt-10 md:mt-8 p-2 content-center">
                <For each={buttonState()}>
                    {(buttonState, index) =>
                        <GameButton active={buttonState.active}
                                    onClick={point => handleGameButton(buttonState.active, index(), point)}
                                    type={buttonState.type}/>}
                </For>
            </div>
            <Modal isOpen={isOpen()} score={score()} handleClose={() => setIsOpen(false)}/>
        </>
    );
};

export default App;
