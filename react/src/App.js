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
				<Route path='/detail/:id' element={<Detail />} />
			</Routes>
		</>
	);
}

export default App;
