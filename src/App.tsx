import React, {  } from "react";
import { useSelector } from "react-redux";
import PokemonDetails from "./Containers/PokemonDetails";
import PokemonContainer from "./Containers/PokemonContainer";
import Header from "./Containers/Header";

const App = () => {
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // get the parameters from state
  const {
    pokemonDetails: { isDetailsOpen },
  } = initialState;
  return (
    <main>
      <Header />
      <div className="content">
        <PokemonContainer />
      </div>
      {isDetailsOpen && <PokemonDetails />}
    </main>
  );
};

export default App;
