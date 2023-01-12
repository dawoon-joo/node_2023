const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema');

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
	console.log(req.body);

	const PostModel = new Post({
		title: req.body.title,
		content: req.body.content,
	});

	PostModel.save()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log(err);
		});
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
