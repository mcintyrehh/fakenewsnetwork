import React from "react";
import ReactDom from "react-dom";
import { shallow } from 'enzyme';

import Header from "./Header";

describe("Header", () => {
    test("Rendering the component", () => {
        const wrapper = shallow(
            <Header />
        );

        expect(wrapper).toMatchSnapshot();
    });
});