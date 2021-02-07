<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

if ( ! class_exists( __NAMESPACE__ . '\DateTime' ) ) {

	class DateTime extends Field {

		function render_input( $override_attributes = false ) {

			$timestamp = intval( $this->value() );

			if ( $timestamp === 0 && isset( $this->default ) ){
				$timestamp = $this->default;
			}

			if ( isset( $this->config['adjust_timezone'] ) && $this->config['adjust_timezone'] ) {
				$timestamp = $timestamp + (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
			}

			$datetime = date_create( '@' . $timestamp );

			$hours = floor(( $timestamp % DAY_IN_SECONDS ) / HOUR_IN_SECONDS );
			$minutes = floor(( $timestamp % HOUR_IN_SECONDS ) / MINUTE_IN_SECONDS );

			echo '<div class="foofields-time-selector">';

			self::render_html_tag( 'input', array(
				'name' => $this->name . '[date]',
				'id' => $this->unique_id . '_date',
				'type' => 'date',
				'value' => $datetime->format( 'Y-m-d' )
			) );

			$this->render_component( 'hours', 'H', $hours, 23 );
			$this->render_component( 'minutes', 'm', $minutes, 59 );
			echo '</div>';

		}

		function render_component( $type, $suffix, $value = 0, $max = 0 ){

			$unique_id = $this->unique_id . '_' . $type;
			$label_attributes = array(
				'class' => 'foofields-time-component foofields-time-' . $type,
				'for' => $unique_id
			);

			$input_attributes = array(
				'class' => 'foofields-time-input',
				'name' => $this->name . '[' . $type . ']',
				'id' => $unique_id,
				'type' => 'number',
				'value' => $value,
				'min' => 0,
				'step' => 1
			);

			if ( $max > 0 ){
				$input_attributes['max'] = $max;
			}

			$span_attributes = array(
				'class' => 'foofields-time-suffix'
			);

			$this->render_html_tag( 'label', $label_attributes, null, false );

			$this->render_html_tag( 'input', $input_attributes );
			$this->render_html_tag( 'span', $span_attributes, $suffix );

			echo '</label>';
		}

		function get_posted_value( $sanitized_form_data ) {
			$values = parent::get_posted_value( $sanitized_form_data );

			if ( is_array( $values ) ) {
				$date    = $values['date'];
				$hours   = intval( $values['hours'] );
				$minutes = intval( $values['minutes'] );

				if ( empty( $date ) ) {
					$date = '1970-01-01';
				}

				$timestamp = strtotime( $date . ' ' . $hours . ':' . $minutes );
				if ( isset( $this->config['adjust_timezone'] ) && $this->config['adjust_timezone'] ) {
					$timestamp = $timestamp - (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
				}
			} else {
				$timestamp = $values;
			}

			return $timestamp;
		}

		function validate( $posted_value ) {
			$timestamp = intval( $posted_value );
			if ( isset( $this->config['adjust_timezone'] ) && $this->config['adjust_timezone'] ) {
				$timestamp = $timestamp + (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
			}

			if ( isset( $this->config['minimum'] ) && is_numeric( $this->config['minimum'] ) && $timestamp < $this->config['minimum'] ){
				$minimum = date( 'r', $this->config['minimum'] );
				$message = __( 'Please select a date greater than %s for %s!', $this->container->manager->text_domain );
				$this->error = sprintf( $message, $minimum, $this->label );
				return false;
			}
			if ( isset( $this->config['minimum'] ) && $this->config['minimum'] === 'now' && $timestamp < time() ){
				$message = __( 'Please select a date in the future for %s!', $this->container->manager->text_domain );
				$this->error = sprintf( $message, $this->label );
				return false;
			}
			return parent::validate( $posted_value );
		}
	}
}
