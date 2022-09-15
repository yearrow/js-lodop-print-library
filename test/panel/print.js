


function CreatePrintPageB5() {
  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({
    SYSTEM_DEFAULT_CONF: {
      SET_PRINT_PAGESIZE: {
        strPageName: 'B5'
      },
      PRINT_INITA: {
        Top: 0,
        Left: 0,
        Width: 0,
        Height: 0,
        strPrintName: '基于LODOP的打印作业'
      }
    }
  })

  // 增加背景图片
  LodopComponents.setPrintBKImg('<img border="0" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665628058&t=07b5f236ecc6882d9c718b0fbceb1d6f">')

  LodopComponents.setShowMode({
    BKIMG_IN_PREVIEW: 1, // 背景图在预览打印时显示
    BKIMG_LEFT: 10, // 背景图显示X标
    BKIMG_TOP: 10, // 背景图显示Y标
    BKIMG_WIDTH: 500, // 背景图宽度（宽高都是以最小的值按比例显示）
    // BKIMG_HEIGHT: 200,
  })

  
  LodopComponents.drawText({
    params: {
      Top: 10,
      Left: 10,
      Width: 500,
      Height: 200,
      strContent: '见覅偶我司付菲菲违法我发佛山金佛山计费三夫是垃圾费都容易了梁静茹过儿二级跳空厄加特推荐额通了铁腕'
    },
    style: {
      FontSize: 20
    }
  })
 
  LodopComponents.PREVIEW()
}

function CreatePrintPageA4() {
  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})
  
  LodopComponents.drawText({
    params: {
      Top: 10,
      Left: 10,
      Width: 1000,
      Height: 200,
      strContent: '见覅偶我司付菲菲违法我发佛山金佛山计费三夫是垃圾费都容易了梁静茹过儿二级跳空厄加特推荐额通了铁腕'
    },
    style: {
      FontSize: 20
    }
  })
 
  LodopComponents.PREVIEW()
}