import {Ingroup} from '../interface/interface';
import styles from '../styles/Demo.module.css';

interface demoVoteProps{
    groups: Ingroup[];
}

export default function demoVote({groups}: demoVoteProps){
    const firstList = groups.filter(group => group.id < 2)
    const secondList = groups.filter(group => group.id > 1)
    return(
        <div className={styles.componentPage}>
            <div className={styles.componentPart}>
            {firstList.map((group) => (

            <div className={styles.box}>
                <div className={styles.textBox}>
                <div className={styles.boldText}>{group.name}</div>
                <div className={styles.lightText}>{group.detail}</div>
                </div>
            </div>
            ))}
            </div>
            <div className={styles.componentPart}>
            {secondList.map((group) => (
                
                <div className={styles.box}>
                    <div className={styles.textBox}>
                    <div className={styles.boldText}>{group.name}</div>
                    <div className={styles.lightText}>{group.detail}</div>
                    </div>
                </div>
                ))}
                </div>
        </div>
    )
}