<?php
/**
 * Contains all the Global common functions used throughout FooFields
 */

/**
 * Custom Autoloader used throughout FooFields
 *
 * @param $class
 */
function foofields_autoloader( $class ) {
	/* Only autoload classes from this namespace */
	if ( false === strpos( $class, FOOFIELDS_NAMESPACE ) ) {
		return;
	}

	/* Remove namespace from class name */
	$class_file = str_replace( FOOFIELDS_NAMESPACE . '\\', '', $class );

	/* Convert sub-namespaces into directories */
	$class_path = explode( '\\', $class_file );
	$class_file = array_pop( $class_path );
	$class_path = strtolower( implode( '/', $class_path ) );

	/* Convert class name format to file name format */
	$class_file = foofields_uncamelize( $class_file );
	$class_file = str_replace( '_', '-', $class_file );
	$class_file = str_replace( '--', '-', $class_file );

	/* Load the class */
	require_once FOOFIELDS_DIR . '/includes/' . $class_path . '/class-' . $class_file . '.php';
}

/**
 * Convert a CamelCase string to camel_case
 *
 * @param $str
 *
 * @return string
 */
function foofields_uncamelize( $str ) {
	$str    = lcfirst( $str );
	$lc     = strtolower( $str );
	$result = '';
	$length = strlen( $str );
	for ( $i = 0; $i < $length; $i ++ ) {
		$result .= ( $str[ $i ] == $lc[ $i ] ? '' : '_' ) . $lc[ $i ];
	}

	return $result;
}

/**
 * Safe way to get value from an array
 *
 * @param $key
 * @param $array
 * @param $default
 *
 * @return mixed
 */
function foofields_safe_get_from_array( $key, $array, $default ) {
	if ( is_array( $array ) && array_key_exists( $key, $array ) ) {
		return $array[ $key ];
	} else if ( is_object( $array ) && property_exists( $array, $key ) ) {
		return $array->{$key};
	}

	return $default;
}

/**
 * Safe way to get value from the request object
 *
 * @param $key
 *
 * @return mixed
 */
function foofields_safe_get_from_request( $key ) {
	return foofields_safe_get_from_array( $key, $_REQUEST, null );
}

/**
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 * Non-scalar values are ignored.
 *
 * @param string|array $var Data to sanitize.
 * @return string|array
 */
function foofields_clean( $var ) {
	if ( is_array( $var ) ) {
		return array_map( 'foofields_clean', $var );
	} else {
		return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
	}
}

/**
 * Safe way to get value from the request object
 *
 * @param $key
 * @param null $default
 * @param bool $clean
 *
 * @return mixed
 */
function foofields_safe_get_from_post( $key, $default = null, $clean = true ) {
	if ( isset( $_POST[$key] ) ) {
		$value = wp_unslash( $_POST[$key] );
		if ( $clean ) {
			return foofields_clean( $value );
		}
		return $value;
	}

	return $default;
}

/**
 * Run foofields_clean over posted textarea but maintain line breaks.
 *
 * @param  string $var Data to sanitize.
 * @return string
 */
function foofields_sanitize_textarea( $var ) {
	return implode( "\n", array_map( 'foofields_clean', explode( "\n", $var ) ) );
}

/**
 * Return a sanitized and unslashed key from $_GET
 * @param $key
 *
 * @return string|null
 */
function foofields_sanitize_key( $key ) {
	if ( isset( $_GET[$key] ) ) {
		return sanitize_key( wp_unslash( $_GET[ $key ] ) );
	}
	return null;
}

/**
 * Return a sanitized and unslashed value from $_GET
 * @param $key
 *
 * @return string|null
 */
function foofields_sanitize_text( $key ) {
	if ( isset( $_GET[$key] ) ) {
		return sanitize_text_field( wp_unslash( $_GET[ $key ] ) );
	}
	return null;
}
