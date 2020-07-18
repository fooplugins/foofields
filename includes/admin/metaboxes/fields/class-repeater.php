<?php

namespace FooPlugins\FooFields\Admin\Metaboxes\Fields;

use FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer;
use WP_User;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\Fields\Repeater' ) ) {

	class Repeater extends Field {

		function __construct( $metabox_field_group, $field_type ) {
			parent::__construct( $metabox_field_group, $field_type );

			$hook = $this->metabox_field_group->metabox_hook_prefix();

			add_filter( $hook . 'GetPostedDataByType\repeater', array( $this, 'get_posted_data_for_repeater' ), 10, 1 );
		}

		/**
		 * Render the repeater field
		 * @param $field
		 * @param $attributes
		 *
		 * @return mixed|void
		 */
		function render( $field, $attributes ) {
			$has_rows = is_array( $field['value'] ) && count( $field['value'] ) > 0;

			FieldRenderer::render_html_tag( 'div', array(
				'class' => 'foofields-repeater' . ( $has_rows ? '' : ' foofields-repeater-empty' )
			), null, false );

			FieldRenderer::render_html_tag( 'p', array(
				'class' => 'foofields-repeater-no-data-message'
			), isset( $field['no-data-message'] ) ? $field['no-data-message'] : __( 'Nothing found' ) );

			FieldRenderer::render_html_tag('table', array(
				'class' => 'wp-list-table widefat striped' . ( isset( $field['table-class'] ) ? ' ' . $field['table-class'] : '' )
			), null, false );

			//render the table column headers
			echo '<thead><tr>';
			foreach ( $field['fields'] as $child_field ) {
				$column_attributes = array();
				if ( isset( $child_field['width'] ) ) {
					$column_attributes['width'] = $child_field['width'];
				}
				FieldRenderer::render_html_tag( 'th', $column_attributes, isset( $child_field['label'] ) ? $child_field['label'] : '' );
			}
			echo '</tr></thead>';

			//render the repeater rows
			echo '<tbody>';
			if ( $has_rows ) {
				$row_index = 0;
				foreach( $field['value'] as $row ) {
					$row_index++;
					echo '<tr>';
					foreach ( $field['fields'] as $child_field ) {
						if ( array_key_exists( $child_field['id'], $row ) ) {
							$child_field['value'] = $row[ $child_field['id'] ];
						}
						if ( 'index' === $child_field['type'] ) {
							$child_field['type'] = 'html';
							$child_field['html'] = $row_index;
						}
						echo '<td>';
						if ( 'manage' === $child_field['type'] ) {
							$this->render_delete_button( $child_field );
						} else {
							$child_field['input_id']   = $field['input_id'] . '_' . $child_field['id'] . '_' . $row_index;
							$child_field['input_name'] = $field['input_name'] . '[' . $child_field['id'] . '][]';
							FieldRenderer::render_field( $child_field );
						}
						echo '</td>';
					}
					echo '</tr>';
				}
			}
			echo '</tbody>';

			//render the repeater footer for adding
			echo '<tfoot><tr>';

			foreach ( $field['fields'] as $child_field ) {
				echo '<td>';
				if ( 'manage' === $child_field['type'] ) {
					$this->render_delete_button( $child_field );
				} else {
					$child_field['input_id']   = $field['input_id'] . '_' . $child_field['id'];
					$child_field['input_name'] = $field['input_name'] . '[' . $child_field['id'] . '][]';
					FieldRenderer::render_field( $child_field, array( 'disabled' => 'disabled' ) );
				}
				echo '</td>';
			}

			echo '</tr></tfoot>';
			echo '</table>';

			FieldRenderer::render_html_tag( 'button', array(
				'class' => 'button foofields-repeater-add'
			), isset( $field['button'] ) ? $field['button'] : __('Add') );

			echo '</div>';
		}

		function render_delete_button( $field ) {
			FieldRenderer::render_html_tag( 'a', array(
				'class' => 'foofields-repeater-delete',
				'data-confirm' => isset( $field['delete-confirmation-message'] ) ? $field['delete-confirmation-message'] : __( 'Are you sure?' ),
				'href' => '#delete',
				'title' => __('Delete Row')
			), null, false );
			FieldRenderer::render_html_tag('span', array( 'class' => 'dashicons dashicons-trash' ) );
			echo '</a>';
		}

		/**
		 * Gets the data posted for the repeater
		 *
		 * @param $sanitized_data
		 */
		function get_posted_data_for_repeater( $sanitized_data ) {
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
