import React, {useState} from "react";
import Layout from "../components/layout/Layout";
import {makeStyles, TextField, FormControlLabel, Checkbox, Button} from "@material-ui/core";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    submit : {
        margin : theme.spacing(3,0,2),
        lineHeight : '2.5rem',
        fontSize : 16,
    },
    page : {
        marginTop: theme.spacing(6),
        marginBottom : theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputText : {
        width: '300px', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));
const Join = ({props, state, onChange, onSubmit}) =>{
    const classes = useStyles();
    const onChangeInput = (e) => {
        console.log(e);
        let key = e.target.name;
        let input = {name : state.name, id : state.id, pw : state.pw, email : state.email, pwcon : state.pwcon, validated : state.validated};
        switch(key){
            case 'name':
                input.name = e.target.value;
                onChange(input);
                break;
            case 'id' :
                input.id = e.target.value;
                onChange(input);
                break;
            case 'pw' :
                input.pw = e.target.value;
                onChange(input);
                break;
            case 'email' :
                input.email = e.target.value;
                onChange(input);
                break;
            case 'pwconfirm' :
                input.pwcon = e.target.value;
                onChange(input);
                break;
            default :
                console.log('default')
        }
    }
    

    return(
        <div className={classes.page}>
            <h2>회원가입</h2>
            
            <div className={classes.inputText}>
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "name"
                    label = "이름"
                    name = "name"
                    autoFocus
                    onChange = {onChangeInput}
                    value = {state.name}
                />
                
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "id"
                    label = "아이디"
                    name = "id"
                    onChange = {onChangeInput}
                    value = {state.id}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pw"
                    label="비밀번호 "
                    type="password"
                    id="pw"
                    autoComplete="current-password"
                    onChange = {onChangeInput}
                    value = {state.pw}
                />
               <TextField           
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="pwconfirm"
                    label="비밀번호 확인"
                    type="password"
                    id="pwconfirm"
                    autoComplete="current-password"
                    error = {state.validated}
                    onChange = {onChangeInput}
                    value = {state.pwcon}
                    helperText = {state.validated ? "일치하지 않습니다" : ""}
                    
                />
                <TextField 
                    variant="outlined"
                    margin="normal" 
                    required
                    fullWidth
                    id = "email"
                    label = "이메일"
                    name = "email"
                    autoComplete="email"
                    onChange = {onChangeInput}
                    value={state.email}
                />
                <Button
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {onSubmit}
                >
                    회원 가입
                </Button>
            </div>
        </div>
    );
};

export default Join;