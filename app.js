/**
 * Created by haozi on 10/31/2017.
 */


const xlsx = require('node-xlsx').default

const moment = require('moment')

const fs = require('fs')

function createDayReport() {
  sheets = xlsx.parse('C:\\Users\\haozi\\Desktop\\dayReport.xlsx')
  soluions = new Solution(sheets[3].data)
  tasks = new Task(sheets[2].data)
  name = sheets[0].data[0][1]
  _class = sheets[0].data[0][4]
  job = sheets[0].data[1][1]

  files = []
  sheets[1].data.shift()
  sheets[1].data.map(v => {
      if(!v[4]) return
    console.log(v[2].split(',').map(Number))
    console.log(soluions)
    soluion = v[2].split(',').map(Number).map(v => '* ' + soluions.get(v)[0]).join('\n')
    console.log(soluion)
      date = moment(v[0])
      files.push({
        fileName: `${date.format('MM-DD')} - ${name}.md`,
        content: `# 极客工作室个人项目日更表

## 任务信息
  * 时间: ${v[0]}
  * 操作人: ${_class} ${name}
  * Job:   ${job}
  
## 任务描述
  ${tasks.get(v[1])[0]}
  
## 仓库地址  
${`* [${tasks.get(v[1])[2]}](${tasks.get(v[1])[1]})`}
  
## 需求
${tasks.get(v[1])[3]}

## 解决方案
${soluion}
  
## 完成进度
  ${v[5]}
  
## 其他问题
  ${v[6]}
  
## 编写日期
  ${moment(v[3]).format('YYYY年MM月DD日')}
       `
      })
  })


  files.map(({fileName, content}) => {
    console.log(fileName)
    fs.writeFileSync('C:\\Users\\haozi\\Desktop\\geek\\' + fileName, content)
  })
}




class Solution {

  constructor(sheet) {
    this.list = new Map
    sheet.shift()
    sheet.map(v => this.list.set(v.shift(), v))
  }

  get(id) {
    return this.list.get(id)
  }
}


class Task {
  constructor(sheet) {
    this.list = new Map
    sheet.shift()
    sheet.map(v => {
      this.list.set(v.shift(), v)
    })
  }

  get(id) {
    return this.list.get(id)
  }
}

createDayReport()