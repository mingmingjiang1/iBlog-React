import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnapMsg(props) {
    let { msg, type, msgControl, setMsgControl } = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={msgControl}
                onClose={() => setMsgControl(false)}
                autoHideDuration={1200}
            >
                <Alert severity={type}>
                        {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}