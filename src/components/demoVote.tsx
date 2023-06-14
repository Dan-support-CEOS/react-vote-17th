import { useState } from 'react';
import {Ingroup} from '../interface/interface';
import styles from '../styles/Demo.module.css';

interface demoVoteProps{
    groups: Ingroup[];
}

export default function demoVote({groups}: demoVoteProps){
    const firstGroup = groups.filter(group => group.id < 2);
    const secondGroup = groups.filter(group => group.id >1);
    const [clickIndex,setClickIndex] = useState(5);
    
    function onVote(){
        if(clickIndex == 5){
            alert('투표할 팀을 선택해주세요');
        }
        else{
            alert('투표되었습니다');
        }
    }

    return(
        <>
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
        <button className={styles.voteBtn} onClick={()=>{onVote()}}>투표하기</button>
        </>
    )
}