

function CreateTableContent() {
  const LodopComponents = new lodopPrint.DrawComponent()

  // 画布
  LodopComponents.setBlankPanel({})
 
  const templateConf = {
    params: {
      Top: 10,
      Left: 500,
      Width: 500,
      Height: 300
    },
    style: {
      ItemType: 1
    },
    config: [
        {
          label: '物资主管',
          width: '25%',
          colSpan: 2
        },
        {
          label: '收料人',
          width: '25%',
          colSpan: 1
        },
        {
          label: '交料人',
          width: '25%',
          colSpan: 1
        },
        {
          label: '制单人',
          width: '20%',
          colSpan: 1
        }
      ]
  }
  LodopComponents.drawTableContent(templateConf, [])

  LodopComponents.PREVIEW()
}



function CreateTableContent2() {
  const LodopComponents = new lodopPrint.DrawComponent()

  // 画布
  LodopComponents.setBlankPanel({})
 
  const templateConf = {
    params: {
      Top: 10,
      Left: 10,
      Width: 500,
      Height: 300
    },
    style: {
      ItemType: 1
    },
    config: [
        {
          label: '组织机构',
          prop: 'orgName',
          width: '25%',
          colSpan: 2
        },
        {
          label: '供应商名称',
          prop: 'supplierName',
          width: '25%',
          colSpan: 1,
          newLine: true
        },
        {
          label: '账期',
          prop: 'orderDate',
          width: '25%',
          colSpan: 1
        },
        {
          label: '制单人',
          prop: 'creator',
          width: '20%',
          colSpan: 1
        }
      ]
  }

  const templateData = {
    orgName: '34', supplierName: '243', orderDate: '2022-09-15', creator: '某某'
  }

  LodopComponents.drawTableContent(templateConf, templateData)

  LodopComponents.PREVIEW()
}