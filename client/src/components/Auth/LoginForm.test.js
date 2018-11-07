import React from "react";
import { shallow } from 'enzyme';

import Auth from "./LoginForm";

describe("Auth", () => {
    test("Rendering the component", () => {
        const Container = shallow(
            <Auth />
        );

        expect(Container).toMatchSnapshot();
    });
});