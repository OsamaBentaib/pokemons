import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiLoader } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { apiURL } from "../../utils";
import { CLOSE_DETAILS } from "../../store/actionTypes";

export default function PokemonDetails() {
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // the the states that we need
  const {
    pokemonDetails,
  } = initialState;
  const [pokemon, setPokemon] = useState<PokemonDetails|null>(pokemonDetails.pokemon);
  // dispatch
  const dispatch = useDispatch<DispatchType>();
  const [loading, setLoading]= useState(false)
  const fetchMoreDetails = async () => {
    if (!pokemon) return;
    setLoading(true);
    const gender: Name = await(
      await fetch(`${apiURL}/gender/${pokemon?.id}/`)
    ).json().then(d=>d).catch(()=>({name:"N/A"}));
    const species: PokeSpecies|undefined = await(
      await fetch(`${apiURL}/pokemon-species/${pokemon?.id}/`)
    ).json().then(d=>d).catch(()=>undefined);
    const charactiristic: PokeCharacter | undefined = await(
      await fetch(`${apiURL}/characteristic/${pokemon?.id}/`)
    )
      .json()
      .then((d) => ({
        descriptions: d.descriptions.filter(
          (e: any) => e.language.name === "en"
        ),
      }))
      .catch(() => undefined);
    const abilities: PokeAbility[] = [];
    for (const i of pokemon.abilities) {
      const data = await(await fetch(i.ability.url))
        .json()
        .then((d) => ({
          effect_entries: d.effect_entries.filter(
            (e: any) => e.language.name === "en"
          ),
          flavor_text_entries: d.flavor_text_entries.filter(
            (e: any) => e.language.name === "en"
          ),
        })).catch(()=>undefined);
      if (data) {
        const ability: PokeAbility = {
          name: i.ability.name,
          ...data,
        };
        abilities.push(ability);
      }
    }
    const moreDetails: MoreDetails = {
      abilities,
      gender,
      charactiristic,
      species
    }
    console.log(moreDetails);
    setLoading(false);
     return setPokemon({ ...pokemon, moreDetails: moreDetails });
  }
  useEffect(() => {
    fetchMoreDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onCloseDetails = () => {
    /***
     *  The function will open the details so it's can be viewd
     *  This will update the state for the details and desplay the item that we need
     */
    dispatch({
      type: CLOSE_DETAILS, // the action type that we need for reducer
      payload: {
        // the state the we need to change
        pokemonDetails: {
          isDetailsOpen: false, // Close the details
          pokemon: null, // the pokemon id we don't need it anymore
        },
      },
    });
  };
  if (!pokemon)
    // there's an error with the apis
    return (
      <div className="details details--open">
        <div className="details__bg details__bg--up"></div>
        <div className="details__bg details__bg--down"></div>
        <h2 className="details__title">Ooops...</h2>
        <div className="details__deco">
          <div className="__emoji">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
          </div>
        </div>
        <p className="details__description">
          Something went wrong, Please try again later
        </p>
        <button
          className={`details__addtocart`}
          onClick={() => onCloseDetails()}
        >
          Back to home
        </button>
      </div>
    );
  const bg = pokemon.moreDetails?.species?.color?.name.toLocaleLowerCase();
  return (
    <div className="details details--open">
      <div className="details__bg details__bg--up"></div>
      <div className="details__bg details__bg--down"></div>
      <img
        className="details__img"
        src={pokemon.sprites.other.dream_world.front_default}
        alt="...."
      />
      <h2 className="details__title">{pokemon.name}</h2>
      <div
        className="details__deco"
        style={{
          background: bg,
        }}
      ></div>
       {!loading ? (
        <>
          <p className="details__description">
        <span className="">
          Abilities
          <BsDot /> {pokemon.abilities.length}
        </span>
        {pokemon.moreDetails?.abilities?.map((e: PokeAbility, i: number) => (
          <div key={i}>
            <Span bg={bg}>{e.name}</Span>
            <BsDot />
            {e.effect_entries[0].effect}
            <BsDot />
            {e.flavor_text_entries[0].flavor_text}
          </div>
        ))}
      </p>
          <div className="">
            <table>
              <tr>
                <td>Charactiristic</td>
                <td>
                  {
                    pokemon.moreDetails?.charactiristic?.descriptions[0]
                      .description
                  }
                </td>
                <td>Hieght</td>
                <td>{pokemon.height}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{pokemon.weight}</td>
                <td>Gender</td>
                <td>{pokemon.moreDetails?.gender?.name}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>{pokemon.moreDetails?.species?.color.name}</td>
                <td>Color</td>
                <td>{pokemon.moreDetails?.species?.color.name}</td>
              </tr>
              <tr>
                <td>Happiness</td>
                <td>{pokemon.moreDetails?.species?.base_happiness}</td>
                <td>Capture rate</td>
                <td>{pokemon.moreDetails?.species?.capture_rate}</td>
              </tr>
              <tr>
                <td>Form switchable</td>
                <td>
                  {pokemon.moreDetails?.species?.forms_switchable
                    ? "Yes"
                    : "No"}
                </td>
                <td>Shape</td>
                <td>{pokemon.moreDetails?.species?.shape.name}</td>
              </tr>
              <tr>
                <td>Growth rate</td>
                <td>{pokemon.moreDetails?.species?.growth_rate.name}</td>
                <td>Generation</td>
                <td>{pokemon.moreDetails?.species?.generation.name}</td>
              </tr>
            </table>
          </div>
          </>
        ) : (
          <div className="spinner">
            <FiLoader />
          </div>
        )}
      <button className="details__close" onClick={() => onCloseDetails()}>
        <FiX />
      </button>
    </div>
  );
}

const Span = ({children, bg}:{children:any, bg?:string}) => {
  return (
    <span
      style={{
        background: bg,
        padding: 3,
        color: bg === "black" ? "white" : "black",
      }}
    >
      {children}
    </span>
  );
}