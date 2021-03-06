import React from 'react';
import ReactDOM from "react-dom/client";
import { useLocation } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../components/FileUpload.module.css';
import DialogFillIn from '../components/DialogFillIn';
import fetch from '../utils';
import SnapMsg from '../components/SnapMsg';

let res, labels;
export default function BokeModify(props) {
    const uploadImg = React.createRef();
    const uploadArticle = React.createRef();
    let [select, setSelect] = React.useState(['']);
    let [optionsConf, setConf] = React.useState({});
    const [msgError, setMsgError] = React.useState(false);
    const [msgSuccess, setMsgSuccess] = React.useState(false);
    const [msgWarning, setMsgWarning] = React.useState(false);
    React.useEffect(requestConfig, []);
    React.useEffect(() => initImgReminder(params.bgImgUrl), []);
    let [options, setOptions] = React.useState([]);
    let location = useLocation();
    let params = location.state;
    function requestConfig() {
        fetch.apiGet('http://localhost:3000/api/uploadconfig', {
        }).then(c => {
            setOptions((prev) => {
                let copy = prev.slice();
                copy = c.options;
                return copy;
            })
            res = c.folders;
            labels = c.labels;
            setConf(c);
            setSelect(new Array(c.total).fill(''));
            setTotal(c.total)
            
            let m = labels.reduce((pre, cur) => {
                if (params.labels.split(',').includes(cur)) pre[cur] = true;
                else pre[cur] = false;
                return pre;
            }, {})
            setState({...state, ...m});
        }).catch(e => console.log(e))
    }

    function requestUpload(data) {
        fetch.apiPostForm('http://localhost:3000/api/up', data)
        .then(res => {
            console.log(res)
            if (res?.code === 10) {
                setMsgSuccess(true);
            } else {
                setMsgError(true);
            } 
        })
    }

    // ??????
    let [title, setTitle] = React.useState(params.title);
    function handleTitle(e) {
        setTitle(e.target.value)
    }

    // ??????
    let [total, setTotal] = React.useState(0);

    // ??????????????????
    const [state, setState] = React.useState({});
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    // ???????????????
    let [isTop, setIsTop] = React.useState(params.isTop);

    const handleTop = (event) => {
        setIsTop(event.target.value);
    };

    // ??????????????????
    let [bgImg, setBgImg] = React.useState(null);

    function initImgReminder(m) {
        // ???????????????????????????
        let spanNode = document.createElement('span');
        let tmp = m.split('\\').at(-1);
        spanNode.innerText = tmp;
        uploadImg.current.parentNode.appendChild(spanNode);
        setBgImg(tmp)
    }

    function clickImg(m) {
        function handleImg(e) {
            setBgImg(e.target.files[0]);
            let size = uploadImg.current.parentNode.children.length;
            if (size >= 3) {
                var spanN = uploadImg.current.parentNode.children[size-1];
                uploadImg.current.parentNode.removeChild(spanN);
            }
            let spanNode = document.createElement('span');
            if (!e.target.files[0].name) return;
            if (m) {
                spanNode.innerText = m;
                uploadImg.current.parentNode.appendChild(spanNode);
                return;
            }
            spanNode.innerText = e.target.files[0].name;
            uploadImg.current.parentNode.appendChild(spanNode);
        }
        uploadImg.current.parentNode.children[0].click();
        return handleImg;
    }


    // ????????????????????????
    let [desc, setDesc] = React.useState(params.desc);
    function handleTextareaChange(e) {
        setDesc(e.target.value);
    }
    // ????????????
    function handleSubmit() {
        let formData = new FormData();
        formData.append('id', params.idx);
        formData.append('bgImg', bgImg);
        formData.append('labels', JSON.stringify(state));
        formData.append('title', title);

        formData.append('desc', desc)
        formData.append('isTop', isTop);

        if (!title) {
            setMsgWarning(true);
            return;
        }
        requestUpload(formData);
    }
    function handleReset() {
        // ??????????????????
        setTitle('');
        setIsTop('0');
        setDesc('');
        // ??????labels
        let stateLab = {};
        for (let label of optionsConf.labels) {
            stateLab[label] = false;
        }
        setState({...stateLab});
        // setState(optionsConf.labe)
        setSelect(new Array(total).fill(""));
        // ??????formdata
        window.location.reload();

        if (uploadImg.current.parentNode.children[2]) uploadImg.current.parentNode.children[2].innerText = '';
        if (uploadArticle.current.parentNode.children[2]) uploadArticle.current.parentNode.children[2].innerText = '';
    }


    function handleCreateLabel() {
        let div = document.createElement('div');
        document.body.appendChild(div);
        const root = ReactDOM.createRoot(
            div
        );

        function handlerReceiveKeywords(fromChild) {
            let stateLab = {};
            for (let label of optionsConf.labels) {
                stateLab[label] = false;
            }
            setState({ ...state, ...stateLab, [fromChild]: true});
        }
        root.render(React.createElement(DialogFillIn, {
            'onReceiveKeywords': handlerReceiveKeywords,
            'root': root,
            'div': div,
            'msg': '?????????????????????'
        }))
    }

    return (
        <div className={styles.container}>
            <SnapMsg msg={"??????????????????"} type={"success"} msgControl={msgSuccess} setMsgControl={setMsgSuccess}></SnapMsg>
            <SnapMsg msg={"??????????????????????????????????????????"} type={"error"} msgControl={msgError} setMsgControl={setMsgError}></SnapMsg>
            <SnapMsg msg={"???????????????????????????????????????"} type={"warning"} msgControl={msgWarning} setMsgControl={setMsgWarning}></SnapMsg>
            <h2>??????????????????</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.specialTh}>
                            ????????????
                        </th>
                        <th>
                            <TextField label="?????????????????????" color="secondary" value={title} onChange={(e) => handleTitle(e)}/>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            ????????????
                        </th>
                        <th>
                            <FormControl component="fieldset">
                                <FormGroup row={true}>
                                    {
                                        Object.keys(state).map((key, index) => {
                                            return (<FormControlLabel
                                            key={index}
                                            control={<Checkbox checked={state[key]} onChange={handleChange} name={key} />}
                                            label={key}
                                            />)
                                        })
                                    }
                                </FormGroup>
                                <FormHelperText>
                                    <i className='iconfont icon_tianjia' style={{fontWeight: '900'}} onClick={handleCreateLabel}>?????????????????????</i>
                                </FormHelperText>
                            </FormControl>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            ????????????
                        </th>
                        <th>
                        <RadioGroup aria-label="gender" name="isTop" value={isTop} onChange={handleTop}>
                            <FormControlLabel value="0" control={<Radio />} label="???" />
                            <FormControlLabel value="1" control={<Radio />} label="???" />
                        </RadioGroup>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            ????????????
                        </th>
                        <th className={styles.uploadTh}>
                            <input type="file" name='bgImg' onChange={(e) => clickImg()(e)}></input>
                            <button className='btn-info' onClick={clickImg} ref={uploadImg}>
                                <i className='iconfont icon_tupian'></i> ????????????
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            ????????????
                        </th>
                        <th>
                            <textarea className={styles.textInput} value={desc} onChange={e => handleTextareaChange(e)}></textarea>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th className={styles.btnGroup}>
                            <button className='btn-info' onClick={handleSubmit}>??????</button>
                            <button className='btn-null' onClick={handleReset}>??????</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// ??????????????????????????????????????????????????????
/* 
?????????
??????????????????????????????;
category????????????Tags?????????;
????????????;
????????????????????????;
?????????????????????????????????????????????
*/
