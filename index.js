'use strict';

const parse = require('postcss-value-parser');

/**
 * @param  {String} str
 *
 * @return {String}
 */
function transform ( str ) {

	const ast = parse(str);

	ast.walk(( node ) => {

		if ( node.type === 'function' ) {

			const values = node.nodes;
			const maxQuery = values.some(( item ) => {
				return /max\-(?:width|height)/.test(item.value);
			});

			// If we are working with max-width/height query
			if ( maxQuery ) {
				values

					// Work only with pixel and em values
					.filter(( item ) => {
						const value = parse.unit(item.value);
						return item.type === 'word' && (value && /px|em/.test(value.unit));
					})

					// Apply gap
					.map(( item ) => {
						const value = parse.unit(item.value);
						const step = value.unit === 'px' ? 1 : 0.01;
						item.value = [Number(value.number) - step, value.unit].join('');
						return item;
					});
			}

		}

	});

	return ast.toString();
}

module.exports = ( opts ) => {
	const t = opts.types;

	function getParent ( path ) {
		const parent = path.parentPath;
		if ( t.isCallExpression(parent.node) ) {
			return parent;
		}
		return getParent(parent);
	}

	const updateMediaQuery = {
		StringLiteral: ( path ) => {
			path.node.value = transform(path.node.value);
		}
	};

	return {
		visitor: {
			Identifier: ( path ) => {
				if ( t.isIdentifier(path.node, { name: 'matchMedia' }) ) {
					const parent = getParent(path);
					parent.traverse(updateMediaQuery);
				}
			}
		}
	};
};
