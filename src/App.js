import './App.css';
import Landing from './components/Landing/Landing';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet> 
        <title>Flickr search </title>
        </Helmet>
    <Landing />
    </div>
  )
}

export default App;
