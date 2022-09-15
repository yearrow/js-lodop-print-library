

function CreateTurnPageTable() {
  const LodopComponents = new lodopPrint.DrawComponent()

  // 画布
  LodopComponents.setBlankPanel({})
 
  const templateConf = {
    params: {
      Top: 10,
      Left: 10,
      Width: 700,
      Height: 500, // 指定表格高度，超过也会自动分页
      lineHeight: 30, // 行高
      lineNum: 30, // 行数太大，超过页面大小之后会自动分页
    },
    itemsModel: [
      {
        isParent: true,
        label: '材料信息',
        colSpan: 2,
        children: [
          {
            prop: 'materialName',
            label: '材料名称',
            width: '8%'
          },
          {
            prop: 'materialModel',
            label: '规格型号',
            width: '8%'
          }
        ]
      },
      {
        prop: 'materialUnit',
        label: '单位',
        rowSpan: 2,
        width: '4%'
      },
      {
        prop: 'quantity',
        label: '数量',
        rowSpan: 2,
        width: '4%'
      }
    ],
    sumRowModel: [
      {
        text: '金额合计:######',
        font: {
          tdata: 'SubSum',
          format: 'UpperMoney',
          tindex: 4
        },
        colSpan: 3,
        value: '#大写合计#'
      },
      {
        text: '######',
        font: {
          tdata: 'SubSum',
          tindex: 4
        },
        colSpan: 1
      }
    ]
  }

  const templateData = [
      { materialName: '花覅赫尔和覅色uu复核发', materialModel: '是挥', materialUnit: '林二', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10},
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www', quantity: 10 }
  ]

  LodopComponents.drawTurnPageTable(templateConf, templateData)

  LodopComponents.PREVIEW()
}