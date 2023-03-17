
export function GameButton(props: { active: boolean, onClick: () => void }) {

    return <button class="bg-transparent border-none w-[90px]  md:w-[200px] h-[100px] md:h-[200px] mx-auto" classList={{buttonActive: props.active}}
                    onClick={props.onClick}>
        <div class="h-[90px] md:h[150px] bg-[url('./assets/mylou_diable.png')] bg-contain bg-center bg-no-repeat mx-auto"
             classList={{mylouActive: props.active}}/>
        <div
            class="h-[110px] md:h-[200px] md:w-[150px] bg-center bg-no-repeat bg-[url('./assets/nuage.png')] bg-contain -translate-y-[95px] md:-translate-y-[125px] mx-auto"/>
    </button>;
}