import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Button,
  makeStyles,
  ButtonGroup,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Paper,
  Typography,
  ListItemSecondaryAction
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FeedComments from "./FeedComments";
import { useFetchData, useStore } from "../custom-hooks/custom-hooks";
import AddFeedReview from "./AddFeedReview";
import ModifyFeedReview from "./ModifyFeedReview";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  page: {
    //marginTop: theme.spacing(3),
    //marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    //justifyContent : "center"
  },
  ratingBox: {
    textTransform: "none",
    display: "inline",
    fontSize: "30px",
    padding: "0 3px",
    color: "#FFFFFF"
  },
  buttonBox: {
    justifyContent: "space-around",
    display: "flex",
    marginTop: "10px"
  },
  buttons: {
    width: "45%"
  },
  inlinecomp: {
    display: "flex-inline"
  },
  recommend: {
    color: "#00ab84"
  },
  nonrecommend: {
    color: "#b93c3c"
  }
}));

const Feedreview = props => {
  const classes = useStyles();
  const [open, setOpen] = useState({});
  const { input, dataFetch, isLoading } = useFetchData(
    "/review/" + props.f_No,
    "review"
  );
  const [like, setLike] = useState({});

  const { store } = useStore();
  useEffect(() => {
    dataFetch(store.url + "/review/" + props.f_No + "/"+store.u_No, "review");
  }, [store]);
  const openComments = event => {
    setOpen({
      ...open,
      [event.currentTarget.value]: !open[event.currentTarget.value]
    });
  };
  return (
    <div className={classes.page}>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <>
          <Box>
            <Box marginBottom="15px" marginTop="10px">
              <Paper
                className={classes.ratingBox}
                square={false}
                style={{
                  backgroundColor: input.validation
                    ? input.data.rank.r_Rank >= 4.0
                      ? "#00ab84"
                      : input.data.rank.r_Rank >= 2.5
                      ? "#ecdb54"
                      : "#b93c3c"
                    : "#000000"
                }}
              >
                {console.log(input)}
                {input.validation ? input.data.rank.r_Rank : "0"}
                {/* {4.3} */}
              </Paper>
              <Rating
                name="readonly"
                value={input.validation ? input.data.rank.r_Rank : "0"}
                readOnly
                precision={0.5}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            marginTop="10px"
            justifyContent="space-between"
            width="100%"
          >
            <Box>
              <ButtonGroup
                variant="text"
                aria-label="text primary button group"
              >
                <Button>베스트순</Button>
                <Button>최신순</Button>
              </ButtonGroup>
            </Box>
            <Box>
              <AddFeedReview>작성하기</AddFeedReview>
            </Box>
          </Box>
          {input.data === undefined ? (
            <div>...loading</div>
          ) : (
            input.data.list.map((data, i) => {
              return (
                <Box
                  paddingTop={1}
                  borderTop={1}
                  marginTop={1}
                  width="100%"
                  maxWidth="500px"
                >
                  <Box>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AccountCircle />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={data.u_Name}
                          //secondary={data.d_Species}
                        />
                        <ListItemSecondaryAction>
                          <Box
                            display="flex"
                            width="130px"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Typography variant="caption">
                              {data.r_Date}
                            </Typography>
                            <Box
                              m={1}
                              display={
                                data.u_No === store.u_No ? "flex" : "none"
                              }
                            >
                              {/* <EditIcon fontSize="small" /> */}
                              <ModifyFeedReview init={data} />
                              <DeleteIcon
                                fontSize="small"
                                onClick={event => {
                                  axios({
                                    method: "DELETE",
                                    headers: store.headers,
                                    url: store.url + "/review/" + data.r_No
                                  }).then(res => {
                                    if (res.data.validation) {
                                      dataFetch(
                                        store.url + "/review/" + props.f_No+ "/"+store.u_No,
                                        "review"
                                      );
                                    }
                                    alert(res.data.message);
                                  });
                                }}
                              />
                            </Box>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                          <Typography
                            className={
                              data.r_Rank > 2.5
                                ? classes.recommend
                                : classes.nonrecommend
                            }
                            variant="caption"
                          >
                            {data.r_Rank > 2.5 ? "추천" : "비추천"}{" "}
                          </Typography>
                          &nbsp;
                          <Rating
                            name="readonly"
                            value={data.r_Rank}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </List>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <Typography
                        variant="body1"
                        display="inline"
                        className={classes.recommend}
                      >
                        장점
                      </Typography>{" "}
                      {data.r_Positive}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <Typography
                        variant="body1"
                        display="inline"
                        className={classes.nonrecommend}
                      >
                        단점
                      </Typography>{" "}
                      {data.r_Negative}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <ThumbUpAltIcon
                        fontSize="small"
                        color={data.r_Good===1 ? "primary" : "action"}
                        onClick={event => { 
                          axios({method:"POST",url : store.url + "/review/good" , headers : store.headers , data : {r_No : data.r_No, u_No : store.u_No}}).then(res=>{
                            if(res.data.validation){
                              dataFetch(store.url + "/review/" + props.f_No+ "/"+store.u_No, "review");
                            }else{
                              alert(res.data.message);
                            }
                          })
                        }}
                      />
                      <Typography color = {data.r_Good===1 ? "primary" : "action"}>
                        추천   {data.r_Count}
                      </Typography>
                    </Box>
                    {/* <Typography variant="caption" color="textSecondary">
                    {data.r_Recommend}명이 도움 받았습니다
                  </Typography> */}
                    <Button color="secondary">신고</Button>
                  </Box>
                  {/* <Box className={classes.buttonBox}>
                  
                  <Button
                    className={classes.buttons}
                    id={i}
                    name="openButton"
                    value={data.r_No}
                    variant="outlined"
                    onClick={openComments}
                  >
                    댓글
                  </Button>
                </Box> */}
                  <Box display={open[data.r_No] ? "flex" : "none"}>
                    <FeedComments r_No={data.r_No} fullWidth />
                  </Box>
                </Box>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default Feedreview;
