
class DrawComponent {
  constructor(LODOP, config) {
      this.LODOP = LODOP
      this._config = config
  }
  // 准备画布
  setBlankPanel() {
    const {
      Top,
      Left,
      Width,
      Height,
      strPrintName
    } = this._config.SYSTEM_DEFAULT_CONF.PRINT_INITA;
    LODOP.PRINT_INITA(Top, Left, Width, Height, strPrintName);
    const {
      intDispMode,
      intToolMode,
      blDirectPrint,
      inWidth,
      intHeight,
      strTitleButtonCaptoin
    } = this._config.SYSTEM_DEFAULT_CONF.SET_PREVIEW_WINDOW;
    LODOP.SET_PREVIEW_WINDOW(
      intDispMode,
      intToolMode,
      blDirectPrint,
      inWidth,
      intHeight,
      strTitleButtonCaptoin
    );
    const {
      intOrient,
      PageWidth,
      PageHeight,
      strPageName
    } = this._config.SYSTEM_DEFAULT_CONF.SET_PRINT_PAGESIZE;
    LODOP.SET_PRINT_PAGESIZE(intOrient, PageWidth, PageHeight, strPageName);
    const {
      strModeType,
      varModeValue
    } = this._config.SYSTEM_DEFAULT_CONF.SET_SHOW_MODE;
    LODOP.SET_SHOW_MODE(strModeType, varModeValue);
  }
  
  // 纯文本组件option:{params, style}
  setText(option) {
    LODOP.ADD_PRINT_TEXT(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.strContent
    )

    for(var item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item])
    }
  }

  // 图片组件
  setImage(option) {
    LODOP.ADD_PRINT_IMAGE(
      option.params.Top,
      option.params.Left,
      option.params.Width,
      option.params.Height,
      option.params.strContent
    )
    
    for(var item in option.style) {
      LODOP.SET_PRINT_STYLEA(0, item, option.style[item])
    }
  }

  // 翻页表格
  setTable(option, templateData) {
    let tableHeader = "";
    let tableBody = "";
    let tableFooter = "";
    let blankStr = "";
    let rowHeaderArr = []
    let propColumns = []
    const tableData = templateData.orderItem
    this._constructTableHead(rowHeaderArr, option.listModel, 0)
    rowHeaderArr.map(item => tableHeader += '<tr>' + item + '</tr>')
    const lineNum = option.lineNum;
    // 渲染空白行
    const blankRow = lineNum - (tableData.length % lineNum)
    if (blankRow !== lineNum) {
      for (let x = 1; x <= blankRow; x++) {
        blankStr += `<tr height="${option.lineHeight}px">`;
        for (let y = 1; y <= this.propColumns.length; y++) {
          blankStr += `<td style="border: solid 1px black;"></td>`;
        }
        blankStr += `</tr>`;
      }
    }
    // 渲染
    tableData.map(item => {
      tableBody += `<tr height="${option.lineHeight}px">`
      this.propColumns.map(iitem => {
        let propValue = ''
        if (iitem.prop) {
          if (iitem.render) {
            propValue = iitem.render(iitem, item)
          } else {
            propValue = item[iitem.prop]
          }
        }
        tableBody += `<td style="border: solid 1px black;">
                        <div align="${iitem.align}" style="max-height:${option.lineHeight}px;overflow: hidden;padding: 0px 2px;">
                          ${propValue}
                        </div>
                      </td>`;
      });
      tableBody += "</tr>";
    });
    // 合计渲染
    if (option.sumRowModel && option.sumRowModel.length) {
      tableFooter += '<tr height="30px">';
      option.sumRowModel.forEach(function(item) {
        tableFooter += `<td colspan="${item.colSpan}" 
                          style="border: solid 1px black;">
                <div align="${item.align}">
                <font tdata="${item.font.tdata}" format="${item.font.format}" tindex="${item.font.tindex}">
                  ${item.text}
                </font></div></td>`;
      });
      tableFooter += "</tr>";
    } else {
      tableFooter += '<tr height="0px"></tr>';
    }
    const tableHtml = `<table class="table-paging-content" width="${option.Width}"
                        style ="font-family: '宋体', Arial, Helvetica, sans-serif;border-collapse: collapse;font-size: 11px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableBody + blankStr}</tbody>
                        <tfoot>${tableFooter}</tfoot>
                    </table>`;
    let tableHeight = lineNum * (option.lineHeight || 30) + 5;
    LODOP.ADD_PRINT_TABLE(
      option.Top,
      option.Left,
      option.Width,
      tableHeight,
      this._styleFlie + `<body>${tableHtml}</body>`
    )
    const width = this._option.SYSTEM_DEFAULT_CONF.PRINT_INITA.Width;
    const height = this._option.SYSTEM_DEFAULT_CONF.PRINT_INITA.Height;
    LODOP.ADD_PRINT_TEXT(height - 15, width / 2, 120, 30, "第#页/共&页");
    LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);


    // LODOP.ADD_PRINT_IMAGE(
    //   option.params.Top,
    //   option.params.Left,
    //   option.params.Width,
    //   option.params.Height,
    //   option.params.strContent
    // )
    
    // for(var item in option.style) {
    //   LODOP.SET_PRINT_STYLEA(0, item, option.style[item])
    // }
  }
  
  // 构造表头
  _constructTableHead (rowHeaderArr, columns, level) {
    let tableHeader = ``
    rowHeaderArr[level] = rowHeaderArr[level] || ''
    columns.map((column, index) => {
      tableHeader = `<th nowrap width="${column.width}" colspan="${column.colSpan || 1 }" rowspan="${column.rowSpan || 1}"
                      style="font-size: 12px;font-weight: 500;border: solid 1px black;">
                     <div align="center">${column.label}</div></th>`;
      rowHeaderArr[level] += tableHeader
      if(column.isParent) {
        let childLev = level + (column.rowSpan || 1)
        this._constructTableHead(column.children, childLev)
      } else {
        this.propColumns.push(column)
      }
    })
  }


  PREVIEW () {
    LODOP.PREVIEW();
  }
}
