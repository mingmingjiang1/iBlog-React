import utils from '../utils';
import styles from './Thumbnail.module.css';

export default function Thumbnail(props) {
    // 传进来两个url，一个title，一个date
    const {date, url, bgImgUrl, title, category} = props;
    return (
        <div className={styles.asideListItem}>
            <a className={styles.thumbnail} href={`http://localhost:3001/get?url=${url}&title=${title}&bgImgUrl=${bgImgUrl}&category=${category}`}>
                <img src={utils.preProcess(bgImgUrl)} alt=""></img>
            </a>
            <div>
                <a href={`http://localhost:3001/get?url=${url}&title=${title}&bgImgUrl=${bgImgUrl}&category=${category}`}>{title}</a>
                <time>{date}</time>
            </div>
        </div>
    )
}
