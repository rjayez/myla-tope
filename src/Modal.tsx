import {Show} from 'solid-js';

export function Modal(props: { isOpen: boolean, score: number, handleClose: Function }) {

    return (
        <>
            <Show when={props.isOpen} keyed={true}>
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog"
                     aria-modal="true">

                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div class="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:px-8">
                            <div
                                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl ">
                                <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div
                                            class="mx-auto sm:fixed bg-[url('./assets/mylou_merci.png')] bg-contain flex h-24 w-24  flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-36 sm:w-36">
                                        </div>
                                        <div class="mt-3 text-center sm:mt-0 sm:mx-auto sm:text-left sm:h-32">
                                            <div class="my-auto">
                                                <h3 class="text-base font-semibold leading-none text-gray-900 sm:text-center sm:pt-3 sm:text-3xl"
                                                    id="modal-title">Merci d'avoir joué 💙</h3>
                                                <div class="mt-4">
                                                    <p class="text-sm sm:text-xl text-gray-500">Vous avez fait un score
                                                        de <strong class={"text-lg md:text-2xl text-gray-700"}
                                                            >{props.score}</strong> points !</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:justify-center sm:px-6">
                                    <button type="button" onclick={() => props.handleClose()}
                                            class="inline-flex w-full  justify-center rounded-md bg-blue-600 px-9 py-2 text-sm sm:text-lg font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </>
    );
}
