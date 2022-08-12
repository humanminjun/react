require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';


//비구조화 할당을 통해 process.env 내부 값에 대한 래퍼런스 만들기 
const{PORT, MONGO_URI} = process.env;


import api from'./api';



const app = new Koa();
const router = new Router();

mongoose
.connect(MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:false})
.then(()=>{
  console.log('connected to MongoDB');
})
.catch(e=>{
  console.error(e);
})

//라우터 설정
router.use('/api',api.routes());//api라우터 적용


//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());


// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


//PORT가 지정되어 있지 않으면 4000사용
const port = PORT||4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});


