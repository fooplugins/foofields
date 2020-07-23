<?php

namespace FooPlugins\FooFields\Admin\FooFields\Fields;

use FooPlugins\FooFields\Admin\FooFields\Container;
use WP_User;

if ( ! class_exists( __NAMESPACE__ . '\Repeater' ) ) {

	class Repeater extends Field {

		protected $add_button_text;
		protected $no_data_message;
		protected $table_clsss;
		protected $fields = false;

		/**
		 * Field constructor.
		 *
		 * @param $container Container
		 * @param $type string
		 * @param $field_config array
		 */
		function __construct( $container, $type, $field_config ) {
			parent::__construct( $container, $type, $field_config );

			$this->add_button_text = isset( $field_config['add_button_text'] ) ? $field_config['add_button_text'] : __( 'Nothing found', $container->text_domain );
			$this->no_data_message = isset( $field_config['no_data_message'] ) ? $field_config['no_data_message'] : __( 'Nothing found', $container->text_domain );
			$this->table_clsss = isset( $field_config['table_clsss'] ) ? $field_config['table_clsss'] : '';
			if ( isset( $field_config['fields'] ) ) {
				$this->fields = $field_config['fields'];
			}
		}

		/**
		 * Render the repeater field
		 *
		 * @return mixed|void
		 */
		function render_input( $override_attributes = false ) {
			if ( false === $this->fields ) {
				echo __( 'ERROR No fields for repeater!', $this->container->text_domain );
				return;
			}

			$value = $this->value();

			$has_rows = is_array( $value ) && count( $value ) > 0;

			self::render_html_tag( 'div', array(
				'class' => 'foofields-repeater' . ( $has_rows ? '' : ' foofields-repeater-empty' )
			), null, false );

			self::render_html_tag( 'p', array(
				'class' => 'foofields-repeater-no-data-message'
			), $this->no_data_message );

			self::render_html_tag('table', array(
				'class' => 'wp-list-table widefat striped ' . $this->table_clsss
			), null, false );

			//render the table column headers
			echo '<thead><tr>';
			foreach ( $this->fields as $child_field ) {
				$column_attributes = array();
				if ( isset( $child_field['width'] ) ) {
					$column_attributes['width'] = $child_field['width'];
				}
				self::render_html_tag( 'th', $column_attributes, isset( $child_field['label'] ) ? $child_field['label'] : '' );
			}
			echo '</tr></thead>';

			//render the repeater rows
			echo '<tbody>';
			if ( $has_rows ) {
				$row_index = 0;
				foreach( $value as $row ) {
					$row_index++;
					echo '<tr>';
					foreach ( $this->fields as $child_field ) {
						if ( array_key_exists( $child_field['id'], $row ) ) {
							$child_field['value'] = $row[ $child_field['id'] ];
						}
						if ( 'index' === $child_field['type'] ) {
							$child_field['type'] = 'html';
							$child_field['html'] = $row_index;
						}
						echo '<td>';
						$child_field['id'] = $this->unique_id . '_' . $child_field['id'] . '_' . $row_index;
						$field_object = $this->container->create_field_instance( $child_field['type'], $child_field );
						$field_object->render_input( array(
								'name' => $this->name . '[' . $child_field['id'] . '][]'
						) );
						echo '</td>';
					}
					echo '</tr>';
				}
			}
			echo '</tbody>';

			//render the repeater footer for adding
			echo '<tfoot><tr>';

			foreach ( $this->fields as $child_field ) {
				echo '<td>';
				$child_field['id'] = $this->unique_id . '_' . $child_field['id'];
				$field_object = $this->container->create_field_instance( $child_field['type'], $child_field );
				$field_object->render_input( array(
					'name' => $this->name . '[' . $child_field['id'] . '][]',
					'disabled' => 'disabled' )
				);
				echo '</td>';
			}

			echo '</tr></tfoot>';
			echo '</table>';

			self::render_html_tag( 'button', array(
				'class' => 'button foofields-repeater-add'
			), $this->add_button_text );

			echo '</div>';
		}

		/**
		 * Gets the data posted for the repeater
		 *
		 * @param $sanitized_data
		 *
		 * @return array
		 */
		function process_posted_value( $sanitized_data ) {
			$results = array();
			foreach ( array_keys( $sanitized_data ) as $fieldKey ) {
				foreach ( $sanitized_data[$fieldKey] as $key => $value ) {
					$results[$key][$fieldKey] = $value;
				}
			}

			$current_username = 'unknown';
			$current_user = wp_get_current_user();
			if ( $current_user instanceof WP_User ) {
				$current_username = $current_user->user_login;
			}

			// stored some extra info for each row
			// check if each row has an __id field,
			//   if not then add one, so we can figure out which row to delete later.
			//   Also add a __created_by field and set to currently logged on user.
			//   And also a __created field which is the UTC timestamp of when the field was created
			// if the __id field exists, then we doing an update.
			//   update the __updated_by field and __updated timestamp fields
			foreach ( $results as &$result ) {
				if ( !isset($result['__id'] ) ) {
					$result['__id'] = wp_generate_password( 10, false, false );
					$result['__created'] = time();
					$result['__created_by'] = $current_username;
				} else {
					$result['__updated'] = time();
					$result['__updated_by'] = $current_username;
				}
			}

			return $results;
		}
	}
}
