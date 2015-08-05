'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );


// EKURTOSIS //

/**
* FUNCTION ekurtosis( sigma )
*	Computes the distribution ekurtosis for a Rayleigh distribution with parameter sigma.
*
* @param {Number} sigma - scale parameter
* @returns {Number} distribution ekurtosis
*/
function ekurtosis( sigma ) {
	if ( !isPositive( sigma ) ) {
		return NaN;
	}
	return EKURTOSIS;
} // end FUNCTION ekurtosis()


// EXPORTS

module.exports =  ekurtosis;
