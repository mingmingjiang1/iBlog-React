import service from './request'
 
/**
 * POST 请求封装
*/
export function apiPost(url, data) {
  return service.request({
    url: url,
    method: 'post',
    data
  })
}


export function apiPostForm(url, data) {
    return service.request({
      url: url,
      method: 'post',
      data,
      headers:  {
          "Content-Type": "multipart/form-data"}
    })
  }
 
/**
 * GET 请求封装
*/
export function apiGet(url, data) {
  return service.request({
    url: url,
    method: 'get',
    data
  })
}
 
/**
 * PUT 请求封装
*/
export function apiPut(url, data) {
  return service.request({
    url: url,
    method: 'put',
    data
  })
}

// 使用方法：apiPut(url, data).then()
