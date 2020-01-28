import React, { useCallback } from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { submitLogout } from '../../../modules/login';
const useStyles = makeStyles(theme => ({
  noteList: {
    height: "100%"
  },
  noteListItem: {
    height: 30
  },
  listItemText: {
    fontSize: "0.7rem"
  }
}));
const UserPopOver = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(submitLogout()),[dispatch]);
  const onClickLogout = ()=>{
    console.log(history);
    logout();
    history.push('/login');
  }
  const items = [
    {
      key: 1,
      value: "회원정보",
      icon: <PermIdentityIcon fontSize="small" />,
      action : 's'
    },
    {
      key: 2,
      value: "로그아웃",
      icon: <PowerSettingsNewIcon fontSize="small" />,
      event :  onClickLogout
    }
  ]; // Test data
  
  return (
    <List className={classes.noteList}>
      {items.map(item => (
        <ListItem  button key={`${item.key}`} name ={`${item.key}`} className={classes.noteListItem} onClick = {item.event}>
          <ListItemIcon  >{item.icon}</ListItemIcon>
          <ListItemText primary={`${item.value}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserPopOver;
