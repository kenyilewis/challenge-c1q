var r=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var l=(t,e)=>{for(var s in e)r(t,s,{get:e[s],enumerable:!0})},y=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of a(e))!c.call(t,n)&&n!==s&&r(t,n,{get:()=>e[n],enumerable:!(o=u(e,n))||o.enumerable});return t};var i=t=>y(r({},"__esModule",{value:!0}),t);var d={};l(d,{handler:()=>v});module.exports=i(d);var v=async t=>({statusCode:200,body:JSON.stringify({message:"Go Serverless v3.0! Your function executed successfully!",input:""},null,2)});0&&(module.exports={handler});
