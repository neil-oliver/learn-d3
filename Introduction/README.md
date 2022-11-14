## Overview
Most d3 projects follow a similar structure with a few core components
-   Data
-   SVG Setup (inc. margins)
-   Scales
-   DOM manipulation
-   Axis

D3 is collection of helper functions which primarily fall into two main areas: 
-   Math-related such as scales, interpolation, simulations
-   DOM-related such as data joins to SVG elements

You do not need to use d3 for everything and can mix and match where appropirate. A good example is data loading from an external source. d3 has [d3-fetch](https://github.com/d3/d3-fetch/tree/v3.0.1) for different types of data fetching, however the same result can be achieved through [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) or [axios](https://axios-http.com/).

On a *very* basic level, creating svg based data visualization for the web is very difficult without use d3 for scales, DOM manipulation (data joining) and axis. These would be the key areas to learn what d3 has to offer!

## Reference Documentation
[d3 API Reference](https://github.com/d3/d3/blob/main/API.md)
[Mozilla SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)

## basic SVG structure
- [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg)
    - [Group](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g)
        - [Elements i.e. Circle, Rect etc](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle)

## Notes
SVG Requires a height and width, for responsive scaling a [viewbox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) can be used.
Groups have no size or x,y position, however they can be transformed to a position.

## d3 Notes
d3 has gone through several variations (currently v.7 at the time of creating this example). it is important to pay attention to the version used for online examples, with major changes happening at v5 to the syntax. 