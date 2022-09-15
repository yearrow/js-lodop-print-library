

function CreateOnePageTable() {
  const LodopComponents = new lodopPrint.DrawComponent()

  // 画布
  LodopComponents.setBlankPanel({})
 
  const templateConf = {
    params: {
      Top: 10,
      Left: 10,
      Width: 700,
      Height: 500,
    },
    config: [
        // { colSpan: 1, rowSpan: 1, value: '内容1', width: '20px', height: '20px'},
        // { colSpan: 1, rowSpan: 1, value: '内容2', width: '30px', height: '30px'},
        // { colSpan: 1, rowSpan: 1, value: '', width: '30px', height: '30px', newLine: true},
        // { colSpan: 1, rowSpan: 1, value: '组织机构', width: '40px', height: '10px'},
        // { colSpan: 1, rowSpan: 1, prop: 'orgName', width: '10px', height: '10px'},

        { colSpan: 1, rowSpan: 4, value: '内容1', width: '10px', height: '20px'},
        { colSpan: 1, rowSpan: 1, value: '内容2', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 1, value: '', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 1, value: '组织机构', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 1, prop: 'orgName', width: '10px', height: '10px', newLine: true},

        { colSpan: 1, rowSpan: 1, value: '供应商', width: '10px', height: '50px'},
        { colSpan: 1, rowSpan: 1, prop: '', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 1, value: '内容3', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 1, value: '', width: '10px', height: '10px', newLine: true},

        { colSpan: 1, rowSpan: 2, value: '供应商', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 2, prop: 'supplierName', width: '10px', height: '10px'},
        { colSpan: 1, rowSpan: 2, value: '内容4', width: '10px', height: '60px'},
        { colSpan: 1, rowSpan: 1, value: '', width: '10px', height: '30px', newLine: true},

        { colSpan: 1, rowSpan: 1, value: '', width: '10px', height: '30px'}
        
    ]
  }

  const templateData = { orgName: '1236596987154', supplierName: '西安易龙软件有限公司' }

  LodopComponents.drawOnePageTable(templateConf, templateData)

  LodopComponents.PREVIEW()
}