/*
  This allows you to rerender with a selector or an element.
  The component attached to the node will be rerendered.
*/
import { rerender, getForgoState, RenderResult } from "forgo";

/*
  Namespaces
*/
const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
const MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

/*
  The element types we care about.
  As defined by the standards.
*/
const ELEMENT_NODE_TYPE = 1;
const ATTRIBUTE_NODE_TYPE = 2;
const TEXT_NODE_TYPE = 3;

/*
  The following adds support for injecting test environment objects.
  Such as JSDOM.
*/
export type EnvType = {
  window: Window | typeof globalThis;
  document: HTMLDocument;
};
const documentObject = globalThis ? globalThis.document : document;
const windowObject = globalThis ? globalThis : window;

let env: EnvType = {
  window: windowObject,
  document: documentObject,
};

function isString(val: unknown): val is string {
  return typeof val === "string";
}

export function setCustomEnv(value: any) {
  env = value;
}

export function rerenderElement(
  elementSelector: Element | string | null,
  props?: any
): RenderResult {
  let element = (isString(elementSelector)
    ? env.document.querySelector(elementSelector)
    : elementSelector) as Element;

  if (element) {
    if (element.nodeType === ELEMENT_NODE_TYPE) {
      const state = getForgoState(element);
      if (state && state.components.length) {
        return rerender(state.components[0].args.element, props);
      } else {
        throw new Error(
          "Could not find an attached component to rerender."
        );
      }
    } else {
      throw new Error(
        "The node passed to rerenderElement() should be an HTML element."
      );
    }
  } else {
    throw new Error(
      `The rerenderElement() function was called on a non-element (${
        typeof elementSelector === "string"
          ? elementSelector
          : elementSelector?.tagName
      }).`
    );
  }
}
