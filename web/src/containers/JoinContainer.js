import React, {useCallback} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeRegistInput, validateId, submitRegist } from '../modules/members';
import Join from '../pages/Join';
import axios from 'axios';

const JoinContainer = (props) =>{
    const state  = useSelector(state => state.members.state, []);
    const url = 'http://70.12.246.68:3000';
    const dispatch = useDispatch();
    const onChangeInput = useCallback(input => dispatch(changeRegistInput(input)),[dispatch]);
    const regist = useCallback(()=> dispatch(submitRegist()),[]);
    const onChange = useCallback(
        input=>{
            console.log('pwcon = '+  input.pwcon.length + ' pw = ' + input.u_Pw )
            if(input.pwcon === '' || input.u_Pw === input.pwcon){
                input.validated = false;
            }else{
                input.validated = true;
            }
            onChangeInput(input);
            console.log(input);
        },
        [onChangeInput]
    );
    const onSubmit = useCallback(
        e=>{
            if(state.pwcon ===''){
                onChangeInput({u_Id : state.u_Id , u_Pw : state.u_Pw, pwcon : state.pwcon, validated : true, u_Email : state.u_Email, u_Name : state.u_Name});
                console.log(state);
            }else{
                console.log('axios요청 보냄');
            axios.post(url+'/user/add',{
                u_Name : state.u_Name,
                u_Id : state.u_Id,
                u_Pw : state.u_Pw,
                u_Email : state.u_Email
            }).then(res =>{
                let validate = res.data;
                console.log(validate);
                if(validate){
                    regist();
                    alert('회원가입 성공');
                    props.history.push('/login');
                }
            }).catch(error => {
                
            })
        }},
        [regist,state]
    )
    return (
        <Join  state = {state} onChange = {onChange} onSubmit = {onSubmit}></Join>
    );

};
export default JoinContainer;
