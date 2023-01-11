const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//express에서 react의 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

//MongoDB접속
app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://dawoon:ekdns0804@cluster0.1a6heit.mongodb.net/?retryWrites=true&w=majority')
		.then(() => console.log(`Server app listening on Port ${port} width MongoDB`))
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(___dirname, '../react/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(___dirname, '../react/build/index.html'));
});
