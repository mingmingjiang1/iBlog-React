import React from 'react';
import Tree from './Tree';
import TimeLine from './Timeline';
import styles from './ShowCategory.module.css';

export default function ShowCategory(props) {
    let [filelist, setFilelist] = React.useState([]);
    function handlerReceiveKeywords(keywords){
        setFilelist(keywords);
    }

    return (
        <div className={styles.container}>
            <div>
                <h2>目录索引</h2>
                <Tree onReceiveKeywords={handlerReceiveKeywords }></Tree>
            </div>
            <div>
                <h2>文件索引</h2>
                {filelist.length ? <TimeLine filelist={filelist}></TimeLine> : null}
            </div>
        </div>
    )
}