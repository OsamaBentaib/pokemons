import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FiLoader } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { POKEMON_STATE } from "../../store/actionTypes";
import { apiURL } from "../../utils";
import PokemonItem from "../PokemonItem";


export default function PokemonContainer() {
  // dispatch the state
  const dispatch = useDispatch<DispatchType>();
  // fetch query
  const [fetchURL, setFetchURL] = React.useState<string>(
    `${apiURL}/pokemon?limit=20`
  );
  const getPokemonItem = async ({ name }: PokemonShort) => {
    const res = await fetch(`${apiURL}/pokemon/${name}`);
    const data: PokemonDetails = await res.json();
    return dispatch({
      type: POKEMON_STATE,
      payload: {
        pokemons: [data],
      },
    });
  };
  const fetchPokemons = async () => {
    const res = await fetch(fetchURL);
    const data: PokemonLists = await res.json();
    setFetchURL(data.next);
    return data.results.forEach(
      async (result: PokemonShort) => await getPokemonItem(result)
    );
  };
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  const {
    pokemonState: { pokemons },
  } = initialState;

  // navigate on the pagination
  const loader = useRef<HTMLDivElement | null>(null);
  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      const ele: Element = loader.current;
      observer.observe(ele);
    }
  }, []);
  return (
    <>
      <div className="grid">
        {pokemons.map((edge: PokemonDetails, index: number) => (
          <PokemonItem pokemon={edge} key={index} />
        ))}
        <div ref={loader}>
          <div className="grid__item">
            <div className="pokemon">
              <div className="pokemon__bg">
                <div className="__emoji spinner">
                  <FiLoader />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
