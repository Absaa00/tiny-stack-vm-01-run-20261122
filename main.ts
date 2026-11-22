import{readFileSync as R,writeFileSync as W,mkdirSync as M}from"node:fs";
const P=[0,0,1,1,2,2,3,...Array(16).fill(2),1,1,0,1,1,0,0,1,2,1,1,0,1,0,0],
Q=[0,1,0,2,2,3,3,...Array(18).fill(1),0,0,0,0,0,1,0,0,0,1,0,0,0],
D=new Int32Array(256),C=new Int32Array(64),Y=new Int32Array(256),
B=new Uint8Array(256).fill(36),I=new Uint8Array(256);
for(const[by,o,im]of[[0,0,0],[1,1,1],[2,1,4],[3,2,0],[4,3,0],[5,4,0],[6,5,0],[7,6,0],[16,7,0],[17,8,0],[18,9,0],[19,10,0],[20,11,0],[21,12,0],[22,13,0],[24,14,0],[25,15,0],[26,16,0],[28,17,0],[29,18,0],[30,19,0],[32,20,0],[33,21,0],[34,22,0],[23,23,0],[27,24,0],[48,25,2],[49,26,2],[50,27,2],[51,28,2],[52,29,0],[64,30,0],[65,31,0],[80,32,0],[81,33,0],[82,34,0],[83,35,0]])B[by]=o,I[by]=im;
function V(g,f){
 const n=g.length,op=new Uint8Array(n),ar=new Int32Array(n),nx=new Int32Array(n);
 for(let p=0;p<n;p++){
  const b=g[p],o=B[b],im=I[b];
  if(o===36){op[p]=36;nx[p]=p+1;continue;}
  if(p+im>=n){op[p]=37;nx[p]=p+1;continue;}
  op[p]=o;nx[p]=p+1+im;
  if(o===1)ar[p]=im===1?(g[p+1]<<24)>>24:g[p+1]|g[p+2]<<8|g[p+3]<<16|g[p+4]<<24;
  else if(o===28)ar[p]=g[p+1]|g[p+2]<<8;
  else if(o>=25&&o<=27)ar[p]=p+3+(((g[p+1]|g[p+2]<<8)<<16)>>16);
 }
 let pc=0,sp=0,cp=0,st=0,ip=0,ol=0;let s="";
 Y.fill(0);
 for(;;){
  if(st===1e6)return[s,10];
  if(pc<0||pc>=n)return[s,9];
  const o=op[pc],a=ar[pc],t=nx[pc];
  if(o===36)return[s,5];
  if(o===37)return[s,9];
  st++;
  if(sp<P[o])return[s,2];
  if(sp-P[o]+Q[o]>256)return[s,3];
  pc=t;
  switch(o){
   case 0:return[s,0];
   case 1:D[sp++]=a;break;
   case 2:sp--;break;
   case 3:D[sp]=D[sp-1];sp++;break;
   case 4:{const x=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=x;break;}
   case 5:D[sp]=D[sp-2];sp++;break;
   case 6:{const x=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=x;break;}
   case 23:D[sp-1]=-D[sp-1]|0;break;
   case 24:D[sp-1]=~D[sp-1];break;
   case 25:pc=a;break;
   case 26:if(D[--sp]===0)pc=a;break;
   case 27:if(D[--sp]!==0)pc=a;break;
   case 28:if(cp===64)return[s,7];C[cp++]=t;pc=a;break;
   case 29:if(cp===0)return[s,8];pc=C[--cp];break;
   case 30:{const d=D[sp-1];if(d<0||d>255)return[s,6];D[sp-1]=Y[d];break;}
   case 31:{const d=D[sp-1];if(d<0||d>255)return[s,6];Y[d]=D[sp-2];sp-=2;break;}
   case 32:{const v=String(D[sp-1]);if(ol+v.length>65536)return[s,11];sp--;s+=v;ol+=v.length;break;}
   case 33:if(ol+1>65536)return[s,11];s+=String.fromCharCode(D[--sp]&255);ol++;break;
   case 34:D[sp++]=ip<f.length?f[ip++]:-1;break;
   case 35:return[s,D[--sp]&255];
   default:{
    const y=D[sp-1],x=D[sp-2];let r=0;
    switch(o){
     case 7:r=x+y|0;break;
     case 8:r=x-y|0;break;
     case 9:r=Math.imul(x,y);break;
     case 10:if(y===0)return[s,4];r=x===-2147483648&&y===-1?x:(x/y)|0;break;
     case 11:if(y===0)return[s,4];r=y===-1?0:x%y|0;break;
     case 12:if(y===0)return[s,4];r=(x>>>0)/(y>>>0)|0;break;
     case 13:if(y===0)return[s,4];r=(x>>>0)%(y>>>0)|0;break;
     case 14:r=x&y;break;
     case 15:r=x|y;break;
     case 16:r=x^y;break;
     case 17:r=x<<(y&31);break;
     case 18:r=x>>(y&31);break;
     case 19:r=x>>>(y&31);break;
     case 20:r=x===y?1:0;break;
     case 21:r=x<y?1:0;break;
     case 22:r=(x>>>0)<(y>>>0)?1:0;break;
    }
    sp-=2;D[sp++]=r;break;
   }
  }
 }
}
const A=process.env.MAKEFUN_INPUT_DIR??"/input",U=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(let k=1;k<=40;k++){
 const id="i"+String(k).padStart(3,"0"),[s,e]=V(R(A+"/"+id+"/program.bin"),R(A+"/"+id+"/input.bin"));
 M(U+"/"+id,{recursive:true});
 W(U+"/"+id+"/stdout.bin",Buffer.from(s,"latin1"));
 W(U+"/"+id+"/exit.txt",e+"\n");
}
