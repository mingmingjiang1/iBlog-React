import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SketchPicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux';
import fetch from '../utils';
import styles from './UserInfo.module.css';
import {
    modifyColor,
    modifyName,
    modifybgImg,
    modifyTitle,
    modifyAsideTitle,
    modifyAvstar,
    selectname,
    selectbgImg,
    selecttitle,
    selectasideTitle,
    selectbgColor,
    selectavstar,
  } from '../features/counter/counterSlice';
import url from '../assets/pics/杜兰特.png';

 const UserInfo = React.forwardRef((props, ref) => {
    let popup;

    const dispatch = useDispatch();
    const [bgColor, setBgColor] = React.useState('');
    const [bgImg, setBgImg] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [asideTitle, setAsideTitle] = React.useState('');
    const [avstar, setAvstar] = React.useState('');
    const [isChanged, setIsChanges] = React.useState(false);
    const [userName, setUserName] = React.useState('');

    const name = useSelector(selectname);
    let title1, title2;


    const [open, setOpen] = React.useState('none');
    React.useEffect(request, []);
    function popUp() {
        // 换样式不行，无法达到进场过渡的效果
        // let target = document.querySelector('.' + styles.userInfo);
        let target = popup.offsetLeft;
        // target.className = styles.userInfoActive;
        let i = 10;
        popup.style.left = target + 'px';
        // let timer = setInterval(() => {
        //     popup.style.left = parseInt(popup.style.left || 0) + i + 'px';
        //     i += 2;
        //     if (parseInt(popup.style.left || 0) >= 0) {
        //         clearInterval(timer)
        //     }
        // }, 300);
        fetch.animate(-80, 0, 50, fetch.easeOutElastic, left => {
            popup.style.left = left + 'px'
          })
    }

    React.useImperativeHandle(ref, () => ({
        popUp
    }));

    function handleChangeColor (color) {
        setBgColor(color.hex);
        dispatch(modifyColor(color.hex));
    };

    function handleControlPicker () {
        setOpen(open === 'none' ? 'block' : 'none');
    }


    function request() {
        // 发起请求，初始化redux中的数据;
        fetch.apiGet("http://localhost:3000/api/user").then(res => {
            if (res.code === 10) {
                dispatch(modifyTitle(res.data.title));
                dispatch(modifyAsideTitle(res.data.asideTitle));
                dispatch(modifyName(res.data.name));
                dispatch(modifybgImg(res.data.bgImg));
                dispatch(modifyAvstar(res.data.avstar));
                setAvstar(res.data.avstar)
                dispatch(modifyColor(res.data.color));
            }
        });
    }


    document.addEventListener('mousedown', (e) => {
        if (popup && !e.path.includes(popup)) {
            fetch.animate(0, -170, 50, fetch.easeOutElastic, left => {
                popup.style.left = left + 'px'
            }) 
        }
    })
    function handleSetName(e) {
        if (e.target.value) {
            dispatch(modifyName(e.target.value))
            setUserName(e.target.value)
        }
    }

    function handleUpload(e) {
        const input = e.target.nextSibling;
        input.addEventListener('change', (e) => {
            const reads= new FileReader();
            const f = input.files[0];
            setBgImg(f);
            if (f) {
                reads.readAsDataURL(f);
                reads.onload=function (e) {
                    dispatch(modifybgImg(this.result))
                };
            }
        });
        input.click();
    }

    function handleUploadAvstar(e) {
        const input = e.target.nextSibling, img =  e.target.previousSibling;
        input.addEventListener('change', (e) => {
            const reads= new FileReader();
            const f = input.files[0];
            setAvstar(f);
            if (f) {
                reads.readAsDataURL(f);
                reads.onload=function (e) {
                    img.src = this.result;
                    dispatch(modifyAvstar(this.result));
                };
            }
        });
        input.click();
    }

    function handleChange(e) {
        if (isChanged) {
            setIsChanges(false);
            e.target.innerHTML = '修改';
        } else {
            setIsChanges(true)
            e.target.innerHTML = '保存';
        }
    }
    const [openForm, setOpenForm] = React.useState(false);

    const handleClickOpen = () => {
      setOpenForm(true);
    };

    function handleTitle1(event) {
        title1 = event.target.value;
    }

    function handleTitle2(event) {
        title2 = event.target.value;
    }
  
    const handleClose = () => {
        setOpenForm(false);
        if (title1) {
            dispatch(modifyTitle(title1));
            setTitle(title1);
        }
        if (title2) {
            dispatch(modifyAsideTitle(title2));
            setAsideTitle(title2);
        }
    };

    function handleSave() {
        // 发送请求，保存修改的数据
        const formData = new FormData();
        if (userName) formData.append('name', userName);
        if (bgImg) formData.append('bgImg', bgImg);
        if (bgColor) formData.append('bgColor', bgColor);
        if (title) formData.append('title', title);
        if (asideTitle) formData.append('asideTitle', asideTitle);
        if (avstar) formData.append('avstar', avstar);

        fetch.apiPostForm("http://localhost:3000/api/modifyuserinfo", formData).then(res => {
            if (res.code === 10) {
                window.location.reload();
            }
        })
    }

    return (
        <div className={styles.userInfo} ref={e => (popup = e)}>
            <div className={styles.avstar}>
                <img src={/(\.png|\.jpg)$/.test(avstar) ? `http://localhost:3001/${avstar}` : avstar} alt="" className={styles.avstar} accept="image/*"></img>
                <button onClick={(e) => handleUploadAvstar(e)}>更换头像</button>
                <input type='file'></input>
            </div>
            <div className={styles.userName}>
                {isChanged ? <input style={{width: '55%'}} onChange={(e) => handleSetName(e)} autoFocus></input> : <span>{name}</span>}
                <button onClick={(e) => handleChange(e)}>修改</button>
            </div>
            <div className={styles.switch}>
                <button onClick={handleClickOpen}>修改主页标语</button>
                <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">请填写主页标语</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title1"
                        label="标语一"
                        onChange={handleTitle1}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title2"
                        label="标语二"
                        fullWidth
                        onChange={handleTitle2}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setOpenForm(false)} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        确定
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={styles.changeBg}>
                <button onClick={(e) => handleUpload(e)}>更换背景图</button>
                <input type='file'></input>
            </div>
            <div className={styles.changeBg}>
                <button onClick={handleControlPicker}>更换背景色</button>
            </div>
             <div className={styles.changeColor} style={{display: open}}>
                <i style={{position: 'absolute', top: '-9px', color: 'black', zIndex: '2', right: '-9px'}}>关闭</i>
                <SketchPicker color={bgColor} onChange={ handleChangeColor }></SketchPicker>
            </div>
            <div className={styles.save}>
                <button onClick={() => handleSave()}>保存</button>
                <button onClick={() => {fetch.animate(0, -170, 50, fetch.easeOutElastic, left => {
                popup.style.left = left + 'px'
            }) }}>退出</button>
            </div>
        </div>
    )
 }) 



export default UserInfo;