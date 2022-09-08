function CreatePrintPage() {
  console.log(1111, lodopPrint)
  const loo = new lodopPrint.DrawComponent()
  loo.setBlankPanel({})
  // 图片
  loo.setImage({
    params: {
      Top: 10,
      Left: 10,
      Width: 200,
      Height: 150,
      strContent: 'URL:https://iknow-pic.cdn.bcebos.com/42166d224f4a20a46a9cf55382529822730ed0a0?x-bce-process=image/quality,q_80/format,f_auto'
    },
    style: {
      Stretch: 1
    }
  })
  // 纯文本
  loo.setText({
    params: {
      Top: 10,
      Left: 400,
      Width: 200,
      Height: 300,
      strContent: '纯文本组件jls jfl smklfmslkj fklsj'
    },
    style: {
      FontName: '楷体',
      FontSize: 20,
      Italic: 1,
      FontColor: '#FFB400',
      Bold: 1,
      Underline: 1,
      Alignment: 2, // 数字型，1--左靠齐 2--居中 3--右靠齐
      LineSpacing: 20, // 纯文本的行间距（宽度固定之后的换行间距）
      LetterSpacing: 10, // 纯文本的字间距
      // AlignJustify: 1, // 设置“text文本”是否两端对齐（会分散对齐）或“barcode条码文字”靠齐方式
      // ReadOnly: 0, // 纯文本内容在打印维护时，是否禁止修改 0--否 1--是 默认“是”
      TextFrame: 5, // 文本的外框类型
      TextNeatRow: 1, // 设置多行Text对象文本行是否尽量对齐 
    }
  })
 
  const templateConf = {
      orderHeight: 110,
      excelHeaderColspan: 13,
      titleName: '点验单',
      orderModel: [
        {
          prop: 'orgName',
          label: '组织机构',
          colSpan: 13,
          newLine: true
        },
        {
          prop: 'supplierName',
          label: '供应单位',
          colSpan: 13,
          newLine: true
        }
      ],
      itemsModel: [
        {
          prop: 'materialName',
          label: '材料名称',
          width: '8%',
          align: 'center'
        },
        {
          prop: 'materialModel',
          label: '规格型号',
          width: '8%',
          align: 'center'
        },
        {
          prop: 'materialUnit',
          label: '单位',
          width: '4%',
          align: 'center'
        }
      ],
      sumRowModel: [
        {
          text: '金额合计:######',
          font: {
            tdata: 'SubSum',
            format: 'UpperMoney',
            tindex: 13
          },
          colSpan: 7,
          align: 'left',
          key: '#大写合计#',
          value: '#大写合计#'
        },
        {
          text: '######',
          font: {
            tdata: 'SubSum',
            format: '###0.00',
            tindex: 8
          },
          colSpan: 1,
          key: 'taxFreeSum',
          align: 'left',
          value: 0
        },
        {
          text: '',
          font: {
            tdata: '',
            format: '###0.00',
            tindex: 9
          },
          colSpan: 1,
          key: '',
          align: 'left',
          value: ''
        }
      ],
      footModel: [
        {
          label: '物资主管',
          width: '25%',
          colSpan: 3,
          alone: false
        },
        {
          label: '收料人',
          width: '25%',
          colSpan: 3,
          alone: false
        },
        {
          label: '交料人',
          width: '25%',
          colSpan: 3,
          alone: false
        },
        {
          label: '制单人',
          width: '20%',
          colSpan: 4,
          alone: false
        }
      ]
  }

  const templateData = {
    order: { orgName: '34', supplierName: '243' },
    orderItem: [
      {
        materialName: '花覅赫尔和覅色uu复核发',
        materialModel: '是挥',
        materialUnit: '林二'
      },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' },
      { materialName: '222', materialModel: 'bbb', materialUnit: 'www' }
    ]
  }

  loo.PREVIEW()
}