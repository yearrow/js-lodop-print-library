

function CreatePrintPage() {

  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})
  // 纯文本
  LodopComponents.drawText({
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
      Underline: 1, // 下划线
      Alignment: 2, // 数字型，1--左靠齐 2--居中 3--右靠齐
      LineSpacing: 20, // 纯文本的行间距（宽度固定之后的换行间距）
      LetterSpacing: 10, // 纯文本的字间距
      // AlignJustify: 1, // 设置“text文本”是否两端对齐（会分散对齐）,1代表两端对齐，0代表不处理（默认）；
      // ReadOnly: 0, // 纯文本内容在打印维护时，是否禁止修改 0--否 1--是 默认“是”
      TextFrame: 5, // 文本的外框类型
      TextNeatRow: 1, // 设置多行Text对象文本行是否尽量对齐 
      Angle: 0, // 逆时针旋转角度数,以左上角为原点
    }
  })

  LodopComponents.PREVIEW()
}