import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PokemonItem from "./PokemonItem";

Enzyme.configure({ adapter: new Adapter() });
const pokemon: Pokemon = {
  id: "blue-normal2",
  name: "Blue pokemon",
  imageUrl: "/pokemons/normal-blue2.jpg",
  description: "An extraordinary blue pokemon.",
};
describe("Header render without crashes", () => {
  test("renders pokemon image", () => {
    const wrapper = shallow(<PokemonItem pokemon={pokemon} />);
    expect(wrapper.find(".product__img").prop("src")).toEqual(pokemon.imageUrl);
  });
  test("renders pokemon name", () => {
    const wrapper = shallow(<PokemonItem pokemon={pokemon} />);
    expect(wrapper.find(".product__title").text()).toContain(pokemon.name);
  });
  test("renders pokemon price", () => {
    const wrapper = shallow(<PokemonItem pokemon={pokemon} />);
    expect(wrapper.find(".product__price").text()).toContain(
      "$" + pokemon.price
    );
  });
});
