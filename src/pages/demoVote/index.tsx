import groupData from '../../jsons/groupData.json';
import VoteBox from '../../components/demoVote';

export default function demoVote(){
    const group = groupData.groups;

    return(
        <div>
            <div>데모데이 투표</div>
            <VoteBox groups={group}/>
            <button>투표하기</button>
        </div>
    )
}