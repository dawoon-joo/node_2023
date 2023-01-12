import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Btnset = styled.div`
	display: flex;
	gap: 20px;
	margin-top: 20px;
`;

function Edit() {
	const navigate = useNavigate();
	const params = useParams();
	const [Detail, setDetail] = useState({});
	const [Title, setTitle] = useState('');
	const [Content, setContent] = useState('');

	const handleUpdata = () => {
		if (Title.trim() === '' || Content.trimEnd() === '') return alert('모든 항목을 입력하세요');

		const item = {
			title: Title,
			content: Content,
			num: params.num,
		};

		axios
			.post('/api/community/edit', item)
			.then((res) => {
				if (res.data.success) {
					alert('글 수정이 완료되었습니다.');
					navigate(`/detail/${params.num}`);
				} else {
					alert('글 수정에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		const item = { num: params.num };
		//기존의 detail node router를 재활용하여 params로 넘어온 글 번호로 다시 해당 document 호출
		axios.post('/api/community/detail', item).then((res) => {
			if (res.data.success) {
				//넘어온 정보값을 Detail state에 담음
				setDetail(res.data.detail);
			}
		});
	}, [params]);

	//Detail state값이 변경되면 다시 해당 정보로 부터 title, content값을 각각 state로 옮겨넣음
	useEffect(() => {
		setTitle(Detail.title);
		setContent(Detail.content);
	}, [Detail]);

	return (
		<Layout name={'Edit'}>
			<label htmlFor='title'>Title</label>
			{/* 제목 폼에 title값을 초기값으로 넣어주고 이후 onChange이벤트가 발생하면 실시간으로 state값 변경 */}
			<input type='text' value={Title || ''} id='title' onChange={(e) => setTitle(e.target.value)} />

			<label htmlFor='content'>Content</label>
			{/* 컨텐츠 폼에 content 초기값으로 넣어주고 이후 onChange이벤트가 발생하면 실시간으로 state값 변경 */}
			<textarea name='content' id='content' cols='30' rows='4' value={Content || ''} onChange={(e) => setContent(e.target.value)}></textarea>

			<Btnset>
				<button onClick={() => navigate(-1)}>cancel</button>
				<button onClick={handleUpdata}>update</button>
			</Btnset>
		</Layout>
	);
}

export default Edit;
