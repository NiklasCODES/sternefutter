import React, { useState } from "react";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import CustomerTableView from "./CustomerTableView";
import {
  Drawer,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

import './App.css';

export const NavigationBar = (props: any) => {

  const [visible, setVisible] = useState(false);
  const toggleDrawer = () => setVisible(!visible);

  return (
    <div style={{ height: 1080  }}>
        <div style={styles.appBarContainer}>
            <AppBar position="static">
                      <Toolbar>
                          <IconButton
                              size="large"
                              edge="start"
                              color="inherit"
                              aria-label="menu"
                              sx={{ mr: 2 }}
                              onClick={toggleDrawer}
                          >
                              <MenuIcon />
                          </IconButton>
                          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                              Menü
                          </Typography>
                      </Toolbar>
              </AppBar>
              <Drawer
                  anchor="left"
                  open={visible}
                  onClose={toggleDrawer}
              >
                  <Box
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                  >
                    <List>
                        <Link to="/assistant">
                          <ListItem key="Kundenassistent" disablePadding>
                            <ListItemButton>
                              <ListItemText primary="Kundenassistent" />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/codes">
                          <ListItem key="Rabattcodes" disablePadding>
                            <ListItemButton>
                              <ListItemText primary="Rabattcodes" />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/merge">
                          <ListItem key="Kunden vereinen" disablePadding>
                            <ListItemButton>
                              <ListItemText primary="Kunden vereinen" />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                    </List>
                  </Box>
            </Drawer>
        </div>
        {props.children}
    </div>
  );
};

export default function App() {
  return (
    <NavigationBar />
  );
}

const styles = {
  rootContainer: {
      display: "flex",
      flexDirection: "column" as "column"
  },
  appBarContainer: {
      position: "absolute" as "absolute",
      left: 0,
      top: 0,
      width: "100%"
  },
  mainPageContent: {

  },
  drawerContentContainer: {
      width: 200,
  },
}
