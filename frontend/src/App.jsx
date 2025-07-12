import './App.css';
import Navbar from './Component/Navbar';
import Searchbar from './Component/Searchbar';
import Pagetoggle from './Component/Pagetoggle'; 

function App() {
  return (
    <div className="page-wrapper">
      <div className="main-content">
        <Navbar />
        <Searchbar />
      </div>
      <div className="pagetoggle">
        <Pagetoggle totalPages={7} />
      </div>
    </div>
  );
}

export default App;
