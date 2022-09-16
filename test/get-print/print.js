

function getPringPagesizeList() {

  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})
 
  const Lodop = LodopComponents.getPrint()
  const pagesizeList = Lodop.GET_PAGESIZES_LIST(-1, '\n')
  console.log('pagesizeList', pagesizeList)

  

  // LodopComponents.PREVIEW()
}