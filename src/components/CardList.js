import MediaCard from './Card';
import styles from './CardList.module.css';

export default function CardList(props) {
    const { showList=[] } = props;
    return (
        <div className={styles.showBar}>
        <div className={styles.left}>
            {
                Array.from(showList).map((item, index) => {
                    if (index % 2 === 0) 
                        return (
                            <MediaCard labels={item.labels} categoy={item.category} title={item.title} briefDesc={item.desc} url={item.url} date={item.date} key={index} imgObj={{url: "http://localhost:3001/pics/" + item.bgImgUrl, alt: "图片描述"}} ></MediaCard>
                        )
                })
            }

    
        </div>
        <div className={styles.right}>
            {
                Array.from(showList).map((item, index) => {
                    if (index % 2 === 1) 
                        return (
                            <MediaCard labels={item.labels} categoy={item.category} title={item.title} briefDesc={item.desc} date={item.date} url={item.url} key={index} imgObj={{url: "http://localhost:3001/pics/" + item.bgImgUrl, alt: "图片描述"}}></MediaCard>
                        )
                })
            }
        </div>
    </div>
    )
}