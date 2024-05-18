import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
// import NotFound from './Components/NotFound'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" /> */}
    </Switch>
  </BrowserRouter>
)
export default App
