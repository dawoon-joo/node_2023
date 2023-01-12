import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';

function Detail() {
	const [Detail, setDetail] = useState(null);
	const params = useParams();
	console.log(params);
	const item = useMemo(() => ({ num: params.num }), [params]);

	useEffect(() => {
		axios
			.post('/api/detail', item)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.detail);
					setDetail(res.data.detail);
				}
			})
			.catch((err) => console.log(err));
	}, [item]);

	return (
		<Layout name={'Detail'}>
			{
				<>
					<h2>{Detail?.title}</h2>
					<p>{Detail?.content}</p>
				</>
			}
		</Layout>
	);
}

export default Detail;
