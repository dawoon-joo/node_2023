import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import Detail from './community/Detail';
import List from './community/List';

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				{/* /detail url로 접속뒤 뒤에 나오는 정보값을 num라는 키값에 담아 param객체 전달 */}
				<Route path='/detail/:num' element={<Detail />} />
			</Routes>
		</>
	);
}

export default App;
