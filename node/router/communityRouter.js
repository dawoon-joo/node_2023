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

			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;

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
router.get('/read/:count', (req, res) => {
	Post.find()
		.populate('writer')
		//createdAt: 1 (원래순서) / createdAt:  -1 (역순)
		.sort({ createdAt: -1 })
		.limit(req.params.count)
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
router.get('/detail/:num', (req, res) => {
	Post.findOne({ communityNum: req.params.num })
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
router.put('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};

	Post.updateOne({ communityNum: req.body.num }, { $set: temp })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => res.json({ success: false, err: err }));
});

//delete 요청처리
router.delete('/delete/:num', (req, res) => {
	Post.deleteOne({ communityNum: req.params.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => {
			console.log({ success: false, err: err });
		});
});

module.exports = router;
