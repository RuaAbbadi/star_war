import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StarWarsTable from "./pages/starWarTable/StarWarsTable.tsx";
import PatientForm from "./pages/PatientForm/PatientForm.tsx";
import './App.css'
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  return (
    <Router>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250 }}
          >
            <List>
              <ListItem component={Link} to="/">
                <ListItemText primary="Start Wars Characters"></ListItemText>
              </ListItem>
              <ListItem component={Link} to="/patient-form">
                <ListItemText primary="Patient Form"></ListItemText>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main style={{ flexGrow: 1, padding: "20px", marginTop: "64px" }}>
          <Routes>
            <Route path="/" element={<StarWarsTable />}></Route>
            <Route path="/patient-form" element={<PatientForm />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
