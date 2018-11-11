import React from "react";
import ReactDom from "react-dom";
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";

import Header from "./Header";

describe("Header", () => {
    test("Rendering the component", () => {
        // conts wrapper = shallow(
        //     <Header />
        // );
        const tree = renderer.create(<Header />).toJSON()

        expect(tree).toMatchSnapshot();
    });
});