import "../App.css";
import logo from '/logo-no-background.svg'

function Home() {

  return (
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <h1>Repertoire</h1>
      <h4>This is the Home Page</h4>
    </div>
  );
}

export default Home;
