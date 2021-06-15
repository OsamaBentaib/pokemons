import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./../../store/reducer";
import PokemonItem from "./PokemonItem";
import { item } from "../../APIs/item";

const initialState: InitialState = {
  pokemonDetails: {
    isDetailsOpen: false, // as default the Pokemon details won't be displayed
    pokemon: null, // the id should be null as default
  },
  pokemonState: {
    isLoading: false,
    pokemons:  [],
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe("<PokemonItem /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <PokemonItem pokemon={item} />
      </Provider>
    );
  it(".pokemon__img should have a correct src", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon__img").prop("src")).toEqual(
      item.sprites.other.dream_world.front_default
    );
  });
  it(".grid__item should have a correct id", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".grid__item").prop("id")).toEqual(item.id.toString());
  });
  it(".grid__item should should be clicked correctly", () => {
    const wrapper = getWrapper();
    wrapper.find(".grid__item").simulate("click");
    expect(
      wrapper.find(".grid__item").hasClass("grid__item isOpen")
    ).toBeTruthy();
  });
  it(".pokemon__title should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon__title").text()).toEqual(item.name);
  });
  it(".pokemon__type should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon__type").text()).toEqual(
      item.types[0].type.name
    );
  });
  it(".pokemon__bg should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon__bg").text()).toEqual("");
  });
});
