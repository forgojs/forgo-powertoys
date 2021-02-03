# Forgo Power Toys

A set of utility functions for use in Forgo Apps.

## renderElement()

Renders a component mounted on an element.

```tsx
import { rerenderElement } from "forgo-powertoys";

function LiveScores() {
  return {
    render(props) {
      return <p id="live-scores">Top score is {props.topscore}</p>;
    }
  }
}

rerenderElement(
  "#live-scores", 
  { topscore: 244 }
);
```