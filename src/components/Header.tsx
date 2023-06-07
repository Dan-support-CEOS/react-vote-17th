import styles from '../styles/Header.module.css';
import Logo from '../../public/img/Logo.svg';

export default function Header() {
    return(
        <div className = {styles.HeaderPage}>
            <Logo className = {styles.logo}/>
            <div className = {styles.buttons}>
            <button className = {styles.registerBtn}>회원가입</button>
            </div>
        </div>
    )
}