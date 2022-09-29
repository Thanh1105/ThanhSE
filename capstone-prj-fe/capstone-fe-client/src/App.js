import './App.css';
import Header from './components/share/layout/header/header';
import './components/share/layout/header/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import Footer from './components/share/layout/footer/footer';
import './components/home/home.css'
import { gapi } from 'gapi-script';
import Home from './components/home';

const clientId = "422871785445-kktuak1kdkcbtiejrb7m5ea7bo4uguc0.apps.googleusercontent.com";
function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  });
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
