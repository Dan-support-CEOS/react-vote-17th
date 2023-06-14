import { useState } from 'react';
import {Ingroup} from '../interface/interface';
import styles from '../styles/Demo.module.css';

interface demoVoteProps{
    groups: Ingroup[];
}

export default function demoVote({groups}: demoVoteProps){
    const [clickIndex,setClickIndex] = useState(5);
    const firstGroup = groups.filter(group => group.id < 2);
    const secondGroup = groups.filter(group => group.id >1);

    return(
        <div className={styles.componentPage}>
            <div className={styles.componentPart}>
            {firstGroup.map((group) => (
            <div onClick={()=>setClickIndex(group.id)}>
                {clickIndex === group.id?(
                    <div className={styles.clickedBox}> 
                    <div className={styles.textBox}>
                    <div className={styles.nameText}>{group.name}</div>
                    <div className={styles.detailText}>{group.detail}</div>
                    </div>
                    </div>
                ):(
                    <div className={styles.box}> 
                    <div className={styles.textBox}>
                    <div className={styles.nameText}>{group.name}</div>
                    <div className={styles.detailText}>{group.detail}</div>
                    </div>  
                    </div>
                )}
            </div>
            ))}
        </div>
        <div className={styles.componentPart}>
            {secondGroup.map((group) => (
            <div onClick={()=>setClickIndex(group.id)}>
                {clickIndex === group.id?(
                    <div className={styles.clickedBox}> 
                    <div className={styles.textBox}>
                    <div className={styles.nameText}>{group.name}</div>
                    <div className={styles.detailText}>{group.detail}</div>
                    </div>
                    </div>
                ):(
                    <div className={styles.box}> 
                    <div className={styles.textBox}>
                    <div className={styles.nameText}>{group.name}</div>
                    <div className={styles.detailText}>{group.detail}</div>
                    </div>  
                    </div>
                )}
            </div>
            ))}
        </div>
        </div>
    )
}