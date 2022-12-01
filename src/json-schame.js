// 页面传入配置结构
export const config = {
  // 在组件中要判断哪些参数是必填，没有该参数时需要抛出错误。
  // 全局配置
  "config":{
    "baseUrl": "", // 接口地址
  },
  "blankPanel":{ // 画布参数
    "setPreviewWindow": {
      "intDispMode": 1,
      "intToolMode": 2,
      "blDirectPrint": 1,
      "inWidth": 0,
      "intHeight": 0,
      "strTitleButtonCaptoin": '打印预览.开始打印'
    },
    "printInita": {
      "Top": 10,
      "Left": 10,
      "Width": 1000,
      "Height": 740,
      "strPrintName": '基于LODOP的打印作业'
    },
    "setPrintPagesize": {
      "intOrient": 2, // 横向打印，固定纸张
      "PageWidth": 0,
      "PageHeight": 0,
      "strPageName": 'A4' // 打印的范围由纸张决定
    },
    "setShowMode": {
      "strModeType": 'LANDSCAPE_DEFROTATED', // 横向打印的预览默认旋转90度（正向显示）
      "varModeValue": 1 // 对应的值, 1或true=是
    }
  },
  "datasource":{ // 该打印模板所需整体数据
    "url":"",
    "type":"",
    "params":"",
    "result":""
  },
  "draw":[
    // 图片
    {
      "type":"image", // 组件名
      "name": "",
      "option": {
        "position":{ // 定位
          "Top": 10,
          "Left": 10,
          "Width": 80,
          "Height": 80,
        },
        "property": { // 固有属性
          "strContent": '',
        },
        "params": { // 配置参数
          "Stretch": 1,
        }
      }
    },
    // 二维码
    {
      "type":"barcode", // 组件名
      "name": "",
      "option": {
        "position":{ // 定位
          "Top": 10,
          "Left": 950,
          "Width": 100,
          "Height": 100,
        },
        "property": { // 固有属性
          "CodeType": "QRCode",
          "CodeValue": "{\"orgId\":#orgId,\"id\":#id}"
        },
        "datamap": { // 数据映射关系
          
        },
        "params": { // 配置参数
          "QRCodeVersion": 7,
        }
      }
    },
    // 表名
    {
      "type":"text", // 组件名
      "name": "",
      "option": {
        "position":{ // 定位
          "Top": 30,
          "Left": 200,
          "Width": 600, // 文字的宽度决定显示的多少，超出会换行，但要高度够用才可显示
          "Height": 50,
        },
        "property": { // 固有属性
          "strContent": "#orgName点验单"
        },
        "params": { // 配置参数
          "Bold": 1,
        }
      }
    },
    // 单号
    {
      "type":"text", // 组件名
      "name": "",
      "option": {
        "position":{ // 定位
          "Top": 80,
          "Left": 750,
          "Width": 150, // 文字的宽度决定显示的多少
          "Height": 20,
        },
        "property": { // 固有属性
          "strContent": "NO.2022113000001"
        },
        "params": { // 配置参数
          "FontSize": 12,
          "FontColor": '#DC143C',
        }
      }
    },
    // 主表
    {
      "type":"tableContent", // 组件名
      "name": "",
      "option": {
        "position":{ // 定位
          "Top": 150,
          "Left": 10,
          "Width": 700,
          "Height": 300, // 指定表格高度，超过也会自动分页
        },
        "property": { // 固有属性

        },
        "params": { // 配置参数

        },
        "datasource":{ // 数据源（自身的数据源用于自身，若使用映射关系找不到时需要找全局，全局找不到则没有，是否需要校验并抛出错误）
          "url":"",
          "type":"",
          "params":"",
          "result":""
        },
        "datamap": { // 数据映射关系
          "orderModel": [
            {
              "label": "组织机构",
              "prop": "orgName",
              "width": "25%",
              "colSpan": 2
            },
            {
              "label": "供应商名称",
              "prop": "supplierName",
              "width": "25%",
              "colSpan": 1,
              "newLine": true
            },
            {
              "label": "账期",
              "prop": "orderDate",
              "width": "25%",
              "colSpan": 1
            }
          ]
        }
      }
    },
    // 从表
    {
      "type":"turnPageTable",
      "name": "",
      "option": {
        "position": { // 定位
          "Top": 210,
          "Left": 10,
          "Width": 1000,
          "Height": 300, // 指定表格高度，超过也会自动分页
        },
        "property": {

        },
        "datasource":{ // 数据源（自身的数据源用于自身，若使用映射关系找不到时需要找全局，全局找不到则没有，是否需要校验并抛出错误）
          "url":"",
          "type":"",
          "params":"",
          "result":""
        },
        "datamap": { // 数据映射关系
          "conditionParams": {
            "lineHeight": 30, // 行高
            "lineNum": 10 // 行数太大，超过页面大小之后会自动分页
          },
          "orderModel": [
            {
              "isParent": true,
              "label": "材料信息",
              "colSpan": 4,
              "children": [
                {
                  "prop": "materialName",
                  "label": "材料名称",
                  "width": "18%"
                },
                {
                  "prop": "materialModel",
                  "label": "规格型号",
                  "width": "8%"
                },
                {
                  "prop": "materialName",
                  "label": "材料名称",
                  "width": "18%"
                },
                {
                  "prop": "materialModel",
                  "label": "规格型号",
                  "width": "8%"
                }
              ]
            },
            {
              "prop": "materialUnit",
              "label": "单位",
              "rowSpan": 2,
              "width": "14%"
            },
            {
              "prop": "quantity",
              "label": "数量",
              "rowSpan": 2,
              "width": "4%"
            },
            {
              "prop": "materialUnit",
              "label": "单位",
              "rowSpan": 2,
              "width": "14%"
            },
            {
              "prop": "quantity",
              "label": "数量",
              "rowSpan": 2,
              "width": "4%"
            }
          ],
          "sumRowModel": [
            {
              "text": "数量合计:######",
              "font": {
                "tdata": "SubSum",
                "format": "UpperMoney",
                "tindex": 6
              },
              "colSpan": 5,
              "value": "#大写合计#"
            },
            {
              "text": "######",
              "font": {
                "tdata": "SubSum",
                "tindex": 6
              },
              "colSpan": 1
            },
            {
              "text": "",
              "font": {
                "tdata": "",
                "tindex": 7
              },
              "colSpan": 1
            },
            {
              "text": "",
              "font": {
                "tdata": "",
                "tindex": 8
              },
              "colSpan": 1
            }
          ]
        },
        "params": { // 配置参数

        }
      }
    }
  ]
}