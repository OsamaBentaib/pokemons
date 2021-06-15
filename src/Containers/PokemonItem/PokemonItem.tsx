import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_DETAILS } from "../../store/actionTypes";

interface IProps {
  pokemon: PokemonDetails;
}
export default function PokemonItem(props: IProps) {
  const {
    pokemon: { id, name, sprites, types },
  } = props;
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // dispatch the changes
  const dispatch = useDispatch<DispatchType>();

  const onViewDetails = () => {
    /***
     *  The function will open the details so it's can be viewd
     *  This will update the state for the details and desplay the item that we need
     */
    dispatch({
      type: OPEN_DETAILS, // the action type that we need for reducer
      payload: {
        pokemonDetails: {
          isDetailsOpen: true,
          pokemon: props.pokemon,
        },
      },
    });
  };
  return (
    <div
      className={`grid__item${
        initialState.pokemonDetails.isDetailsOpen ? " isOpen" : ""
      }`}
      id={id.toString()}
      onClick={() => onViewDetails()}
    >
      <div className="pokemon">
        <div className="pokemon__bg"></div>
        <img
          className="pokemon__img"
          src={sprites.other.dream_world.front_default}
          alt="...."
        />
        <h2 className="pokemon__title">{name}</h2>
        <div className="pokemon__type">{types[0].type.name}</div>
      </div>
    </div>
  );
}
