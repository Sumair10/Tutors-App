import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./components/Layout/Contact";
import StudentSignup from "./components/Student/StudentSignup";
import Home from "./components/Layout/Home";
import Navbar from "./components/Layout/Navbar";
import StudentSigning from "./components/Student/StudentSignin";
import StudentDashBoard from "./components/Student/StudentDashBoard";
import TutorSignup from "./components/Tutor/TutorSignup";
import TutorSignin from "./components/Tutor/TutorSignin";
import TutorDashboard from "./components/Tutor/TutorDashboard";
import PostTitionRequest from "./components/Student/PostTitionRequest";
import TutorProposalForm from "./components/Tutor/TutorProposalForm";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
    
      <div className="App ">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>

        {/* ----------- student routers ---------- */}

        <Switch>
          <Route path="/studentSignup">
            <StudentSignup />
          </Route>
        </Switch>
        <Switch>
          <Route path="/studentSignin">
            <StudentSigning />
          </Route>
        </Switch>
        <Switch>
          <Route path="/studentDashboard">
            <StudentDashBoard />
          </Route>
        </Switch>

        {/* ----------- tutor routers ---------- */}

        <Switch>
          <Route path="/tutorSignup">
            <TutorSignup />
          </Route>
        </Switch>
        <Switch>
          <Route path="/tutorSignin">
            <TutorSignin />
          </Route>
        </Switch>
        <Switch>
          <Route path="/tutorDashboard">
            <TutorDashboard />
          </Route>
        </Switch>

        <Switch>
          <Route path="/postTutionRequest">
            <PostTitionRequest />
          </Route>
        </Switch>

        <Switch>
          <Route path="/tutorProposalForm/:id">
            <TutorProposalForm />
          </Route>
        </Switch>

        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
