import './components/AppChrome.css';
import AppBar from './components/AppBar.jsx';
import AppFooter from './components/AppFooter.jsx';
import RetroBoard from './components/RetroBoard.jsx';

const App = () => {
  return (
    <>
      <AppBar />

      <main className="AppMain">
        <RetroBoard />
      </main>

      <AppFooter />
    </>
  );
};

export default App;
