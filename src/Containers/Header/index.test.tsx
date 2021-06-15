import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header render without crashes", () => {
  test("renders title", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1").text()).toContain("Pokémon.");
  });
  test("renders info", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("span").text()).toContain("Best resourse for pokémons");
  });
});
