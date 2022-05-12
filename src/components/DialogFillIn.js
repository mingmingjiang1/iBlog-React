
import TextField from '@material-ui/core/TextField';
import React from 'react';
import styles from './DialogFillIn.module.css';
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& label#custom-css-standard-input-label': {
          color: 'white',
      },
      '& input#custom-css-standard-input': {
          color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

export default function DialogFillIn(props) {
    const classes = useStyles();
    let [name, setName] = React.useState('');
    let { onReceiveKeywords, root, div, msg} = props;
    function handleTitle(e) {
        setName(e.target.value);
    }
    function handleConfirm() {
        onReceiveKeywords(name);
        // root得研究一下
        root.unmount(div);
        document.body.removeChild(div);
    }

    function handleCancel() {
        setName('');
        root.unmount(div);
        document.body.removeChild(div);
    }
    return (
        <div className={styles.dialogFillIn}>
            <CssTextField className={classes.margin} id="custom-css-standard-input" label={msg} onChange={(e) => handleTitle(e)} />
            <div className={styles.btnGroup}>
                <button className={`btn-info ${styles.btn}`} onClick={handleConfirm}>确定</button>
                <button className={`btn-null ${styles.btn}`} onClick={handleCancel}>取消</button>
            </div>
        </div>
    )
}