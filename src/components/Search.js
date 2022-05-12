import styles from './Search.module.css';

export default function Search(props) {
    let {placeholder, submitDesc} = props
    return (
        <div className={styles.container}>
            <form action='后端域名' method='POST'>
                <input placeholder={placeholder} name="search"></input>
                <button type="submit" className="btn-info">{submitDesc}</button>
            </form>

        </div>
    )
}