function CreatePrintPage() {

  const LodopComponents = new lodopPrint.DrawComponent()

  // 画布
  LodopComponents.setBlankPanel({})
  // 图片截取--内容为超文本代码
  LodopComponents.drawImage({
    params: {
      Top: 10,
      Left: 10,
      Width: 600,
      Height: 450,
      strContent: '<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F092919113248%2F1Z929113248-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665631656&t=da3c1c010b0f3c2aba1efb25c48f90d6">'
    },
    style: {
      Stretch: 0 // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
    }
  })

  // 图片变形缩放--内容为本地文件
  LodopComponents.drawImage({
    params: {
      Top: 470,
      Left: 10,
      Width: 200,
      Height: 150,
      strContent: 'D:/33.jpg'
    },
    style: {
      Stretch: 1 // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
    }
  })

  
  // 图片不变形缩放--内容为URL地址
  LodopComponents.drawImage({
    params: {
      Top: 470,
      Left: 300,
      Width: 200,
      Height: 150,
      strContent: 'URL:https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F092919113248%2F1Z929113248-8-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665631656&t=da3c1c010b0f3c2aba1efb25c48f90d6'
    },
    style: {
      Stretch: 2 // 图片截取缩放模式 0--截取图片 1--扩展（可变形）缩放 2--按原图长和宽比例（不变形）缩放
    }
  })

  LodopComponents.PREVIEW()
}