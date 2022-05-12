import * as React from 'react';
import TimelineN from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import DateRangeTwoTone from '@material-ui/icons/DateRangeTwoTone';
import styles from './Timeline.module.css';
import utils from '../utils';


export default function Timeline(props) {
  const { filelist, classes='', title1='', title2 } = props;
  return (
    <TimelineN>
        <TimelineItem className={classes.root1}>
          <TimelineSeparator>
            <TimelineDot color='primary' className={classes.root2} />
            <TimelineConnector />
          </TimelineSeparator>
        <TimelineContent className={classes.root3}>{title1}</TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.root1}>
          <TimelineSeparator>
            <TimelineDot color='inherit' className={classes.root4} />
            <TimelineConnector />
          </TimelineSeparator>
        <TimelineContent>{title2}</TimelineContent>
      </TimelineItem>
      {
        filelist.slice(0, props.filelist.length).map((item, index) => {
          return (
            <TimelineItem key={index} className={classes.root1}>
              <TimelineSeparator>
                <TimelineDot className={classes.root2} color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
                <TimelineContent sx={{width: '39rem', display: 'flex', alignItems: 'center'}}>
                  <a href={`http://localhost:3001/get?url=${item.url}&title=${item.title}&bgImgUrl=${item.bgImgUrl}&category=${item.category}`}>
                    <img src={utils.preProcess("http://localhost:3001/pics/" + item.bgImgUrl)} className={styles.timelineImg} alt=''></img>
                  </a>
                  <div className={styles.fileInfo}>
                    <div>
                      <DateRangeTwoTone sx={{verticalAlign: 'middle'}}></DateRangeTwoTone>
                      {item.date}
                      </div>
                    <a href={`http://localhost:3001/get?url=${item.url}&title=${item.title}&bgImgUrl=${item.bgImgUrl}&category=${item.category}`}>{item.title}</a>
                  </div>
                </TimelineContent>
            </TimelineItem>
          )
        })
      }
        <TimelineItem className={classes.root1}>
          <TimelineSeparator>
            <TimelineDot color='primary' className={classes.root2} />
          </TimelineSeparator>
        <TimelineContent sx={{width: '39rem', display: 'flex', alignItems: 'center'}}>
        </TimelineContent>
      </TimelineItem>
    </TimelineN>
  );
}
