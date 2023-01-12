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

//react로 부터 받은 create 요청처리
app.post('/api/create', (req, res) => {
	//Counter 모델로부터 CoummnityNum값을 찾아서 react로 부터 전달받은 데이터와 결합
	//이때 카운터 모델에 findeOne메서드로 찾을 document의 조건을 설정
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			//이시점에 counter 모델의 communityNum값을 doc로 전달 받으면 해당 값을
			//프론트로 부터 전달받은 게시글 데이터에 추가

			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			//위에서 생선된 Post 인스턴스 모델을 저장한 뒤, counter 모델의 값을 증가
			PostModel.save().then(() => {
				//성공적으로 post모델이 저장되면 기존 카운터의 coummnityNum값을 자동으로 1증가해서 업데이트
				//DB데이터를 수정하는 방법3가지 /$inc(증가)/ $dec(갑소) / $set(새로운 값으로 변경)
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } }).then(() => {
					res.json({ success: true });
				});
			});
		})
		.catch((err) => console.log(err));
});

//react로 부터 받은 read 요청처리
app.post('/api/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//detail 요청처리
app.post('/api/detail', (req, res) => {
	//body-parser로 넘어온 글 고유번호로 해당 document 하나를 찾아서 다시 프론트쪽에 전달
	Post.findOne({ communityNum: req.body.num })
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});
