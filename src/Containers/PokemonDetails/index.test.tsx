import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../store/reducer";
import { item } from "../../APIs/item";
import "../../__mocks__/intersectionObserverMock.js";
import { FiLoader } from "react-icons/fi";
import PokemonDetails from "./PokemonDetails";

const initialState_A: InitialState = {
  pokemonDetails: {
    isDetailsOpen: false, // as default the Pokemon details won't be displayed
    pokemon: null, // the id should be null as default
  },
  pokemonState: {
    isLoading: false,
    pokemons: [],
  },
};
const initialState_B: InitialState = {
  pokemonDetails: {
    isDetailsOpen: false, // as default the Pokemon details won't be displayed
    pokemon: item, // the id should be null as default
  },
  pokemonState: {
    isLoading: false,
    pokemons: [],
  },
};
Enzyme.configure({ adapter: new Adapter() });

describe("<PokemonDetails /> unit test with error", () => {
  const mockStore = createStore(reducer, initialState_A);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <PokemonDetails />
      </Provider>
    );
  it(".details should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details").length).toEqual(1);
  });
  it(".details__bg--up should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__bg--up").length).toEqual(1);
  });
  it(".details__bg--down should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__bg--down").length).toEqual(1);
  });
  it(".details__title should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__title").length).toEqual(1);
  });
  it(".details__title text is correct", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__title").text()).toEqual("Ooops...");
  });
  it(".__emoji spinner should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".__emoji").length).toEqual(1);
  });
  it(".details__backhome spinner should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__backhome").length).toEqual(1);
  });
  it(".details__description spinner should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__description").text()).toEqual(
      "Something went wrong, Please try again later"
    );
  });
});

describe("<PokemonDetails /> unit test with data", () => {
  const mockStore = createStore(reducer, initialState_B);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <PokemonDetails />
      </Provider>
    );
  it(".details should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details").length).toEqual(1);
  });
  it(".details__bg--up should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__bg--up").length).toEqual(1);
  });
  it(".details__bg--down should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__bg--down").length).toEqual(1);
  });
  it(".details__title should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".details__img").prop("src")).toEqual(
      item.sprites.other.dream_world.front_default
    );
  });
});
