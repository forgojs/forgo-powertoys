# Forgo Power Toys

A set of utility functions for use in Forgo Apps.

## The rerenderElement function

Renders a component mounted on an element.

```tsx
import { rerenderElement } from "forgo-powertoys";

// A forgo component.
function LiveScores() {
  return {
    render(props) {
      return <p id="live-scores">Top score is {props.topscore}</p>;
    },
  };
}

// Call rerender on the element.
rerenderElement("#live-scores", { topscore: 244 });

// As needed, any time.
rerenderElement("#live-scores", { topscore: 255 });
```
