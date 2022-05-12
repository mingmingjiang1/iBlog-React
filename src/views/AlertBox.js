import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { Component } from "react"

export default class AlertBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: '',
            url: '',
            bgImgUrl: ''
        }
        this.navigate = props.navigate;
        this.title = props.title || 'Tips:';
        this.msg = props.msg || "您确定要退出登陆吗？";
        this.requestDelete = props.handleConf;
    }

    
    handleClose = () => {
      this.setState({
          open: false
      })
    };
    handleOpen = (file, url, bgImgUrl) => {
        this.setState({
            file: file,
            open: true,
            url: url,
            bgImgUrl: bgImgUrl,
        })
      };
    
    handleConfirm = () => {
        if (this.navigate) {
            this.navigate('/sign');
            return;
        }
        // 删除某项
        console.log(222, this.state)
        this.requestDelete(this.state.file, this.state.url, this.state.bgImgUrl);
        this.setState({
            open: false
        })
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {this.title}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.msg}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose}>取消</Button>
                    <Button onClick={this.handleConfirm} autoFocus>
                        确定
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
