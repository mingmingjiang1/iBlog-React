import { getToken, setToken } from './token';
import { apiGet, apiPost, apiPut, apiPostForm } from './fetch';
import { preProcess, formatTime } from './utils';
let exports = {
    getToken,
    setToken,
    apiGet,
    apiPost,
    apiPut,
    apiPostForm,
    preProcess,
    formatTime,
}
export default exports;