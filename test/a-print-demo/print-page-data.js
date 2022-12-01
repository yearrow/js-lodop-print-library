{
  "Page": {
    "pageAPI": { // 传入总页面的参数
      "method": "post",
      "path": "shared-data/g-statistic-categorys",
      "params": {
        "id": 1
      },
      "serviceId": "node-mb2-shared-data-service"
    },
    
    "pageModel": { // 打印样式
      "model": "A4",
      "position": [1, 1, 1, 1]
    },
    "excelComponents": [
      {
        "name": "table",
        "position": [1, 1, 1, 1],
        "dataAPI": {},
        "orderHeight": 90,
        "excelHeaderColspan": 13,
        "titleName": "点收单",
        "orderModel": [],
        "itemsModel": [],
        "sumRowModel": [],
        "footModel": []
      },
      {
        "name": "image",
        "position": [1, 1, 1, 1],
        "size": [],
        "dataAPI": {}
      }
    ],
    "printEvent":{
      "isOn": true,
      "event": "function(_this,templateData,LODOP){LODOP.On_Return=function(TaskID,Value){if(Number(Value)>0){_this.$http.get('m-account-print-add/'+templateData.order.orgId+'/'+templateData.order.id+'/globalMa.mReceiveOrder').then(data=>{})}}}"
    }
  }  
}