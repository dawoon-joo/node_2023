import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';

function Detail() {
	const params = useParams();
	console.log(params);

	return <Layout name={'Detail'}>Detail</Layout>;
}

export default Detail;
