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

    // 标题
    let [title, setTitle] = React.useState(params.title);
    function handleTitle(e) {
        setTitle(e.target.value)
    }

    // 总数
    let [total, setTotal] = React.useState(0);

    // 复选框控制组
    const [state, setState] = React.useState({});
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    // 单选框控制
    let [isTop, setIsTop] = React.useState(params.isTop);

    const handleTop = (event) => {
        setIsTop(event.target.value);
    };

    // 上传图片控制
    let [bgImg, setBgImg] = React.useState(null);

    function initImgReminder(m) {
        // 用原本的文件名填充
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


    // 上传简要描述控制
    let [desc, setDesc] = React.useState(params.desc);
    function handleTextareaChange(e) {
        setDesc(e.target.value);
    }
    // 提交按钮
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
        // 重置所有表单
        setTitle('');
        setIsTop('0');
        setDesc('');
        // 处理labels
        let stateLab = {};
        for (let label of optionsConf.labels) {
            stateLab[label] = false;
        }
        setState({...stateLab});
        // setState(optionsConf.labe)
        setSelect(new Array(total).fill(""));
        // 清空formdata
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
            'msg': '请输入标签名称'
        }))
    }

    return (
        <div className={styles.container}>
            <SnapMsg msg={"博客修改成功"} type={"success"} msgControl={msgSuccess} setMsgControl={setMsgSuccess}></SnapMsg>
            <SnapMsg msg={"文件上传失败，请检查文件格式"} type={"error"} msgControl={msgError} setMsgControl={setMsgError}></SnapMsg>
            <SnapMsg msg={"博客标题、上传文件不能为空"} type={"warning"} msgControl={msgWarning} setMsgControl={setMsgWarning}></SnapMsg>
            <h2>文章信息修改</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.specialTh}>
                            文章标题
                        </th>
                        <th>
                            <TextField label="请输入文章标题" color="secondary" value={title} onChange={(e) => handleTitle(e)}/>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            选择标签
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
                                    <i className='iconfont icon_tianjia' style={{fontWeight: '900'}} onClick={handleCreateLabel}>添加自定义标签</i>
                                </FormHelperText>
                            </FormControl>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            是否置顶
                        </th>
                        <th>
                        <RadioGroup aria-label="gender" name="isTop" value={isTop} onChange={handleTop}>
                            <FormControlLabel value="0" control={<Radio />} label="否" />
                            <FormControlLabel value="1" control={<Radio />} label="是" />
                        </RadioGroup>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            封面上传
                        </th>
                        <th className={styles.uploadTh}>
                            <input type="file" name='bgImg' onChange={(e) => clickImg()(e)}></input>
                            <button className='btn-info' onClick={clickImg} ref={uploadImg}>
                                <i className='iconfont icon_tupian'></i> 上传封面
                            </button>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            文章简介
                        </th>
                        <th>
                            <textarea className={styles.textInput} value={desc} onChange={e => handleTextareaChange(e)}></textarea>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th className={styles.btnGroup}>
                            <button className='btn-info' onClick={handleSubmit}>提交</button>
                            <button className='btn-null' onClick={handleReset}>重置</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// 前端，修改页面接口，后端修改页面接口
/* 
其余：
鼠标放进去，图片放大;
category小卡片，Tags小卡片;
页面美观;
个人账户信息控制;
个人账户信息与文件数据库相关联
*/
