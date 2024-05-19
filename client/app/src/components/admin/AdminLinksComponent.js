import React, { useState } from "react";
import { Link } from "react-router-dom";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ChatIcon from '@mui/icons-material/Chat';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const drawerWidth = 240;


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const AdminLink = ({ to, label, icon }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <Tab
      label={
        <div>
          {icon}
          <br /> {label}
        </div>
      }
      {...a11yProps(0)}
    />
  </Link>
);

// export default function AdminLinksComponent() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box display="flex" 
//     sx={{
//       bgcolor: "#1f2532",
//       overflow: "visible",
//       borderColor: "divider",}}
//     >
//       <CssBaseline />

//      <div 

//      style={{display:"flex",flexDirection:"column",padding:"20px",height:"75vh"}}>

//  <AdminLink
//       to="/admin/orders"
//       label="Orders"
//       icon={<AddShoppingCartIcon />}
//     />
// <AdminLink
//   to="/admin/products"
//   label="Products"
//   icon={<Inventory2Icon />}
// />
// <AdminLink
//   to="/admin/users"
//   label="Users"
//   icon={<GroupAddIcon />}
// />


//      </div>
//       {/* <Tabs
//         orientation="vertical"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         sx={{
//           bgcolor: "#1f2532",
//           top: 0,
//           "& .MuiTab-root": {
//             color: "white",
//             fontWeight: "200",
//             textTransform: "none",
//             fontSize: "12px"
//           },
//           overflow: "visible",
//           borderRight: 1,
//           borderColor: "divider",
//           width: "300px",
//           height: "100vh",
//         }}
//       >

//       </Tabs> */}
//     </Box>
//   );
// }


function AdminLinksComponent(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Typography variant="h5" sx={{ margin: "20px" }}><AdminPanelSettingsIcon /> Admin Dashboard</Typography>
      <List>
        <ListItem>
          <ListItemButton>
            <AdminLink
              to="/admin/orders"
              label="Orders"
              icon={<AddShoppingCartIcon />}
            />
          </ListItemButton>
        </ListItem>

        <ListItem>

          <AdminLink
            to="/admin/products"
            label="Products"
            icon={<Inventory2Icon />}
          />
        </ListItem>
        <ListItem>
          <ListItemButton>
            <AdminLink
              to="/admin/users"
              label="Users"
              icon={<GroupAddIcon />}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <AdminLink
              to="/admin/chats"
              label="Chat"
              icon={<ChatIcon />}
            />
          </ListItemButton>

        </ListItem>
        <ListItem>
          <AdminLink
            to="/admin/analytics"
            label="Analytics"
            icon={<StackedBarChartIcon />}
          />
        </ListItem>
      </List>
    </div>
  );
  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {
        mobileOpen ? <div
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)`, lg: `0px` },
            ml: { sm: `${drawerWidth}px` },
            mt: { lg: `${drawerWidth}px` }
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin
            </Typography>
          </Toolbar>
        </div> : null
      }

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}

AdminLinksComponent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default AdminLinksComponent;
