import axios from 'axios';
import { useEffect, useMemo } from 'react';

function App() {
	//전송 값을 useMemo로 메모이제이션
	const item = useMemo(() => {
		return {
			name: 'David',
		};
	}, []);

	useEffect(() => {
		//axios로 /api/send로 item객체를 서버쪽에 전달
		axios
			.post('/api/send', item)
			.then((res) => {
				//서버쪽에서 응답이 성공적으로 넘어오면 넘어온 값을 콘솔 출력
				console.log(res);
			})
			.catch((err) => {
				//실패시 에러 내용 출력
				console.log(err);
			});
	}, [item]);

	return (
		<div className='App'>
			<h1>React</h1>
		</div>
	);
}

export default App;
