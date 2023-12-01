import type {Component, Signal} from 'solid-js';
import {createEffect, createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {GameButton} from "./GameButton";
import {Modal} from "./Modal";
import anime from "animejs";
import {ModalRules} from "./ModalRules";
import {checkRulesAlreadySeen} from "./service/service";

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

const GAME_TIME_SECONDS = 60;
const INITIAL_MYLOU_COUNT = 72;



const App: Component = () => {
    const [gameActive, setGameActive]: Signal<boolean> = createSignal(false);
    const [score, setScore]: Signal<number> = createSignal(0);
    const [timer, setTimer]: Signal<number> = createSignal(0);
    const [gameInterval, setGameInterval]: Signal<number> = createSignal(0);
    const [timerInterval, setTimerInterval]: Signal<number> = createSignal(0);
    const [isOpen, setIsOpen]: Signal<boolean> = createSignal(false);
    const [ruleIsOpen, setRuleIsOpen]: Signal<boolean> = createSignal(false);
    const [mylouRemaining, setMylouRemaining]: Signal<number> = createSignal(INITIAL_MYLOU_COUNT);
    const [difficultyIndex, setDifficultyIndex] = createSignal(0);
    const [apparitionTime, setApparitionTime] = createSignal(2000);

    const [buttonState, setButtonState]: Signal<ButtonState[]> = createSignal(defaultButtonState);


    const timeoutIdStore: number[] = [];

    function handleJouerButton() {

        if (!gameActive()) {
            setGameActive(true);
            let {timerInterval, gameInterval} = launchGame();
            setGameInterval(gameInterval);
            setTimerInterval(timerInterval);
            setMylouRemaining(INITIAL_MYLOU_COUNT);
            setDifficultyIndex(0);
        } else {
            clearInterval(gameInterval());
            clearInterval(timerInterval());
            setGameActive(false);
            setButtonState(defaultButtonState);
            setTimer(0);
            setDifficultyIndex(0);
            setApparitionTime(2000);
        }
    }

    function handleButtonRules() {
        setRuleIsOpen(true);
    }

    function launchGame() {
        setScore(0);
        const randomDuration = Math.floor((Math.random() * 1000) + 500);
        showUpMylou();
        let timerInterval = setInterval(() => setTimer(prev => prev + 1), 1000);
        let gameInterval = setInterval(() => {
            setTimeout(() => {
                if (mylouRemaining() > 0){
                    showUpMylou();
                    setMylouRemaining((num) => --num);
                }
            }, randomDuration);
        }, 800);
        return {timerInterval, gameInterval};
    }

    function animationMylou(duration: number, key: number) {

        anime({
            targets: `.game-button-${key}`,
            duration: duration,
            loop: 1,
            autoplay: true,
            translateY: [0, -58, 0],
            easing: "linear",
        });
    }

    function showUpMylou() {
        const randomMylou = Math.floor(Math.random() * 9);
        const randomType = Math.floor(Math.random() * 2);
        const DIIFICULTY_FACTOR_IN_MS = 50;
        let mylouType = TYPE[randomType];
        if ((timer() + 1) % 5 === 0) {
            mylouType = "FIAK";
            setDifficultyIndex(prev => prev + 1);
            setApparitionTime(2000 - difficultyIndex() * DIIFICULTY_FACTOR_IN_MS)
        }

        if (gameActive() && !buttonState()[randomMylou].active) {
            //Apparition
            updateButtonState(true, mylouType, randomMylou);
            console.debug(apparitionTime());
            animationMylou(apparitionTime(), randomMylou);

            timeoutIdStore[randomMylou] = setTimeout(() => {
                // Disparition
                updateButtonState(false, mylouType, randomMylou);
            }, (apparitionTime()));
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
        clearInterval(timerInterval());
    });

    createEffect(() => {
        if (timer() > GAME_TIME_SECONDS) {
            // Fin du jeu
            setGameActive(false);
            setButtonState(defaultButtonState);
            setTimer(0);
            clearInterval(gameInterval());
            clearInterval(timerInterval());
            setIsOpen(true);
        }
    });

    onMount(() => {
        if (!checkRulesAlreadySeen()){
            setRuleIsOpen(true);
        }
    })

    function handleGameButton(active: boolean, buttonIndex: number, point: number) {
        if (gameActive() && active) {
            setScore(prev => prev + point);
            updateButtonState(false, undefined, buttonIndex);
            clearTimeout(timeoutIdStore[buttonIndex]);
        }
    }


    return (
        <>
            <>
                <h1 class="text-3xl lg:text-6xl text-center m-6 font-bold text-blue-100">Myla-Tope</h1>
                <header class="px-2 text-center text-gray-200 space-x-4 md:space-x-8  text-2xl">
                    <button class="border-4 p-3 rounded-2xl"
                            onClick={() => handleJouerButton()}>{gameActive() ? "Stop" : "Jouer"}</button>
                    <button class="border-4 p-3 rounded-2xl"
                            onClick={() => handleButtonRules()}>Règles</button>
                    {/*<span>[DEBUG] Remaining : {mylouRemaining()}  DifficultyIndex : {difficultyIndex()}</span>*/}
                    <Show when={gameActive()} keyed={true}>
                        <div class="space-x-8  mt-4">
                            <label>Scores : {score()}</label>
                            <label>Temps : {Math.floor(timer())}</label>
                        </div>
                    </Show>
                </header>
            </>
            <div class="grid grid-cols-3 w-[310px] md:w-[700px] mx-auto gap-4 mt-10 md:mt-8 p-2 content-center">
                <For each={buttonState()}>
                    {(buttonState, index) =>
                        <GameButton key={index()}
                                    active={buttonState.active}
                                    onClick={point => handleGameButton(buttonState.active, index(), point)}
                                    type={buttonState.type}
                                    apparitionTime={apparitionTime()}/>}
                </For>
            </div>
            <Modal isOpen={isOpen()} score={score()} handleClose={() => setIsOpen(false)}/>
            <ModalRules isOpen={ruleIsOpen()} handleClose={() => setRuleIsOpen(false)}/>
        </>
    );
};

export default App;
