/*
    接口配调用文件
    by:David 2018.6.14
*/
import fly from './config'
import qs from 'qs'

import config from '../config'
const host = config.host
// const appKey = config.appKey
// const appid = config.appid

/**
 * 接口模版====post
 *
 * export const test = params => {return fly.post(`${root}/xx/xx`, qs.stringify(params))}
 *
 * 接口模版====get
 *
 * export const test1 = function(){return fly.get(`${root}/api/getNewsList`)}
 *
 *
 * 用法：
 * 在 页面用引入 test
 * import {test} from '../../http/api.js'
 *
 * test(params).then(res=>{ console.log(res) })
 */

// export const test = params => {
//     return fly.post(`${host}/xx/xx`, qs.stringify(params))
// }

// 通用的get请求
export const get = (params) => {
  return fly.get(`${host}${params.url}`, qs.stringify(params.data))
}

// 通用的post请求
export const post = (params) => {
  return fly.post(`${host}${params.url}`, qs.stringify(params.data))
}

// 通用的post请求
export const deleteRequest = (params) => {
  return fly.delete(`${host}${params.url}`, qs.stringify(params.data))
}

// 通用的post请求
export const put = (params) => {
  return fly.put(`${host}${params.url}`, qs.stringify(params.data))
}

// 微信app用户登录，wx.login成功之后调用，获取或创建系统内用户
// 参数
//   code: 微信小程序登录后 code
//   wx_follower[nickname]:nickname{{$randomInt}}
//   wx_follower[headimgurl]:http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132
//   wx_follower[sex]:1
// 返回
// {
//     "ret": 0 失败 0，成功 1
// }
export const wechatAppLogin = (data) => {
  let params = {
    url: '/api/v1/wechat_app/login/',
    data: data
  }
  return post(params)
  //return fly.get(`${host}${params.url}`, qs.stringify(params.data))
}

// 取得区域信息列表，数据适用mpvue-picker
// 返回
// [{
//   "value": 1,
//   "label": "北京市",
//   "children": [{
//     "value": 1,
//     "label": "北京市",
//     "children": [{
//         "value": 1,
//         "label": "东城区"
//       },
//       {
//         "value": 2,
//         "label": "西城区"
//       }
//     ]
//   }]
// }]
export const getRegionTree = () => {
  let params = {
    url: '/api/v1/provinces/tree'
  }
  return get(params)
  //return fly.get(`${host}${params.url}`, qs.stringify(params.data))
}

// 取得工种分类列表，数据适用mpvue-picker
export const getJobTaxonTree = () => {
  let params = {
    url: '/api/v1/job_taxons/tree'
  }
  return get(params)
}

// 招工列表
// {
//     "paginate_meta": {
//         "current_page": 1,
//         "next_page": null,
//         "prev_page": null,
//         "total_pages": 1,
//         "total_count": 16
//     },
//     "jobs": [
//         {
//             "id": 2,
//             "customer_id": 1,
//             "worker_type": "parttime",
//             "job_taxon_id": 1,
//             "quantity": 10,
//             "pay": 300,
//             "description": "this is desription",
//             "created_at": "2018-09-03T20:31:40.000+08:00",
//             "updated_at": "2018-09-03T20:31:40.000+08:00",
//             "customer_nickname": "",
//             "district_fullname": "北京市-东城区",
//             "job_taxon_name": "主体土建类"
//         },
//         {
//             "id": 1,
//             "customer_id": 1,
//             "worker_type": "parttime",
//             "job_taxon_id": 1,
//             "quantity": 10,
//             "pay": 300,
//             "description": "this is desription",
//             "created_at": "2018-09-03T20:30:37.000+08:00",
//             "updated_at": "2018-09-03T20:30:37.000+08:00",
//             "customer_nickname": "",
//             "district_fullname": "北京市-东城区",
//             "job_taxon_name": "主体土建类"
//         }
//     ]
// }
export const searchJobs = (data) => {
  let params = {
    url: '/api/v1/jobs/search',
    data: data
  }
  return post(params)
  //return fly.post(`${host}/api/v1/jobs/search`, qs.stringify(data))
}

// 今日在线招工人数和浏览次数
export const getTodayCount = () => {
  let params = {
    url: '/api/v1/jobs/today'
  }
  return get(params)
}

// 添加招工
// 参数
// {
//   job:{
//     worker_type: 'parttime',
//   customer_id]:1
//   district_id]:1
//   job_taxon_id]:1
//   quantity]:10
//   pay]:300
//   }
//   [worker_type]:parttime
// job[customer_id]:1
// job[district_id]:1
// job[job_taxon_id]:1
// job[quantity]:10
// job[pay]:300
// job[description]:this is desription
// 返回
// {
//     "id": 17,
//     "customer_id": 1,
//     "worker_type": "parttime",
//     "job_taxon_id": 1,
//     "quantity": 10,
//     "pay": 300,
//     "created_at": "2018-09-04T10:52:16.000+08:00",
//     "updated_at": "2018-09-04T10:52:16.000+08:00"
// }
export const addJob = (data) => {
  let params = {
    url: '/api/v1/jobs',
    data: data
  }
  return post(params)
}

// 取得小程序用户信息，包括工作经验
// 返回
// {
//     "id": 1,
//     "customer_id": 1,
//     "openid": "onkYB5TW-6MET-xerEx_pCvuK7s8",
//     "nickname": "行如风",
//     "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLDQajHxu3uUkDdFVvfhJzughIrsDyjHjFtPGpgMH4Y1caZ0bM6nAGpxqCdA8agX8sGjUfsu5WsHg/132",
//     "created_at": "2018-09-03T20:24:43.000+08:00",
//     "updated_at": "2018-09-04T08:41:53.000+08:00",
//     "mobile": "13322280797",
//     "realname": "",
//     "id_num": null,
//     "id_num_identified_at": null,
//     "mobile_identified_at": null,
//     "customer_works": [
//         {
//             "id": 1,
//             "customer_id": 1,
//             "name": "name196",
//             "start_at": "2017-08-16",
//             "end_at": "2018-08-16",
//             "district_id": 1,
//             "description": "description2d6e69f5-11a2-4ce5-a43a-ac737203574d",
//             "created_at": "2018-09-04T08:48:07.000+08:00",
//             "updated_at": "2018-09-04T08:48:07.000+08:00",
//             "district_name": "东城区",
//             "district_fullname": "北京市-东城区",
//             "work_images": []
//         }
//     ]
// }
export const getWxFollower = (id) => {
  let params = {
    url: '/api/v1/wx_followers/' + id
  }
  return get(params)
}

// 添加工作经验
// 参数
// customer_work:{
//   customer_id]:1,
//   name: 'somename',
//   start_at: '2017-08-16',
//   end_at: '2017-08-16',
//   district_id: 1,
//   work_images_attributes:[ {attachment: file}]
// }
// customer_work[work_images_attributes][][attachment] file 组件的名字
// 返回
// {
//     "id": 4,
//     "customer_id": 1,
//     "name": "name335",
//     "start_at": "2017-08-16",
//     "end_at": "2018-08-16",
//     "district_id": 1,
//     "description": "description36f3aaab-e3e6-47e5-9dc5-e7ec4ec4146e",
//     "created_at": "2018-09-04T09:21:53.000+08:00",
//     "updated_at": "2018-09-04T09:21:53.000+08:00",
//     "district_name": "东城区",
//     "district_fullname": "北京市-东城区",
//     "work_images": []
// }
export const addCustomerWork = (data) => {
  let params = {
    url: '/api/v1/customer_works/',
    data: data
  }
  return post(params)
}
// 删除工作经历
export const delCustomerWork = (id) => {
  let params = {
    url: '/api/v1/customer_works/' + id
  }
  return deleteRequest(params)
}
// 修改工作经历
export const putCustomerWork = (id, data) => {
  let params = {
    url: '/api/v1/customer_works/' + id,
    data: data
  }
  return put(params)
}

// 找活列表
// 参数
//  q[combo_district_id] 1-1-4 招工地点
//  q[job_taxon_id] 工种类别
// 返回
// {
//     "paginate_meta": {
//         "current_page": 1,
//         "next_page": null,
//         "prev_page": null,
//         "total_pages": 0,
//         "total_count": 0
//     },
//     "jobs": []
// }
export const searchApplicants = (data) => {
  let params = {
    url: '/api/v1/applicants/search',
    data: data
  }
  return post(params)
}

// 添加找活
// {
//     "id": 33,
//     "realname": "realname755",
//     "age": null,
//     "nation": "",
//     "address": "",
//     "description": "this is desription",
//     "state": "pending",
//     "created_at": "2018-09-04T09:27:11.000+08:00",
//     "updated_at": "2018-09-04T09:27:11.000+08:00"
// }
export const addApplicant = (data) => {
  let params = {
    url: '/api/v1/applicants',
    data: data
  }
  return post(params)
}

// 获取短信验证码
// 返回
// {
//     "status": 1,
//     "sms": {
//         "mobile": "13322280797",
//         "validation_context": null,
//         "errors": {},
//         "code": "28283",
//         "send_at": "2018-09-03T20:24:20.769+08:00"
//     }
// }
// {
//     "status": 0,
//     "sms": {
//         "mobile": "1332228079",
//         "validation_context": null,
//         "errors": {
//             "mobile": [
//                 "电话号码不正确"
//             ]
//         }
//     }
// }
export const getVerifyCode = (data) => {
  // console.log( "data=", data)
  let params = {
    url: '/sms',
    data: data
  }
  return post(params)
}

// 手机信息认证
// 参数
//  mobile:13322280797
//  code:28283

export const identifyMobile = (data) => {
  let params = {
    url: '/api/v1/wx_followers/1/identify_mobile',
    data: data
  }
  return post(params)
}

// 身份证实名验证
// 参数
//  id_num:211204198803240012
//  realname:卡卡

export const identifyIdnum = (data) => {
  let params = {
    url: '/api/v1/wx_followers/1/identify_id_num',
    data: data
  }
  return post(params)
}
