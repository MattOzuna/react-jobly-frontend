import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext } from "./components/auth/UserContext";
import JoblyApi from "./api/api";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CompanyList from "./components/company/CompanyList";
import CompanyDetails from "./components/company/CompanyDetails";
import JobsList from "./components/jobs/JobsList";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import useLocalStorageState from "./hooks/useLocalStorageState";
import UserDetails from "./components/users/UserDetails";
import UserEditForm from "./components/users/UserEditForm";
import { mapJobsIds } from "./helpers";

function App() {
  const [userData, setUserData] = useLocalStorageState("user");

  const login = async (token, username) => {
    const res = await JoblyApi.getUser(username);
    const jobs = mapJobsIds(res.applications);
    setUserData({ ...jobs, token, username });
  };

  const register = (token, username) => setUserData({ token, username });

  const logout = () => setUserData({});

  const apply = async (username, jobId) => {
    const id = await JoblyApi.applyToJob(username, jobId);
    setUserData((userData) => ({ ...userData, [id]: id }));
  };

  return (
    <>
      <div className="app" data-bs-theme="dark">
        <UserContext.Provider value={{ userData, logout, apply }}>
          <BrowserRouter>
            <Navbar />
            <main className="main">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <ProtectedRoute exact path="/companies">
                  <CompanyList />
                </ProtectedRoute>
                <ProtectedRoute exact path="/jobs">
                  <JobsList />
                </ProtectedRoute>
                <ProtectedRoute exact path="/companies/:handle">
                  <CompanyDetails />
                </ProtectedRoute>
                <ProtectedRoute exact path="/users/:username">
                  <UserDetails />
                </ProtectedRoute>
                <ProtectedRoute exact path="/users/edit/:username">
                  <UserEditForm />
                </ProtectedRoute>
                <Route exact path="/login">
                  <LoginForm login={login} />
                </Route>
                <Route exact path="/register">
                  <SignupForm register={register} />
                </Route>
                <Route>
                  <p className="text-warning font-weight-bold">
                    Hmmm. I can't seem to find what you want.
                  </p>
                </Route>
              </Switch>
            </main>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
