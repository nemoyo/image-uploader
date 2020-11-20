import 'whatwg-fetch';
import '@babel/polyfill';
import {callApi} from "./babel2.js";

let getTriangle = (base, height) => {
	  return base * height / 2;
};

const triangle = document.getElementById('list');
triangle.innerHTML = '三角形の面積は' + getTriangle(10,2);

callApi();



