import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
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
	const [Detail, setDetail] = useState(null);
	const params = useParams();
	console.log(params);
	const item = useMemo(() => ({ num: params.num }), [params]);

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
						<button>Delete</button>
					</Btnset>
				</>
			}
		</Layout>
	);
}

export default Detail;
