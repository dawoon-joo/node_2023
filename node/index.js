const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema');
//스키마 모델을 불러오면 자동적으로 MongoDB에 빈 컬랙션이 추가됨
//카운터 컬렉션에 초기 데이터가 들어갈 첫 document를 MongoDB에서 직접 생성
// {name: 'counter', coummnityNum: 1}
const { Counter } = require('./model/counterSchema.js');

//express에서 react의 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

//클라이언트에서 보내는 데이터를 받도록 설정(body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//comunity전용 라우터 연결
app.use('/api/community', require('./router/communityRouter.js'));

//MongoDB접속
app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://dawoon:ekdns0804@cluster0.1a6heit.mongodb.net/?retryWrites=true&w=majority')
		.then(() => console.log(`Server app listening on Port ${port} width MongoDB`))
		.catch((err) => console.log(err));
});

//기본 라우터 설정
app.get('/', (req, res) => {
	res.sendFile(path.join(___dirname, '../react/build/index.html'));
});
app.get('*', (req, res) => {
	res.sendFile(path.join(___dirname, '../react/build/index.html'));
});
