import request from '@/utils/request'



export  function getTreeData(nodeid) {

  console.log("api->getTreedata",nodeid)
  return request(
    {
      url: '/SidebarTree',
      method: 'get',
      params:{nodeid}
    }
  )
  
}



export function setTreeData(data) {
  console.log("api->setTreedata:",data)
    return request({
      url: '/SidebarTree',
      method: 'post',
      data
    })
  }


  export default  {getTreeData,setTreeData}