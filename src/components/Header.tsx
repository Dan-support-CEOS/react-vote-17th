import styles from '../styles/Header.module.css';
import Logo from '../../public/img/Logo.svg';
import Link from 'next/link';

export default function Header() {
    return(
        <div className = {styles.HeaderPage}>
            <Link href= '/'>
            <Logo className = {styles.logo}/>
            </Link>
            <div className = {styles.buttons}>
            <Link href= '/register'>
            <button className = {styles.registerBtn}>회원가입</button>
            </Link>
            </div>
        </div>
    )
}