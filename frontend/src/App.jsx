import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Loading from "./components/Loading";
import Map from "./components/Map";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Loading />;
    case Status.FAILURE:
      return <h1>something failed...</h1>;
    case Status.SUCCESS:
      return <Map />;
  }
};

function App() {
  return <Wrapper apiKey={import.meta.env.VITE_MAP_API_KEY} render={render} />;
}

export default App;
