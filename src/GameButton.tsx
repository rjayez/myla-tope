import styles from "./GameButton.module.css";

export function GameButton(props: { active: boolean, onClick: () => void }) {

    return (<button class={styles.gameButton}  classList={{buttonActive: props.active}}
                    onClick={props.onClick}>
        <div class={styles.mylou} classList={{mylouActive : props.active}} />
        <div class={styles.nuage}/>
    </button>);
}