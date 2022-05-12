import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import fetch from '../utils';
import TimeLine from './Timeline';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Archive.module.css';


const useStyles2 = makeStyles((theme) => ({
    root1: {
      '&:before': {
          content: '',
          display: 'none'
      },
    },
    root2: {
        'background-color': 'red',
        'transition': 'all 0.2s',
        '&:hover': {
            'background-color': 'red',
            'transform': 'scale(1.5)',
        } 
    },
    root3: {
        'font-size': '1.4rem!important',
    },
    root4: {
        'background-color': 'red',
        'transform': 'scale(1.5)',
    }
  }));

export default function Archive(props) {
    const classes2 = useStyles2();
    const { id, category } = useParams();
    const [lists, setLists] = React.useState([]);
    let { filelist, request } = props;
    console.log(id, category, filelist)
    React.useEffect(() => {
        console.log("effect")
        async function fetchData() {
            await request(undefined, 1, category, id);
        }
        fetchData();
    }, []);


    // 按照分类发起请求
    // {category: 在数据库中根据primaryCategory字段查询，但是我想要达到局部刷新的效果} 

    return (
            <div className={styles.showBar}>
                <div>
                     <TimeLine filelist={filelist.length > 0 ? filelist : lists} title1={category.toUpperCase()} title2={id} classes={classes2}></TimeLine>
                </div>
            </div>
    )
}


// 整个组件可以衍生出三个组件，基本timeline，特殊的分类和归档组件，分别写不同的请求数据的函数，或者公用一个？

