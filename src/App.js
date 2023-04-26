import Routes from "./routes";
import UserProvider from "./providers/UserProvider";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
    </>
  );
}

export default App;
