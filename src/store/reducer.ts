import {
  CLOSE_DETAILS,
  OPEN_DETAILS,
  POKEMON_STATE,
} from "./actionTypes";

const initialState: InitialState = {
  pokemonDetails: {
    isDetailsOpen: false, // as default the pokemon details won't be displayed
    pokemon: null, // the id should be null as default
  },
  pokemonState: {
    pokemons: [],
    isLoading: false,
  }
};

const reducer = (
  state: InitialState = initialState,
  action: Action
):InitialState => {
  const pyl:ActionPayload = action.payload;
  // set the right action to update the state
  switch (action.type) {
    case OPEN_DETAILS:
      if (!pyl.pokemonDetails) return { ...state };
      return {
          ...state,
          pokemonDetails: pyl.pokemonDetails,
        };
    case CLOSE_DETAILS:
      if (!pyl.pokemonDetails) return { ...state };
      return {
        ...state,
        pokemonDetails: pyl.pokemonDetails,
      };

    case POKEMON_STATE:
      const newPokemonList = state.pokemonState.pokemons
        .concat(pyl.pokemons?pyl.pokemons:[])
        .sort((a, b) => a.id - b.id);
      return {
        ...state,
        pokemonState: {
          ...state.pokemonState,
          isLoading: pyl.isLoading?pyl.isLoading: state.pokemonState.isLoading,
          pokemons: newPokemonList,
        },
      };
    default:
      return { ...state };
  }
};

export default reducer;
