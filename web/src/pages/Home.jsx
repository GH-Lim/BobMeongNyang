import React from "react";
import CatIcon from "../caticon.png";
import DogIcon from "../dogicon.png";
import { Button, makeStyles, CardMedia, Box } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  home: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30vh"
  },
  icon: {
    width: '125px',
    hieght: '125px'
  }
}));
const Home = props => {
  const classes = useStyle();
  const buttonClick = event => {
    props.history.replace("/login");
  };
  return (
    <div className={classes.home}>
      <Box display="flex">
        <img src={DogIcon} alt="dogicon" className={classes.icon} />
        <img src={CatIcon} alt="caticon" className={classes.icon} />
      </Box>
      <p>Hello, This is Auto IoT Servent System</p>
      <Button color="primary" onClick={buttonClick}>
        시작하기
      </Button>
    </div>
  );
};

export default Home;
