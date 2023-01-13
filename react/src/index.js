import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './redux/userSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
	},
	//콘솔로그에 뜨는 serializable err구문 제거
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
