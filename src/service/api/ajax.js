import axios from 'axios'
import { reject } from 'q';

export default function ajax(url = "",params = {},type = "GET"){
    let promise;


    return new Promise((resolve,reject)=>{

         if(type.toUpperCase()==="GET"){
             let paramsStr=''
             //获得所有的key
            Object.keys(params).forEach(key=>{
                paramsStr +=key +"=" +params(key) +'&'
            })
            if(paramsStr){
               paramsStr= paramsStr.substr(0,paramsStr.lastIndexOf('&'))
            }
            url += "?"+paramsStr
            promise=axios.get(url)
         }else if(type.toUpperCase()==="POST"){
            promise=axios.post(url,params)
         }
         promise.then(res=>{
            resolve(res.data)
         }).catch(err=>{
            reject(err)
         })
    })
}