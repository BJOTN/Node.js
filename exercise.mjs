import * as fs from 'node:fs'

fs.readFile('file.txt','utf-8',(error, data)=>{
  if(error){
    console.error(error)
    return
  }
  console.log(data)
})