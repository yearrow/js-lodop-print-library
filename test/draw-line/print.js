
function CreatePrintLine() {

  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})

  LodopComponents.drawLine({
    params: {
      Top1: 100,
      Left1: 10,
      Top2: 100,
      Left2: 1000,
      intLineStyle: 2, // 线条类型 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      intLineWidth: 3 // 单位 像素
    },
    style: {
      Angle: 0, // 逆时针旋转角度数,以左上角为原点
      ItemType: 1  // 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
    }
  })


  LodopComponents.drawLine({
    params: {
      Top1: 200,
      Left1: 10,
      Top2: 200,
      Left2: 1000,
      intLineStyle: 0, // 线条类型 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      intLineWidth: 1 // 单位 像素
    },
    style: {
      Angle: 0, // 逆时针旋转角度数,以左上角为原点
      ItemType: 1  // 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
    }
  })
  LodopComponents.PREVIEW()
}

function CreatePrintDiagonalLine() {

  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})

  LodopComponents.drawLine({
    params: {
      Top1: 10,
      Left1: 10,
      Top2: 100,
      Left2: 400,
      intLineStyle: 1, // 线条类型 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      intLineWidth: 10 // 单位 像素
    },
    style: {
      Angle: 0, // 逆时针旋转角度数,以左上角为原点
      ItemType: 1  // 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
    }
  })


  LodopComponents.PREVIEW()
}

function CreatePrintLineAngle90() {

  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})

  LodopComponents.drawLine({
    params: {
      Top1: 200,
      Left1: 10,
      Top2: 200,
      Left2: 200,
      intLineStyle: 4, // 线条类型 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      intLineWidth: 10 // 单位 像素
    },
    style: {
      Angle: 90, // 逆时针旋转角度数,以左上角为原点
    }
  })

  LodopComponents.PREVIEW()
}