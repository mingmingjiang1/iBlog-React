import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import imgUrl from '../assets/pics/contemplative-reptile.jpg';


const useStyles = makeStyles({
  img: {
        transition: 'all 0.6s',
      '&:hover': {
        transform: 'scale(1.1)',
      }
  },
  body2: {
    overflow: 'hidden',
    maxHeight: '154px',
    display: '-webkit-box',
    '-webkit-line-clamp': '6',
    '-webkit-box-orient': 'vertical',
  }
});


export default function MediaCard(props) {
  let classes = useStyles();
  let [bgImgUrl, setBgImg] = React.useState();
  React.useEffect(() => {
    
  }, []);

//   let [title, briefDesc] = React.useState('');
  let {title = '默认标题', labels = '', category = '', briefDesc = 'xxxxxxxxx', date='xx/xx/xx', imgObj={url: imgUrl, alt: 'xxx'}, url=''} = props;
  function handleDetail() {
    window.location.assign(`http://localhost:3001/get?url=${url}&title=${title}&bgImgUrl=${imgObj.url}&category=${category}`)
  }
  return (
    <div style={{marginBottom: '50px', boxShadow: '7px 7px 8px 6px rgba(7,17,27,0.07)'}}>
      <Card sx={{ maxWidth: 400, maxHeight: 600}}> 
      {/*  */}
        <CardMedia
          className={classes.img}
          component="img"
          // height="140"
          image={preProcess(imgObj.url)}
          alt={imgObj.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
            &nbsp;&nbsp;&nbsp;
            <span style={{fontSize: '15px', fontWeight: '500'}}>{labels}</span>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
              {date}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={classes.body2}>
              {briefDesc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            SHARE
          {/* <i className={`${styles.iconfont} ${styles.icon_pinglun}`}></i> */}
          </Button>
          <Button size="small" onClick={() => handleDetail()}>MORE
          {/* <i className={`${styles.iconfont} ${styles.icon_jiantou_xiangyou_o}`}></i> */}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function preProcess(url) {
  const o = url.replace('/pics', '').replace('/static', '');
  return o;
}
