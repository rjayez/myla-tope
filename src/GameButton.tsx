import {MYLOU_TYPE} from "./App";

/*TODO Passer le buttonState*/
export function GameButton(props: { active: boolean, onClick: (point: number) => void, type: MYLOU_TYPE }) {


    const MYLOU_TYPE = {
        DIABLE: {
            bgClass: "bg-[url('./assets/mylou_diable.png')]",
            point: 1
        },
        FIAK: {
            bgClass: "bg-[url('./assets/mylou_fiak.png')]",
            point: 5
        },
        ANGE: {
            bgClass: "bg-[url('./assets/mylou_ange.png')]",
            point: -3
        }
    }


    return <button class="bg-transparent border-none w-[90px]  md:w-[200px] h-[100px] md:h-[200px] mx-auto"
                   classList={{buttonActive: props.active}}
                   onClick={() => props.onClick(MYLOU_TYPE[props.type].point)}>
        <div
            class={`relative h-[90px] md:h-[150px] w-[70px] md:w-[180px] top-7 md:top-16 -z-10 bg-contain bg-center bg-no-repeat mx-auto ${MYLOU_TYPE[props.type].bgClass}`}
            classList={{"animate-apparition": props.active, "md:animate-apparitionDesktop": props.active}}/>
        <div
            class="relative h-[110px] md:h-[200px] md:w-[180px] top-36 md:top-28 bg-center bg-no-repeat bg-[url('./assets/nuage.png')]
            -translate-y-[210px] bg-contain  mx-auto"/>
    </button>;
}
