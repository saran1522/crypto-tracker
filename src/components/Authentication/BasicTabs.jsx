import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Signup from "./Signup";
import Login from "./Login";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, color: "white" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ handleClose }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sign Up" {...a11yProps(0)} />
          <Tab label="Login" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box p={1}>
        <span
          style={{
            color: "orange",
          }}
        >
          Only Sign In with google is working for now
        </span>
        <CustomTabPanel value={value} index={0}>
          {/* <Signup handleClose={handleClose} /> */}
          {value === 0 && <Signup handleClose={handleClose} />}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* <Login handleClose={handleClose} /> */}
          {value === 1 && <Login handleClose={handleClose} />}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
