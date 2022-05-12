import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import fetch from '../utils';
import TableRow from '@material-ui/core/TableRow';
import styles from './TableShow.module.css';
import AlertBox from '../views/AlertBox';


const columns = [
  { id: 'id', label: 'Id', minWidth: 50, key: 0},
  { id: 'filename', label: '文件名', minWidth: 120, key: 1 },
  {
    id: 'title',
    label: '标题',
    minWidth: 100,
    key: 2,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: '分类',
    minWidth: 170,
    key: 3,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: '创建时间',
    minWidth: 50,
    key: 4,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'operation',
    label: '操作',
    minWidth: 200,
    key: 5,
    format: (value) => value.toFixed(2),
  }
];

// 函数
function toArticleDetail(url, category, bgImgUrl, title) {
  // 跳转至文章详情页
  window.location.assign(`http://localhost:3001/get?url=${url}&title=${title}&category=${category}&bgImgUrl=${bgImgUrl}`)
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 480,
  },
});

export default function TableShow() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate()
  React.useEffect(requestList, []);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function requestList() {
    fetch.apiGet('http://localhost:3000/api/list', {
      }).then((res) => {
        setRows(res.data.map((item, index) => {
          return createData(index+1, item.filename, item.title, item.date, item.category, item.url, item.bgImgUrl, item.labels, item.isTop, item.desc, item.id)
        }))
      })
  }

  function requestDelete(file, url, bgImgUrl) {
    fetch.apiPost('http://localhost:3000/api/delete', {
        file,
        url,
        bgImgUrl
      }).then((res) => {
        setRows(res.data.map((item, index) => {
          return createData(index+1, item.filename, item.title, item.date, item.category, item.url, item.bgImgUrl)
        }))
      })
  }

  function toArticleEdit(url, category, bgImgUrl, title) {
    // 跳转至文章编辑页，可能要配合markedDown
    window.location.assign(`http://localhost:3001/edit?url=${url}&title=${title}&category=${category}&bgImgUrl=${bgImgUrl}`)
  }
  function createData(id, filename, title, date, category, url, bgImgUrl, labels, isTop, desc, idx) {
    let alertM = React.createRef(); 
    let operation = 
          <div className={styles.btnGroup}>
              <AlertBox ref={alertM} title="提示：" msg="确定删除该文件吗" handleConf={requestDelete} />
              <button className={`btn-info ${styles.mini}`} onClick={() => toArticleDetail(url, category, bgImgUrl, title)}>查看文章</button>
              <button className={`btn-info ${styles.mini}`} onClick={() => toArticleModify({bgImgUrl, title, labels, isTop, desc, idx})}>修改信息</button>
              <button className={`btn-info ${styles.mini}`} onClick={() => toArticleEdit(url, category, bgImgUrl, title)}>编辑文章</button>
              <button className={`btn-alert ${styles.mini}`} onClick={() => toArticleDelete(alertM, filename, url, bgImgUrl)}>删除文章</button>
          </div>
      
    return { id, filename, title, date, category, operation};
  }

  function toArticleDelete(node, file, url, bgImgUrl) {
    // 文章删除，弹出弹窗，询问是否确定删除
    switchUser(file, url, bgImgUrl, node);
  }
  
  // 数据信息应该还包含服务端文件的url
  // | id(唯一标识符，用于从数据库中删除) | 文件名  | 标题 | 分类  | 标签 | 后端文件url(用于查看文件) |

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function toArticleModify(o) {
    // 携带参数打开编辑页面，利用携带的参数填充编辑页面
    navigate('/bokemanage/modify', {
      state: o
    });
  }

  function switchUser(filename, url, bgImgUrl, node) {

    

    if (node) {
      node.current.handleOpen(filename, url, bgImgUrl);
    }
  }

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    inputProps: { 'aria-label': '每页行数' },
                    native: true,
                  }}
                  labelRowsPerPage="每页行数"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
