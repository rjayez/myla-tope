import {Show} from 'solid-js';

export function ModalRules(props: { isOpen: boolean, handleClose: Function }) {

    return (
        <Show when={props.isOpen} keyed={true}>
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog"
                 aria-modal="true">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:px-8 ">
                        <div
                            class=" bg-[url('./assets/background.png')] bg-cover relative border-4 border-white transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                            <div class="bg-gray-50 bg-opacity-0 transition-opacity py-4 sm:p-6 sm:py-4 text-white">
                                <div class="mt-3  text-center sm:mt-0 sm:mx-auto sm:text-left">
                                        <div class="bg-blue-950 bg-opacity-95 w-full my-2 rounded-lg">
                                            <h3 class="text-base font-semibold leading-none sm:text-center py-3 text-4xl sm:text-3xl"
                                                id="modal-title">
                                                Le Myla Tope
                                            </h3>
                                        </div>
                                    <div class="grid sm:grid-cols-2">
                                        <div class="text-center sm:text-xl mx-2 sm:mt-4 p-4 border-2 rounded-2xl">
                                            <h4 class="my-2 sm:my-6 sm:text-2xl underline">LÉGENDE</h4>
                                            <p>Il était une fois dans le ciel...
                                                <br/>
                                                Un monde magique rempli de Mylous !
                                                <br/>
                                                Mais derrière les nuages se cachent parfois des intrus...
                                            </p>
                                            <p class="my-2 sm:my-5">
                                                Viens nous aider à les chasser sans blesser les gentils Mylous !
                                            </p>
                                        </div>

                                        <div class="flex flex-col mx-auto sm:mt-4 ">
                                            <div class="flex flex-col sm:flex-row my-1 place-self-center sm:place-self-end">
                                                <div
                                                    class="bg-[url('./assets/mylou_diable.png')] bg-contain mx-auto h-16 w-16 sm:h-20 sm:w-20"/>
                                                <p class=" bg-blue-950 bg-opacity-95 p-3 rounded-md mx-5 text-center">
                                                    <span class="underline">Le Méchant Mylou</span> :
                                                    <br/>
                                                    Tape l'intru et gagne <span
                                                    class="text-green-700">1 point </span>!
                                                </p>

                                            </div>
                                            <div class="flex flex-col-reverse sm:flex-row my-1 col-end-auto place-self-center sm:place-self-end  ">

                                                <p class=" bg-blue-950 bg-opacity-95 p-3 rounded-md mx-5 text-center">
                                                    <span class="underline text-lg">Le Gentil Mylou</span> :
                                                    <br/>
                                                    Ne le tape as sinon tu perds <span
                                                    class="text-red-700">3 points </span>!
                                                </p>
                                                <div
                                                    class="bg-[url('./assets/mylou_ange.png')] mx-auto bg-contain h-16 w-16 sm:h-20 sm:w-20"/>
                                            </div>
                                            <div class="flex sm:flex-row flex-col my-1 place-self-center sm:place-self-end">
                                                <div
                                                    class="bg-[url('./assets/mylou_fiak.png')] mx-auto bg-contain h-16 w-16 sm:h-20 sm:w-20"/>
                                                <p class="bg-blue-950 bg-opacity-95 p-3 rounded-md mx-5 align-middle text-center">
                                                    <span class="underline">Le Mylou Fiak</span> :
                                                    <br/>
                                                    Claque des popotins pour gagner <span
                                                    class="text-green-700">5 points </span>!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 sm:flex sm:justify-center sm:px-6">
                                    <button type="button" onClick={() => props.handleClose()}
                                            class="inline-flex w-full  justify-center rounded-md bg-blue-600 px-9 py-2 text-sm sm:text-lg font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Fermer
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
}
