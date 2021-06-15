import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../store/reducer";
import { item } from "../../APIs/item";
import PokemonContainer from "./PokemonContainer";
import "../../__mocks__/intersectionObserverMock.js";
import { FiLoader } from "react-icons/fi";
const initialState: InitialState = {
  pokemonDetails: {
    isDetailsOpen: false, // as default the Pokemon details won't be displayed
    pokemon: null, // the id should be null as default
  },
  pokemonState: {
    isLoading: false,
    pokemons: [],
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe("<PokemonContainer /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <PokemonContainer />
      </Provider>
    );
  it(".grid__item should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".grid__item").length).toEqual(1);
  });
  it(".pokemon should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon").length).toEqual(1);
  });
  it(".grid should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".grid").length).toEqual(1);
  });
  it(".pokemon__bg should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".pokemon__bg").length).toEqual(1);
  });
  it(".__emoji spinner should be exist", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".__emoji").length).toEqual(1);
  });
});
