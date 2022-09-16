

function CreateBarCode() {
  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})
  // 一维码
  LodopComponents.drawBarcode({
    params: {
      Top: 10,
      Left: 10,
      Width: 300,
      Height: 100,
      CodeType: '128A',
      CodeValue: '213434'
    },
    style: {
      ShowBarText: 1, // (一维)条码的码值是否显示,默认是真,假 0, "0", false
      // ContentVName: '', // 设置打印设计返回程序代码时的内容参数变量名, (当PROGRAM_CONTENT_BYVAR真时ContentVName才有效)
      GroundColor: 'pink', // 设置条码的背景色
      AlignJustify: 2, // 设置“barcode条码文字”靠齐方式; 0-两端对齐(默认)  1-左靠齐  2-居中  3-右靠齐；
      NotOnlyHighPrecision: 1, // 设置条码适应低精度输出或扫描设备, 1, true
    }
  })

  LodopComponents.PREVIEW()
}

// 二维码
function CreateQrCode() {
  const LodopComponents = new lodopPrint.DrawComponent()
  // 画布
  LodopComponents.setBlankPanel({})
  LodopComponents.drawBarcode({
    params: {
      Top: 10,
      Left: 10,
      Width: 200,
      Height: 300,
      CodeType: 'QRCode',
      // CodeValue: 2
      CodeValue: {orgId: 4546464654564321, id: 24165486768465456}
    },
    style: {
      QRCodeVersion: 3, // 设置二维码QRCode版本值，其决定容量。有1,2,3,5,7,10,14共七个版本可选，最小版本的字符容量是14字符或者7个汉字，最大版本的容量是352字符或对应汉字
                        // 默认版本为1,版本越高二维码越复杂。（orgId和id组成的数据需要版本3以上，否则显示 “QRCode data overflow”）
      QRCodeErrorLevel: 'H', // 设置二维码QRCode纠错等级; “L”：7%   “M”：15%(默认) “H”：30%
      QRCodeEncodeMode: 'B', // 设置二维码QRCode编码模式; “N”：数字   “A”：英文字母    “B”：二进制或汉语(默认)
      // ContentVName: , // 设置打印设计返回程序代码时的内容参数变量名, (当PROGRAM_CONTENT_BYVAR真时ContentVName才有效)
      // DataCharset: '2', // 设置二维条码的数据集
                           // (经测试，如果已经有了编码值，则二维码不会变)
      GroundColor: 'green', // 设置条码的背景色
      // Repeat: 1, // 设置对象是否在本纸张内有规律重复输出
      // NotOnlyHighPrecision: 1, // 设置条码适应低精度输出或扫描设备
    }
  })

  // 二维码--测试编码模式
  LodopComponents.drawBarcode({
    params: {
      Top: 10,
      Left: 220,
      Width: 200,
      Height: 300,
      CodeType: 'QRCode',
      CodeValue: 2
    },
    style: {
      QRCodeEncodeMode: 'A', // 设置二维码QRCode编码模式; “N”：数字   “A”：英文字母    “B”：二进制或汉语(默认)
    }
  })

  // 二维码
  LodopComponents.drawBarcode({
    params: {
      Top: 310,
      Left: 10,
      Width: 200,
      Height: 300,
      CodeType: 'QRCode',
      CodeValue: 2
    },
    style: {
      QRCodeEncodeMode: 'N', // 设置二维码QRCode编码模式; “N”：数字   “A”：英文字母    “B”：二进制或汉语(默认)
    }
  })

  // 二维码
  LodopComponents.drawBarcode({
    params: {
      Top: 210,
      Left: 220,
      Width: 200,
      Height: 300,
      CodeType: 'QRCode',
      CodeValue: 2
    },
    style: {
      QRCodeEncodeMode: 'B', // 设置二维码QRCode编码模式; “N”：数字   “A”：英文字母    “B”：二进制或汉语(默认)
    }
  })

  // 二维码---测试二维码数据集是否会重新赋值
  LodopComponents.drawBarcode({
    params: {
      Top: 410,
      Left: 220,
      Width: 200,
      Height: 300,
      CodeType: 'QRCode',
      CodeValue: 2
    },
    style: {
      QRCodeEncodeMode: 'B', // 设置二维码QRCode编码模式; “N”：数字   “A”：英文字母    “B”：二进制或汉语(默认)
      DataCharset: 3, // 设置二维条码的数据集
    }
  })
  LodopComponents.PREVIEW()
}