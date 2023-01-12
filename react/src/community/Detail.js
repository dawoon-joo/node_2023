import Layout from '../common/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const DetailWrap = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const Btnset = styled.div`
	margin-top: 20px;
	display: flex;
	gap: 20px;
`;

function Detail() {
	const navigate = useNavigate();
	const [Detail, setDetail] = useState(null);
	const params = useParams();
	console.log(params);
	const item = useMemo(() => ({ num: params.num }), [params]);

	const handleDelete = () => {
		const item = { num: params.num };
		if (!window.confirm('정말 삭제하시겠습니까?')) return;

		axios
			.post('/api/community/delete', item)
			.then((res) => {
				if (res.data.success) {
					alert('게시글이 삭제되었습니다.');
					navigate('/list');
				} else {
					alert('게시글 삭제에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.post('/api/community/detail', item)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				}
			})
			.catch((err) => console.log(err));
	}, [item]);

	return (
		<Layout name={'Detail'}>
			{
				<>
					<DetailWrap>
						<h2>{Detail?.title}</h2>
						<p>{Detail?.content}</p>
					</DetailWrap>
					<Btnset>
						<button>
							<Link to={`/edit/${Detail?.communityNum}`}>Edit</Link>
						</button>
						<button onClick={handleDelete}>Delete</button>
					</Btnset>
				</>
			}
		</Layout>
	);
}

export default Detail;
