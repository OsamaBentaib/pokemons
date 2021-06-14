type Details = {
  isDetailsOpen: boolean;
  pokemon: PokemonDetails | null;
};
type PokemonState = {
  pokemons: PokemonDetails[];
  isLoading: boolean;
}
type InitialState = {
  pokemonDetails: Details;
  pokemonState: PokemonState;
};
type ActionPayload = {
  isLoading?: boolean;
  pokemons?: PokemonDetails[];
  pokemonDetails?: Details;
};
type Action = {
  type: string;
  payload: ActionPayload;
};

type DispatchType = (args: Action) => Action;
