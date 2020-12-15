import "./index.css"
import { Route } from 'react-router-dom';
import HeaderRouter from './HeaderRouter';
import About from './view/About'
import Index from './view/Index'
import JoinUs from './view/JoinUs'

function App() {
  return (
< >
  <HeaderRouter />

  <Route path={["/","/index"]} exact strict component={Index}/>
  <Route path="/about" exact strict component={About}/>
  <Route path="/joinus" exact strict component={JoinUs}/>
</>
  )
}

export default App;
