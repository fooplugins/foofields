<?php

namespace FooPlugins\FooFields\Admin\Metaboxes;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Metaboxes\FieldRenderer' ) ) {

	class FieldRenderer {

		/**
		 * Renders all tabs for metabox fields
		 *
		 * @param array $field_group
		 * @param string $id
		 * @param array $state
		 */
		static function render_field_group( $field_group, $id, $state ) {

			$classes[] = 'foofields-container';
			$classes[] = 'foofields-tabs-vertical';

			//process the field_group based on the state and make any changes if needed
			self::process_field_group( $field_group, $state );

			?>
			<style>
				#<?php echo $id; ?> .inside {
					margin: 0;
					padding: 0;
				}
			</style>
			<div class="<?php echo implode( ' ', $classes ); ?>">
				<?php if ( isset( $field_group['tabs'] ) ) { ?>
					<ul class="foofields-tabs">
						<?php
						$tab_active = '';
						foreach ( $field_group['tabs'] as $tab ) {
							self::render_tab( $tab, $id, $tab_active );
							$tab_active = '';
						}
						?>
					</ul>
					<?php
					$tab_active = '';
					foreach ( $field_group['tabs'] as $tab ) {
						self::render_tab_content( $tab, $id, $tab_active, $state );
						$tab_active = '';
					}
					?>
				<?php } ?>
				<?php if ( isset( $field_group['fields'] ) ) {
					self::render_tab_content( $field_group, $id, 'foofields-active', $state );
//					?><!--<div class="foofields-content foofields-active">--><?php
//					self::render_fields( $field_group['fields'], $id, $state );
//					?><!--</div>--><?php
				} ?>
			</div><?php
		}

		/**
		 * Process the fields based on the state
		 *
		 * @param $parent_array
		 * @param $state
		 * @param string $tab_id
		 */
		static function process_field_group( &$parent_array, $state, $tab_id = 'no_tab' ) {
			if ( isset( $parent_array['tabs'] ) ) {
				foreach ( $parent_array['tabs'] as &$tab ) {
					self::process_field_group( $tab, $state, $tab['id'] );
				}
			}

			if ( isset( $parent_array['fields'] ) ) {
				$errors = self::process_errors( $parent_array['fields'], $state, $tab_id );

				if ( $errors > 0 ) {
					$parent_array['errors'] = $errors;
				}
			}
		}

		/**
		 * Process the array of fields for errors
		 *
		 * @param $fields
		 * @param $state
		 * @param $tab_id
		 *
		 * @return int
		 */
		static function process_errors( &$fields, $state, $tab_id ) {
			//check if there are any errors
			if ( isset( $state['__errors'] ) ) {
				$errors = array();

				foreach ( $fields as $field ) {
					if ( array_key_exists( $field['id'], $state['__errors'] ) ) {
						$errors[] = esc_html( $state['__errors'][$field['id']]['message'] );
						$field['error'] = true;
					}
				}

				if ( count( $errors ) > 0 ) {
					$error_message = '<strong>' . esc_html( __( 'The following errors were found:' ) ) . '</strong><br />';
					$error_message .= implode( '<br />', $errors );

					$error_field = array(
							'id' => $tab_id . '_errors',
							'type' => 'error',
							'desc' => $error_message
					);

					array_unshift($fields, $error_field );

					return count( $errors );
				}
			}
			return 0;
		}

		/**
		 * Renders a tab
		 *
		 * @param $tab
		 * @param $container_id
		 * @param $tab_active
		 * @param string $tab_class
		 */
		static function render_tab( $tab, $container_id, $tab_active, $tab_class = 'foofields-tab', $anchor_class = 'foofields-tab-link' ) {
			$tab_type = isset( $tab['type'] ) ? $tab['type'] : 'normal';
			$taxonomy = '';
			if ( $tab_type === 'taxonomy' && isset( $tab['taxonomy'] ) ) {
				$taxonomy = ' data-taxonomy="';
				$taxonomy .= is_taxonomy_hierarchical( $tab['taxonomy'] ) ? 'taxonomy-' : '';
				$taxonomy .= $tab['taxonomy'];
				$taxonomy .= '"';
			}

			$tab_id = $tab['id'];

			if ( !isset( $tab['fields'] ) && isset( $tab['tabs'] ) ) {
				//set the tab_id to be the first child tab
				$tab_id = $tab['tabs'][0]['id'];
			}
			?>
			<li class="<?php echo $tab_class; ?> <?php echo $tab_active; ?>" <?php echo $taxonomy ?>>
				<a class="<?php echo $anchor_class; ?>" href="#<?php echo $container_id . '-' . $tab_id; ?>">
					<?php if ( isset( $tab['icon'] ) ) { ?>
					<span class="foofields-tab-icon dashicons <?php echo $tab['icon']; ?>"></span>
					<?php } ?>
					<span class="foofields-tab-text"><?php echo $tab['label']; ?></span>
					<?php
					if ( isset( $tab['errors'] ) ) {
						self::render_html_tag( 'span', array(
								'class' => 'foofields-tab-error',
								'title' => sprintf( _n( 'There is an error. Click to see more info.', 'There are %s errors. Click to see more info.', $tab['errors'] ), $tab['errors'] )
						), $tab['errors'] );
					}
					?>
				</a>
				<?php
				if ( isset( $tab['tabs'] ) ) {
					echo '<ul class="foofields-tab-menu">';
					foreach ( $tab['tabs'] as $child_tab ) {
						self::render_tab( $child_tab, $container_id, $tab_active, 'foofields-tab-menu-item', 'foofields-tab-menu-link' );
					}
					echo '</ul>';
				}
				?>
			</li>
			<?php

		}

		/**
		 * Renders the tab content
		 *
		 * @param $tab
		 * @param $container_id
		 * @param $tab_active
		 * @param $state
		 */
		static function render_tab_content( $tab, $container_id, $tab_active, $state ) {
			$featuredImage = '';
			if ( isset( $tab['featuredImage'] ) ) {
				$featuredImage = ' data-feature-image="true"';
				?>
				<style>
					#postimagediv {
						display: block !important;
					}

					#adv-settings label[for="postimagediv-hide"] {
						display: none !important;
					}
				</style>
			<?php } ?>

			<div class="foofields-content <?php echo $tab_active; ?>" id="<?php echo $container_id . '-' . $tab['id']; ?>" <?php echo $featuredImage ?>>
				<?php if ( isset( $tab['taxonomy'] ) ) {
					$panel = is_taxonomy_hierarchical( $tab['taxonomy'] ) ? $tab['taxonomy'] . 'div' : 'tagsdiv-' . $tab['taxonomy'];
					?>
					<style>
						/* Hide taxonomy boxes in sidebar and screen options show/hide checkbox labels */
						#<?php echo $panel; ?>,
						#adv-settings label[for="<?php echo $panel ?>-hide"] {
							display: none !important;
						}

						#taxonomy-<?php echo esc_html( $tab['taxonomy'] ); ?> .category-tabs {
							display: none !important;
						}

						#taxonomy-<?php echo esc_html( $tab['taxonomy'] ); ?> .tabs-panel {
							border: none !important;
							padding: 0;
						}
					</style>
				<?php } ?>

				<?php
				if ( isset( $tab['fields'] ) ) {
					self::render_fields( $tab['fields'], $container_id, $state );
				}
				?>
			</div>
			<?php
			if ( isset( $tab['tabs'] ) ) {
				foreach ( $tab['tabs'] as $tab ) {
					self::render_tab_content( $tab, $container_id, '', $state );
				}
			}
		}

		/**
		 * Renders a group of metabox fields
		 *
		 * @param array $fields
		 * @param string $id
		 * @param array $state
		 */
		static function render_fields( $fields, $id, $state ) {
			foreach ( $fields as $field ) {
				$field['input_id']				= "foofields_{$id}_{$field['id']}";
				$field['input_name']		 	= "{$id}[{$field['id']}]";
				$field_type                     = isset( $field['type'] ) ? $field['type'] : 'unknown';
				$field_layout                   = isset( $field['layout'] ) ? $field['layout'] : 'block';
				$field_classes                  = array();
				$field_classes[]                = 'foofields-field';
				$field_classes[]                = "foofields-type-{$field_type}";
				$field_classes[]                = "foofields-id-{$field['id']}";
				$field_classes[]				= "foofields-layout-{$field_layout}";
				if ( isset( $field['class'] ) ) {
					$field_classes[] = $field['class'];
				}
				if ( isset( $field['error'] ) && $field['error'] ) {
					$field_classes[] = 'foofields-error';
				}
				$field_row_data_html = '';
				if ( isset( $field['row_data'] ) ) {
					$field_row_data = array_map( 'esc_attr', $field['row_data'] );
					foreach ( $field_row_data as $field_row_data_name => $field_row_data_value ) {
						$field_row_data_html .= " $field_row_data_name=" . '"' . $field_row_data_value . '"';
					}
				}
				//get the value of the field from the state
				if ( is_array( $state ) && array_key_exists( $field['id'], $state ) ) {
					$field['value'] = $state[ $field['id'] ];
				}

				//check for any special non-editable field types
				if ( 'help' === $field_type ) {
					$field['type']   = 'html';
					$field_classes[] = 'foofields-icon foofields-icon-help';
					$field['desc']   = '<p>' . esc_html( $field['desc'] ) . '</p>';
				} else if ( 'error' === $field_type ) {
					$field['type'] = 'html';
					$field_classes[] = 'foofields-icon foofields-icon-error';
					$field['desc']   = '<p>' . esc_html( $field['desc'] ) . '</p>';
				} else if ( 'heading' === $field_type ) {
					$field['type'] = 'html';
					$field['desc'] = '<h3>' . esc_html( $field['desc'] ) . '</h3>';
				}
				?>
				<div class="<?php echo implode( ' ', $field_classes ); ?>"<?php echo $field_row_data_html; ?>>
					<?php if ( isset( $field['label'] ) ) { ?>
						<div class="foofields-label">
							<?php if ( isset( $field['required'] ) && $field['required'] ) {
								$field['label'] .= ' *';
							}?>
							<label for="foofields_<?php echo $id . '_' . $field['id']; ?>"><?php echo esc_html( $field['label'] ); ?></label>
							<?php if ( ! empty( $field['tooltip'] ) ) { ?>
								<span data-balloon-length="large" data-balloon-pos="right"
									  data-balloon="<?php echo esc_attr( $field['desc'] ); ?>">
									<i class="dashicons dashicons-editor-help"></i>
								</span>
							<?php } ?>
						</div>
					<?php }
						self::render_field( $field );
				 	?>
				</div>
			<?php }
		}

		/**
		 * Renders a single metabox field
		 *
		 * @param array $field
		 * @param array $field_attributes
		 */
		static function render_field( $field, $field_attributes = array() ) {
			$type = sanitize_title( isset( $field['type'] ) ? $field['type'] : 'text' );

			$attributes = array(
				'id'   => $field['input_id'],
				'name' => $field['input_name']
			);

			//set a default value if nothing is set
			if ( ! isset( $field['value'] ) ) {
				$field['value'] = '';
			}

			//merge the attributes with any that are passed in
			$attributes = wp_parse_args( $field_attributes, $attributes );

			echo '<div class="foofields-field-input foofields-field-input-' . esc_attr( $type ) . '">';

			switch ( $type ) {

				case 'html':
					if ( isset( $field['desc'] ) ) {
						echo $field['desc'];
						$field['desc'] = '';
					} else if ( isset( $field['html'] ) ) {
						echo $field['html'];
					}
					break;

				case 'select':
					self::render_html_tag( 'select', $attributes, null, false );
					foreach ( $field['choices'] as $value => $label ) {
						$option_attributes = array(
							'value' => $value
						);
						if ( $field['value'] == $value ) {
							$option_attributes['selected'] = 'selected';
						}
						self::render_html_tag( 'option', $option_attributes, $label );
					}
					echo '</select>';

					break;

				case 'textarea':
					if ( isset( $field['placeholder'] ) ) {
						$attributes['placeholder'] = $field['placeholder'];
					}
					self::render_html_tag( 'textarea', $attributes, esc_textarea( $field['value'] ), true, false );

					break;

				case 'text':
					if ( isset( $field['placeholder'] ) ) {
						$attributes['placeholder'] = $field['placeholder'];
					}
					$attributes['type'] = 'text';
					$attributes['value'] = $field['value'];
					self::render_html_tag( 'input', $attributes );

					break;

				case 'number':
					if ( isset( $field['placeholder'] ) ) {
						$attributes['placeholder'] = $field['placeholder'];
					}
					$attributes['min'] = isset( $min ) ? $min : 0;
					$attributes['step'] = isset( $step ) ? $step : 1;
					$attributes['type'] = 'number';
					$attributes['value'] = $field['value'];
					self::render_html_tag( 'input', $attributes );

					break;

				case 'date':
					if ( isset( $field['placeholder'] ) ) {
						$attributes['placeholder'] = $field['placeholder'];
					}
					$attributes['type'] = 'date';
					$attributes['min'] = isset( $field['min'] ) ? $field['min'] : '1900-01-01';
					$attributes['max'] = isset( $field['max'] ) ? $field['max'] : '';
					$attributes['value'] = $field['value'];
					self::render_html_tag( 'input', $attributes );

					break;

				case 'color':
					$attributes['type'] = 'color';
					$attributes['value'] = $field['value'];
					self::render_html_tag( 'input', $attributes );

					break;

				case 'colorpicker':
					$attributes['type'] = 'text';
					$attributes['value'] = $field['value'];
					$attributes[] = 'data-wp-color-picker';
					self::render_html_tag( 'input', $attributes );

					break;

				case 'radio':
				case 'radiolist':
					$attributes['type'] = 'radio';
					self::render_input_list( $field, $attributes, false );

					break;

				case 'checkbox':
					if ( 'on' === $field['value'] ) {
						$attributes['checked'] = 'checked';
					}
					$attributes['value'] = 'on';
					$attributes['type'] = 'checkbox';
					self::render_html_tag( 'input', $attributes );
					break;


				case 'checkboxlist':
					$attributes['type'] = 'checkbox';
					self::render_input_list( $field, $attributes );
					break;

				case 'htmllist':
					$type = isset( $field['list-type'] ) ? $field['list-type'] : 'radio';
					$attributes['type'] = $type;
					$attributes['style'] = 'display:none';
					self::render_input_list( $field, $attributes, $type !== 'radio' );
					break;

				case 'suggest':
					$action = isset( $field['action'] ) ? $field['action'] : 'foometafield_suggest';
					$query  = build_query( array(
						'action'     => $action,
						'nonce'      => wp_create_nonce( $action ),
						'query_type' => isset( $field['query_type'] ) ? $field['query_type'] : 'post',
						'query_data' => isset( $field['query_data'] ) ? $field['query_data'] : 'page'
					) );

					$attributes = wp_parse_args( array(
							'type'                   => 'text',
							'id'                     => $field['input_id'],
							'name'                   => $field['input_name'],
							'value'                  => $field['value'],
							'placeholder'            => isset( $field['placeholder'] ) ? $field['placeholder'] : '',
							'data-suggest',
							'data-suggest-query'     => $query,
							'data-suggest-multiple'  => isset( $field['multiple'] ) ? $field['multiple'] : 'false',
							'data-suggest-separator' => isset( $field['separator'] ) ? $field['separator'] : ','
					), $attributes );

					self::render_html_tag( 'input', $attributes );

					break;

				case 'selectize':
					self::render_selectize_field( $field );

					break;

				case 'select2':
					$action = isset( $field['action'] ) ? $field['action'] : 'foometafield_select2';
					$inner  = '';

					self::render_html_tag( 'select', array(
						'id'    	              => $field['input_id'],
						'name'	                  => $field['input_name'],
						'value'                   => $field['value'],
						'placeholder'             => isset( $field['placeholder'] ) ? $field['placeholder'] : '',
						'data-select2-instance',
						'data-select2-action'     => $action,
						'data-select2-nonce'      => wp_create_nonce( $action ),
						'data-select2-query-type' => isset( $field['query_type'] ) ? $field['query_type'] : 'post',
						'data-select2-query-data' => isset( $field['query_data'] ) ? $field['query_data'] : 'page',
					), $inner );

					break;

				case 'repeater':
					self::render_repeater_field( $field );
					break;

				case 'readonly':
					$attributes['type'] = 'hidden';

					self::render_html_tag( 'input', $attributes );

					$inner = $field['value'];
					if ( isset( $field['display_function'] ) ) {
						$inner = call_user_func( $field['display_function'], $inner );
					}

					self::render_html_tag( 'span', array(), $inner );
					break;

				case 'ajaxbutton':

					if ( !isset( $field['action'] ) ) {
						self::render_html_tag( 'p', $attributes, __('Field Error : Missing Action for Ajaxbutton : ' ) . $field['id'] );
					} else {

						$button_text = isset( $field['button'] ) ? $field['button'] : __( 'Run' );

						$attributes = array(
								'id'                    => $field['input_id'],
								'class'                 => isset( $field['class'] ) ? $field['class'] : 'button button-primary button-large',
								'href'                  => '#' . $field['input_id'],
								'data-ajaxbutton',
								'data-ajaxbutton-nonce' => wp_create_nonce( $field['action'] )
						);

						if ( isset( $field['value'] ) ) {
							$attributes['data-value'] = $field['value'];
						}

						self::render_html_tag( 'a', $attributes, $button_text );

						self::render_html_tag( 'span', array( 'class' => 'spinner' ) );

						self::render_html_tag( 'span', array( 'class' => 'response-message' ) );
					}

					break;

				default:
					//the field type is not natively supported
					if ( isset( $field['function'] ) ) {
						call_user_func( $field['function'], $field );
					}
					break;
			}

			if ( ! empty( $field['desc'] ) ) {
				self::render_html_tag( 'span', array(
						'class' => 'foofields-field-description'
				), $field['desc'] );
			}

			echo '</div>';
		}

		/**
		 * Render an input list field
		 *
		 * @param $field
		 * @param array $field_attributes
		 * @param bool $use_unique_names
		 */
		static function render_input_list( $field, $field_attributes = array(), $use_unique_names = true ) {
			$i      = 0;
			$spacer = isset( $field['spacer'] ) ? $field['spacer'] : '<div class="foofields-spacer"></div>';
			foreach ( $field['choices'] as $value => $item ) {
				$label_attributes = array(
					'for' => $field['input_id'] . $i
				);
				$encode = true;
				if ( is_array( $item ) ) {
					$label = $item['label'];
					if ( isset( $item['tooltip'] ) ) {
						$label_attributes['data-balloon'] = $item['tooltip'];
						$label_attributes['data-balloon-length'] = isset( $item['tooltip-length'] ) ? $item['tooltip-length'] : 'small';
						$label_attributes['data-balloon-pos'] = isset( $item['tooltip-position'] ) ? $item['tooltip-position'] : 'down';
					}
					if ( isset( $item['html'] ) ) {
						$label = wp_kses_post( $item['html'] );
						$encode = false;
					}
				} else {
					$label = $item;
				}
				$input_attributes = array(
					'name' => $field['input_name'],
					'id' => $field['input_id'] . $i,
					'value' => $value,
					'tabindex' => $i
				);
				if ( $use_unique_names ) {
					$input_attributes['name'] = $field['input_name'] . '[' . $value . ']';
					if ( isset( $field['value'] ) && isset( $field['value'][$value] ) ) {
						$input_attributes['checked'] = 'checked';
					}
				} else {
					if ( $field['value'] === $value ) {
						$input_attributes['checked'] = 'checked';
					}
				}
				$input_attributes = wp_parse_args( $input_attributes, $field_attributes );

				self::render_html_tag( 'input', $input_attributes );
				self::render_html_tag( 'label', $label_attributes, $label, true, $encode );
				if ( $i < count( $field['choices'] ) - 1 ) {
					echo $spacer;
				}
				$i ++;
			}
		}


		/**
		 * Render the HTML needed for a selectize control
		 *
		 * @param $field
		 */
		static function render_selectize_field( $field ) {
			$action = isset( $field['action'] ) ? $field['action'] : 'foometafield_selectize';
			$query  = build_query( array(
					'action'     => $action,
					'nonce'      => wp_create_nonce( $action ),
					'query_type' => isset( $field['query_type'] ) ? $field['query_type'] : 'post',
					'query_data' => isset( $field['query_data'] ) ? $field['query_data'] : 'page'
			) );

			$value = ( isset( $field['value'] ) && is_array( $field['value'] ) ) ? $field['value'] : array(
					'value'   => '',
					'display' => ''
			);

			self::render_html_tag( 'input', array(
					'type'  => 'hidden',
					'id'    => $field['input_id'] . '_display',
					'name'  => $field['input_name'] . '[display]',
					'value' => $value['display']
			) );

			$inner = '';

			if ( isset( $value['value'] ) ) {
				$inner = '<option value="' . esc_attr( $value['value'] ) . '" selected="selected">' . esc_html( $value['display'] ) . '</option>';
			}

			self::render_html_tag( 'select', array(
					'id'                     => $field['input_id'],
					'name'                   => $field['input_name'] . '[value]',
					'value'                  => $value['value'],
					'placeholder'            => $field['placeholder'],
					'data-selectize-instance',
					'data-selectize-query'   => $query,
					'data-selectize-display' => $field['input_id'] . '_display'
			), $inner, true, false );
		}
		/**
		 * Render a nested repeater field
		 *
		 * @param $field
		 */
		static function render_repeater_field( $field ) {
			$has_rows = is_array( $field['value'] ) && count( $field['value'] ) > 0;

			self::render_html_tag( 'div', array(
				'class' => 'foofields-repeater' . ( $has_rows ? '' : ' foofields-repeater-empty' )
			), null, false );

			self::render_html_tag( 'p', array(
				'class' => 'foofields-repeater-no-data-message'
			), isset( $field['no-data-message'] ) ? $field['no-data-message'] : __( 'Nothing found' ) );

			self::render_html_tag('table', array(
				'class' => 'wp-list-table widefat striped' . ( isset( $field['table-class'] ) ? ' ' . $field['table-class'] : '' )
			), null, false );

			//render the table column headers
			echo '<thead><tr>';
			foreach ( $field['fields'] as $child_field ) {
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
							self::render_html_tag( 'a', array(
								'class' => 'foofields-repeater-delete',
								'data-confirm' => isset( $child_field['delete-confirmation-message'] ) ? $child_field['delete-confirmation-message'] : __( 'Are you sure?' ),
								'href' => '#delete',
								'title' => __('Delete Row')
							), null, false );
							self::render_html_tag('span', array( 'class' => 'dashicons dashicons-trash' ) );
							echo '</a>';
						} else {
							$child_field['input_id']   = $field['input_id'] . '_' . $child_field['id'] . '_' . $row_index;
							$child_field['input_name'] = $field['input_name'] . '[' . $child_field['id'] . '][]';
							self::render_field( $child_field );
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
				$child_field['input_id'] = $field['input_id'] . '_' . $child_field['id'];
				$child_field['input_name'] = $field['input_name'] . '[' . $child_field['id'] . '][]';
				self::render_field( $child_field, array( 'disabled' => 'disabled' ) );
				echo '</td>';
			}

			echo '</tr></tfoot>';
			echo '</table>';

			self::render_html_tag( 'button', array(
					'class' => 'button foofields-repeater-add'
			), isset( $field['button'] ) ? $field['button'] : __('Add') );

			echo '</div>';
		}

		/**
		 * Safely renders an HTML tag
		 *
		 * @param $tag
		 * @param $attributes
		 * @param string $inner
		 * @param bool $close
		 * @param bool $escape_inner
		 */
		static function render_html_tag( $tag, $attributes, $inner = null, $close = true, $escape_inner = true ) {
			echo '<' . $tag . ' ';
			//make sure all attributes are escaped
			$attributes     = array_map( 'esc_attr', $attributes );
			$attributePairs = [];
			foreach ( $attributes as $key => $val ) {
				if ( is_int( $key ) ) {
					$attributePairs[] = esc_attr( $val );
				} else {
					$val              = esc_attr( $val );
					$attributePairs[] = "{$key}=\"{$val}\"";
				}
			}
			echo implode( ' ', $attributePairs );
			if ( 'span' === $tag && !isset( $inner ) ) {
				//make sure that for spans with no content, we still close them correctly
				$inner = '';
			}
			if ( isset( $inner ) ) {
				echo '>';
				if ( $escape_inner ) {
					echo esc_html( $inner );
				} else {
					echo $inner;
				}
				if ( $close ) {
					echo '</' . $tag . '>';
				}
			} else {
				if ( $close ) {
					echo ' />';
				} else {
					echo '>';
				}
			}
		}
	}
}
