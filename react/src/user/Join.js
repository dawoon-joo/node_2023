import Layout from '../common/Layout';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import firebase from '../firebase';
import axios from 'axios';

const BtnSet = styled.div`
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [Email, setEmail] = useState('');
	const [Pwd1, setPwd1] = useState('');
	const [Pwd2, setPwd2] = useState('');
	const [Name, setName] = useState('');

	const handleJoin = async () => {
		if (!(Name && Email && Pwd1 && Pwd2)) return alert('모든 양식을 입력하세요.');
		if (Pwd1 === !Pwd2) return alert('비밀번호 2개를 동일하게 입력하세요.');

		//위의 조건을 통과해서 회원가입을 하기 위한 정보값을 변수에 할당
		//await문으로 동기화해서 firebase의 인증함수로 인증정보를 저장
		let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);

		//반환된 User 정보값에 displayName이라는 키값으로 사용자이름 추가등록
		await createdUser.user.updateProfile({ displayName: Name });
		console.log(createdUser.user);
		navigate('/login');

		const item = {
			email: createdUser.user.multiFactor.user.email,
			displayName: createdUser.user.multiFactor.user.displayName,
			uid: createdUser.user.multiFactor.user.uid,
		};

		firebase.auth().signOut();
		dispatch(logoutUser());

		axios.post('/api/user/join', item).then((res) => {
			if (res.data.success) {
				navigate('/login');
			} else return alert('회원가입에 실패했습니다.');
		});
	};

	return (
		<Layout name={'Join'}>
			<input type='email' value={Email} placeholder='이메일 주소를 입력하세요' onChange={(e) => setEmail(e.target.value)} />
			<input type='password' value={Pwd1} placeholder='비밀번호를 입력하세요' onChange={(e) => setPwd1(e.target.value)} />
			<input type='password' value={Pwd2} placeholder='비밀번호를 재입력하세요' onChange={(e) => setPwd2(e.target.value)} />
			<input type='text' value={Name} placeholder='사용자명을 입력하세요' onChange={(e) => setName(e.target.value)} />

			<BtnSet>
				<button onClick={() => navigate(-1)}>가입취소</button>
				<button onClick={handleJoin}>회원가입</button>
			</BtnSet>
		</Layout>
	);
}
export default Join;
