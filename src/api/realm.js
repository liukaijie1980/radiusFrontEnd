import request from '@/utils/request'


export function GetRealms( node_pid) {  
    console.log("api GetRealms",node_pid)
     
    return request({
      url: '/realm',
      method: 'get',
      params:{
        node_pid:node_pid
      } 
    })
  }



export function AddRealm(data) {
  console.log("api AddRealm",data)
  //request第3个参数data是固定不能改别的名字
  return request({
    url: '/realm',
    method: 'post',
    data
  })
}

export function UpdateRealm(data) {
  console.log("api UpdateRealm",data)
  //request第3个参数data是固定不能改别的名字
  return request({
    url: '/realm',
    method: 'put',
    data
  })
}

export function DeleteRealm( realm) {
  console.log("api DeleteRealm",realm)
  return request({
    url: '/realm',
    method: 'delete',
    params:{
      
        realm:realm,
    }
  })
}
