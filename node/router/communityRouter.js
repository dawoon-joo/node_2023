const express = require('express');
const router = express.Router();

const { User } = require('../model/userSchema.js');
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

//create 요청처리
router.post('/create', (req, res) => {
	const temp = req.body;
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.communityNum = doc.communityNum;

			//현재 로그인된 사용자의 아이디로 User 컬렉션으로부터 document를 찾고
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					//해당 document의 object.id값을 body-parser로 전달받은 객체의 writer키값에 등록
					temp.writer = doc._id;

					//위에서 만들어진 최종 temp객체로 PostModel인스턴스 생성후  DB에 저장
					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } }).then(() => {
							res.json({ success: true });
						});
					});
				});
		})
		.catch((err) => console.log(err));
});

//read 요청처리
router.post('/read', (req, res) => {
	Post.find()
		.populate('writer')
		// createdAt : 1 (원래순서) / createdAt: -1 (역순)
		.sort({ createdAt: -1 })
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
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
		.populate('writer')
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

//edit 요청처리
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};
	Post.updateOne({ communityNum: req.body.num }, { $set: temp })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false });
		});
});

//delete 요청처리
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

module.exports = router;
