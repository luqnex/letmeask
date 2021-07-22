import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home' 
import { NewRoom } from './pages/NewRoom' 
import { Room } from './pages/Room';

import { AuthContextProvider } from './constexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} /> 
          <Route path="/room/new" exact component={NewRoom} /> 
          <Route path="/room/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
