import React from 'react';
import ReactDOM from "react-dom/client";
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import fetch from '../utils';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './FileUpload.module.css';
import DialogFillIn from './DialogFillIn';
import SnapMsg from './SnapMsg';

const mStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));
let res;
let selectIndex = ['', '', ''];


export default function FileUpload(props) {
    const [msgSuccess, setMsgSuccess] = React.useState(false);
    const [msgError1, setMsgError1] = React.useState(false);
    const [msgError2, setMsgError2] = React.useState(false);
    const [msgWarning, setMsgWarning] = React.useState(false);
    const classes = mStyles();
    const uploadImg = React.createRef();
    const uploadArticle = React.createRef();
    React.useEffect(requestConfig, []);
    let [select, setSelect] = React.useState(['']);
    let [optionsConf, setConf] = React.useState({});
    let [options, setOptions] = React.useState([]);
    function requestConfig() {
        fetch.apiGet('http://localhost:3000/api/uploadconfig', {
            
        }).then(c => {
            setOptions((prev) => {
                let copy = prev.slice();
                copy = c.options;
                return copy;
            })
            res = c.folders;
            setConf(c);
            setSelect(new Array(c.total).fill(''));
            setTotal(c.total)
            // // ??????labels
            let stateLab = {};
            for (let label of c.labels) {
                stateLab[label] = false;
            }
            setState(stateLab)
        }).catch(e => console.log(e))
    }

    async function requestUpload(data) {
        return await fetch.apiPostForm('http://localhost:3000/api/up', data)
    }

    // ??????
    let [title, setTitle] = React.useState('');
    function handleTitle(e) {
        setTitle(e.target.value)
    }

    // ??????

    let [total, setTotal] = React.useState(0);
    

    // ??????????????????
    const [state, setState] = React.useState({});
    //   const { gilad, jason, antoine } = state;
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    // ??????????????????
    let [isTop, setIsTop] = React.useState("0");

    const handleTop = (event) => {
        setIsTop(event.target.value);
    };

    // ??????????????????
    let [bgImg, setBgImg] = React.useState(null);

    function clickImg() {
        function handleImg(e) {
            setBgImg(e.target.files[0]);
            let size = uploadImg.current.parentNode.children.length;
            if (size >= 3) {
                var spanN = uploadImg.current.parentNode.children[size-1];
                uploadImg.current.parentNode.removeChild(spanN);
            }
            let spanNode = document.createElement('span');
            if (!e.target.files[0].name) return;
            spanNode.innerText = e.target.files[0].name;
            uploadImg.current.parentNode.appendChild(spanNode);
        }
        uploadImg.current.parentNode.children[0].click();
        return handleImg;
    }

    // ??????????????????
    let [article, setArticle] = React.useState(null);
    // function handleArticle(e) {
        
    // }

    function clickArticle() {
        function handleArticle(e) {
            setArticle(e.target.files[0]);
            let size = uploadArticle.current.parentNode.children.length;
            if (size >= 3) {
                var spanN = uploadArticle.current.parentNode.children[size-1];
                uploadArticle.current.parentNode.removeChild(spanN);
            }
            let spanNode = document.createElement('span');
            if (!e.target.files[0].name) return;
            spanNode.innerText = e.target.files[0].name;
            uploadArticle.current.parentNode.appendChild(spanNode);
        }
        uploadArticle.current.parentNode.children[0].click();
        return handleArticle;
    }

    // ????????????????????????
    let [desc, setDesc] = React.useState('');
    function handleTextareaChange(e) {
        setDesc(e.target.value);
    }
    // ????????????
    async function handleSubmit() {
        // ???????????? ?????????formdata????????????
        let formData = new FormData();
        formData.append('article', article);
        formData.append('bgImg', bgImg);
        formData.append('labels', JSON.stringify(state));
        formData.append('title', title);
        // ????????????
        formData.append('category', select);
        // formData.append('label', )
        
        formData.append('desc', desc)
        formData.append('isTop', isTop);
        // ???????????????????????????????????????????????????????????????????????????????????????????????????
        if (!title || !article || !select[0]) {
            setMsgWarning(true);
            return;
        }
        
        
        let res = await requestUpload(formData);
        if (res?.code === 10) {
            setMsgSuccess(true);
        } else if (res?.code === 140){
            setMsgError1(true);
        } else if (res?.code === 141) {
            setMsgError2(true);
        }
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

    // ???????????????????????????????????????????????????????????????state
    function handleSelect(e, index) {
        setSelect(prev => {
            prev[index] = e.target.value;
            const copy = prev.slice();
            return copy;
        })
        let t = 0, cur = res;
        // ?????????????????????????????????
        for (let i = 0;i < index;++i) {
            if (selectIndex[i] !== '' && selectIndex[i] !== '-1') {
                cur = cur[selectIndex[i]].children;
            }
        }
        cur = cur === undefined ? [] : cur;
        // ????????????????????????????????????
        for (let i = 0;i < cur?.length;++i) {
            if (cur[i].name === e.target.value) {
                t = i;
            }
        }

        selectIndex[index] = t;

        // setSelect(prev => {
        //     prev[index] = e.target.value;
        //     const copy2 = prev.slice();
        //     return copy2;
        // });
        // ??????????????????
        if (index + 1 < options.length) {
            setOptions(prev => {
                let tmp = [];
                for (let item of cur) {
                    let t = {};
                    t.name = item.name;
                    tmp.push(t);
                }
                prev[index] = tmp;
                prev[index+1] = cur[t]?.children || [];
                
                // ????????????????????????????????????????????????????????????????????????????????????????????????
                for (let i = index+2; i < options.length;++i) {
                    prev[i] = {
                        name: ''
                    }
                }
                const copy = prev.slice();
                return copy;
            })
        } else {
            setOptions((prev) => {
                let tmp = [];
                for (let item of cur) {
                    let t = {};
                    t.name = item.name;
                    tmp.push(t);
                }
                prev[index] = tmp;
                prev.push([]);
                const copy = prev.slice();
                return copy;
            })
        }


    }

    function handleCreateFolder(index) {
        // ???????????????????????????????????????????????????
        let div = document.createElement('div');
        document.body.appendChild(div);
        const root = ReactDOM.createRoot(
            div
        );

        function handlerReceiveKeywords(fromChild) {
            // ????????????options??????
            // ?????????????????????????????????
            let cur = res || options;
            for (let i = 0;i < index;++i) {
                if (selectIndex[i] !== '' && selectIndex[i] !== '-1') {
                    cur = cur[selectIndex[i]].children;
                } else if (selectIndex[i] === '-1') cur = [];
            }

            selectIndex[index] = '-1';
             if (index + 1 < options.length) {
                setOptions(prev => {
                    let tmp = [];
                    for (let item of cur) {
                        let arr = {};
                        arr.name = item.name;
                        tmp.push(arr);
                    }
                    // ??????????????????????????????
                    tmp.push({
                        'name': fromChild
                    })
                    prev[index] = tmp;
                    prev[index+1] = [];
                    
                    // ????????????????????????????????????????????????????????????????????????????????????????????????
                    for (let i = index+2; i < options.length;++i) {
                        prev[i] = {
                            name: ''
                        }
                    }
                    const copy = prev.slice();
                    return copy;
                })
             } else {// ?????????????????????
                setOptions((prev) => {
                    let tmp = [];
                    // ?????????????????????????????????
                    for (let item of cur) {
                        let arr = {};
                        arr.name = item.name;
                        tmp.push(arr);
                    }
                    // ??????????????????????????????
                    tmp.push({
                        'name': fromChild
                    })
                    prev[index] = tmp;
                    prev.push([]);
                    const copy = prev.slice();
                    // res = copy.slice();
                    return copy;
                })
            }
            setSelect(prev => {
                prev[index] = fromChild;
                const copy = prev.slice();
                return copy;
            })  
            // select[index] = fromChild;
        }
        root.render(React.createElement(DialogFillIn, {
            'onReceiveKeywords': handlerReceiveKeywords,
            'root': root,
            'div': div,
            'msg': "????????????????????????"
        }))
        // ?????????????????????????????????????????????????????????????????????????????????????????????;
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
            <SnapMsg msg={"??????????????????????????????????????????"} type={"error"} msgControl={msgError1} setMsgControl={setMsgError1}></SnapMsg>
            <SnapMsg msg={"??????????????????????????????????????????????????????????????????????????????"} type={"error"} msgControl={msgError2} setMsgControl={setMsgError2}></SnapMsg>
            <SnapMsg msg={"???????????????????????????????????????"} type={"warning"} msgControl={msgWarning} setMsgControl={setMsgWarning}></SnapMsg>
            <h2>????????????</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.specialTh}>
                            ????????????
                        </th>
                        <th>
                            <TextField label="?????????????????????" color="secondary" value={title} required={true} onChange={(e) => handleTitle(e)}/>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            ????????????
                        </th>
                        <th>
                            {
                            options.map((item, index) => {
                                 // ?????????select???????????????????????????????????????????????????????????????0????????????res???????????????????????????
                                 return (
                                        <FormControl className={classes.formControl} key={index}>
                                            <Select
                                            value={select[index] || ""}
                                            onChange={(e) => handleSelect(e, index)}
                                            displayEmpty
                                            className={classes.selectEmpty}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">?????????</MenuItem>
                                                {
                                                    options[index].length ? options[index].map((item, index) => <MenuItem value={item.name} key={index}>{item.name}</MenuItem>) : null
                                                }
                                            </Select>
                                            <FormHelperText color="black"><i className='iconfont icon_tianjia' style={{fontWeight: '900', color: '#4987cd'}} onClick={() => handleCreateFolder(index)}> ???????????????</i></FormHelperText>
                                        </FormControl>
                                    )
                                })
                            } 
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
                                    <i className='iconfont icon_tianjia' style={{fontWeight: '900'}} onClick={handleCreateLabel}> ?????????????????????</i>
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
                            <input type="file" name="article" onChange={(e) => clickArticle()(e)} ref={uploadArticle}></input>
                            <button className='btn-info' onClick={clickArticle}>
                                <i className='iconfont icon_yunshangchuan'></i> ????????????
                            </button>
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
                            <button className='btn-info' onClick={() => handleSubmit()}>??????</button>
                            <button className='btn-null' onClick={handleReset}>??????</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
