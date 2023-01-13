import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Main from './common/Main';
import Create from './community/Create';
import Detail from './community/Detail';
import Edit from './community/Edit';
import List from './community/List';
import GlobalStyle from './GlobalStyle';
import Join from './user/Join';
import Login from './user/Login';

import { useEffect } from 'react';
import firebase from './firebase';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './redux/userSlice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			// console.log(userInfo);
			//컴포넌트 마운트시 firebase로 받은 유저정보가 없으면 (로그인 상태가 아니면)
			//logoust함수를 호출해서 전역의 유저정보값을 비움
			if (userInfo === null) dispatch(logoutUser());
			//firebase유저 정보가 있으면 해당 정보값을 loginUser의 인수로 전달시
			//내부적으로 해당 정보값이 action객체의 payload에 담기면서 리듀서로 기존 전역 state값 변경
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	useEffect(() => {
		// firebase.auth().signOut();
	}, []);

	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				{/* /detail url로 접속뒤 뒤에 나오는 정보값을 num라는 키값에 담아 param객체 전달 */}
				<Route path='/detail/:num' element={<Detail />} />
				<Route path='/edit' element={<Edit />} />
				<Route path='/edit/:num' element={<Edit />} />

				<Route path='/join' element={<Join />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
