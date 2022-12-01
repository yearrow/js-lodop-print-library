// 根据转好的json,画出打印预览页面

async function CreatePrintDemo() {
  const config = lodopPrint.config
  const LodopComponents = new lodopPrint.DrawComponent(config)

  // 画布
  LodopComponents.setBlankPanel()

  let globalParams = {
    id: 189654654564564,
    orgId: 14234354325454,
    orgName: '测试项目部吉林科技灵飞经科技厅了人'
  }

  // 获取全局配置，是否需要多个datasource,还要获取主表信息
  if (config.datasource.url !== '') {
    // globalParams.id = 189654654564564
  }

  if (config.draw && config.draw.length > 0) {
    // 循环组件
    for(let i = 0; i < config.draw.length; i++) {
      // ** 图片
      if (config.draw[i].type === 'image') {
        // 根据图片key获取真实地址
        config.draw[i].option.property.strContent = 'URL:https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621122252%2F210416122252-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672395888&t=203876dd9d3ffede6004452db8bbc5db'
        LodopComponents.drawImage(config.draw[i].option)
      }

      // ** 二维码
      if (config.draw[i].type === 'barcode') {
        let str = config.draw[i].option.property.CodeValue
        for (const paramsKey in globalParams) {
            let key = '#' + paramsKey
            str = str.replace(new RegExp(key, 'g'), globalParams[paramsKey])  
        }
        config.draw[i].option.property.CodeValue = str
        LodopComponents.drawBarcode(config.draw[i].option)
      }

      // ** 文本
      if (config.draw[i].type === 'text') {
        let str = config.draw[i].option.property.strContent
        for (const paramsKey in globalParams) {
            let key = '#' + paramsKey
            str = str.replace(new RegExp(key, 'g'), globalParams[paramsKey])  
        }
        config.draw[i].option.property.strContent = str
        LodopComponents.drawText(config.draw[i].option)
      }
      
      // ** 主表陈列式表格
      if (config.draw[i].type === 'tableContent') {
        // const exteranlParams = await getSourceData(config.draw[i].option.datasource)
        const exteranlParams = {
          supplierName: '243',
          orderDate: '2022-09-15',
          creator: '某某'
        }
        let allParams = Object.assign({}, globalParams, exteranlParams || {})

        const option = config.draw[i].option

        const templateConf = {
          position: option.position,
          params: option.params,
          orderModel: option.datamap.orderModel
        }

        LodopComponents.drawTableContent(templateConf, allParams)

      }

      // ** 翻页表格
      if (config.draw[i].type === 'turnPageTable') {
        const option = config.draw[i].option

        const templateConf = {
          position: option.position,
          property: option.property,
          conditionParams: {
            lineHeight: option.datamap.conditionParams.lineHeight || 30, // 行高
            lineNum: option.datamap.conditionParams.lineNum || 30, // 行数太大，超过页面大小之后会自动分页
          },
          orderModel: option.datamap.orderModel,
          sumRowModel: option.datamap.sumRowModel
        }
        // 通过option.datasource 获取数据
        const templateData = [
            { materialName: '花覅赫尔和覅色uu复核发', materialModel: '是挥', materialUnit: '林二', quantity: 10},
            { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
            // { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10 }
        ]
        LodopComponents.drawTurnPageTable(templateConf, templateData)
      }
    }
  }



  LodopComponents.PREVIEW()
}