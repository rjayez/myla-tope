export function GameButton(props: { active: boolean, onClick: () => void }) {


    return <button class="bg-transparent border-none w-[90px]  md:w-[200px] h-[100px] md:h-[200px] mx-auto"
                   classList={{buttonActive: props.active}}
                   onClick={props.onClick}>
        <div
            class="relative h-[90px] md:h-[150px] w-[70px] md:w-[180px] bg-[url('./assets/mylou_diable.png')] top-7 md:top-16
            -z-10 bg-contain bg-center bg-no-repeat mx-auto"
            classList={{"animate-apparition": props.active, "md:animate-apparitionDesktop": props.active}}/>
        <div
            class="relative h-[110px] md:h-[200px] md:w-[180px] top-36 md:top-28 bg-center bg-no-repeat bg-[url('./assets/nuage.png')]
            -translate-y-[210px] bg-contain  mx-auto"/>
    </button>;
}
