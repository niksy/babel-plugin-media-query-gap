# babel-plugin-media-query-gap

[![Build Status][ci-img]][ci]

Babel plugin for applying gap on max-width/height media queries.

Useful when you want to [prevent double breakpoints](http://tzi.fr/css/prevent-double-breakpoint).

## Install

```sh
npm install babel-plugin-media-query-gap --save
```

## Usage

Use it via available [plugin activation options][babel-plugins].

For `.babelrc` file:

```json
{
	"plugins": [
		"babel-plugin-media-query-gap"
	]
}
```

Then, in your code:

```js
/* Before */

// Standard matchMedia call
window.matchMedia('screen and (max-width:600px)');

// Special leading comment before string or template literal
const jackie = /* @media */ 'screen and (max-width:600px)';

/* After */

window.matchMedia('screen and (max-width:599px)');

const jackie = /* @media */ 'screen and (max-width:599px)';
```

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/babel-plugin-media-query-gap
[ci-img]: https://img.shields.io/travis/niksy/babel-plugin-media-query-gap.svg
[babel-plugins]: http://babeljs.io/docs/plugins/
