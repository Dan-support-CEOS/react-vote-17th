import {Ingroup} from '../interface/interface';
import styles from '../styles/Demo.module.css';

interface demoVoteProps{
    groups: Ingroup[];
}

export default function demoVote({groups}: demoVoteProps){
    
    return(
        <div className={styles.componentPage}>
            {groups.map((group) => (
                
            <div className={styles.box}>
                <div>{group.name}</div>
                <div>{group.detail}</div>
            </div>
            ))}
        </div>
    )
}