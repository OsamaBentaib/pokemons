import React from "react";
import { useDispatch } from "react-redux";
import { OPEN_DETAILS } from "../../store/actionTypes";

interface IProps {
  pokemon: PokemonDetails;
}
export default function PokemonItem(props: IProps) {
  const {
    pokemon: { id, name, sprites, types },
  } = props;
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
          pokemon:props.pokemon,
        }
      },
    });
  };
  return (
    <div
      className="grid__item"
      id={id.toString()}
      onClick={() => onViewDetails()}
    >
      <div className="product">
        <div className="product__bg"></div>
        <img
          className="product__img"
          src={sprites.other.dream_world.front_default}
          alt="...."
        />
        <h2 className="product__title">{name}</h2>
        <div className="product__price">{types[0].type.name}</div>
      </div>
    </div>
  );
}
