'use strict';

// MODULES //

var isPositive = require( 'validate.io-positive-primitive' );

// FUNCTIONS //

var pow = Math.pow;


// CONSTANTS //

var PI = Math.PI,
	PI2 = pow( PI, 2 ),
	EKURTOSIS_RAYLEIGH = - ( 6 * PI2 - 24 * PI + 16 ) / pow( 4 - PI, 2 );


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
	return EKURTOSIS_RAYLEIGH;
} // end FUNCTION ekurtosis()


// EXPORTS

module.exports =  ekurtosis;
