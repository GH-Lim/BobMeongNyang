import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  makeStyles,
  useTheme,
  Tabs,
  Tab,
  Typography,
  Box,
  AppBar
} from "@material-ui/core";
import FeedMain from "../components/feedinfo/FeedMain";
import NutritionInfo from "../components/feedinfo/NutritionInfo";
import Feedreview from "../components/feedinfo/Feedreview"

const useStyles = makeStyles(theme => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
    width: "100vw",
    maxWidth: "375px"
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
const FeedInfo = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  return (
    <div className={classes.page}>
      <FeedMain />
      <div className={classes.tab}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="영양 정보" {...a11yProps(0)} />
            <Tab label="리뷰" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <NutritionInfo />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Feedreview/>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default FeedInfo;
