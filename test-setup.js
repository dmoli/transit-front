/**
 * para arreglar el test a los archivos con react-slick
 * *matchMedia not present, legacy browsers require a polyfill*
 */

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function fn() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
