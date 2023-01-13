import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		displayName: '',
		uid: '',
		accessToken: '',
	},
	reducers: {
		//firebase로 받은 user정보를 action객체로 받아서 기존 전역 스테이트에 적용하는 함수
		loginUser: (state, action) => {
			state.displayName = action.payload.displayName;
			state.uid = action.payload.uid;
			state.accessToken = action.payload.accessToken;
		},
		//기존 로그인 전역 정보를 제거하는 함수
		//값을 비우기만 하면 되므로 firebase정보값을 action객체로 받을 필요 없음
		logoutUser: (state) => {
			state.displayName = '';
			state.uid = '';
			state.accessToken = '';
		},
	},
});

//위의 2개 state변경 함수를 각 컴포넌트에서 호출하기 위해 export
export const { loginUser, logoutUser } = userSlice.actions;
//store에 전달하기 위해 reducer export
export default userSlice.reducer;
