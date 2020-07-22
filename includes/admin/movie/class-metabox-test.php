<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest' ) ) {

	class MetaboxTest extends Metabox {

		function __construct() {
			//filter to allow field group to be overridden
			$field_group = apply_filters( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest\FieldGroup',
				array(
					'tabs' => array(
						array(
							'id'     => 'simplefields',
							'label'  => __( 'Simple Fields', 'foofields' ),
							'icon'   => 'dashicons-editor-kitchensink',
							'fields' => array(
								array(
									'id'       => 'simpleheading',
									'label'    => __( 'Simple Fields', 'foofields' ),
									'desc'     => __( 'This tab shows all the simple fields', 'foofields' ),
									'type'     => 'heading',
									'data'     => array(
										'show-when' => array (
											'field' => 'text',
											'value' => '',
											'operator' => '!=='
										),
										'another-option' => '1234',
										'something' => 'abcd'
									)
									//data-show-when="{\"field\": \"text\", \"value\": \"\", \"operator\": \"!==\"}" data-another-option="1234" data-something="abcd"
								),
								array(
									'id'       => 'help',
									'text'     => __( 'This is a help field.', 'foofields' ),
									'type'     => 'help',
								),
								array(
									'id'       => 'error',
									'text'     => __( 'This is an error field.', 'foofields' ),
									'type'     => 'error',
								),
								array(
									'id'       => 'icon',
									'text'     => __( 'Icon field. Set the icon to the class name of the dashicon you want. Icon is set to "dashicons-wordpress" for this field.', 'foofields' ),
									'icon'     => 'dashicons-wordpress',
									'type'     => 'icon',
								),
								array(
									'id'       => 'icon2',
									'text'     => __( 'Icon is set to "dashicons-admin-site" for this field. Class set to "icon-green"', 'foofields' ),
									'icon'     => 'dashicons-admin-site',
									'class'    => 'icon-green',
									'type'     => 'icon',
								),
								array(
									'id'       => 'icon3',
									'text'     => __( 'Icon is set to "dashicons-format-image" for this field. Class set to "icon-red"', 'foofields' ),
									'icon'     => 'dashicons-format-image',
									'class'    => 'icon-red',
									'type'     => 'icon',
								),
								array(
									'id'       => 'icon4',
									'text'     => __( 'Icon is set to "dashicons-star-filled" for this field. Class set to "icon-yellow"', 'foofields' ),
									'icon'     => 'dashicons-star-filled',
									'class'    => 'icon-yellow',
									'type'     => 'icon',
								),
								array(
									'id'       => 'text',
									'label'    => __( 'Block Field', 'foofields' ),
									'desc'     => __( 'This field should have the label above the input', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => array(
										'text' => __('A tooltip to help the user'),
										'length' => 'small',
										'position' => 'top',
										'icon' => 'dashicons-star-filled'
									)
								),
								array(
									'id'       => 'text1',
									'label'    => __( 'Inline Field', 'foofields' ),
									'desc'     => __( 'This field should have the label next to the input', 'foofields' ),
									'layout'   => 'inline',
									'type'     => 'text',
								),
								array(
									'id'       => 'text2',
									'desc'     => __( 'This field will not have a label', 'foofields' ),
									'type'     => 'text',
								),
								array(
									'id'       => 'number',
									'label'    => __( 'Number Field', 'foofields' ),
									'desc'     => __( 'A test number field', 'foofields' ),
									'type'     => 'number',
								),
								array(
									'id'       => 'textarea',
									'label'    => __( 'Textarea Field', 'foofields' ),
									'desc'     => __( 'A test textarea field', 'foofields' ),
									'type'     => 'textarea',
								),
								array(
									'id'       => 'select',
									'label'    => __( 'Select Field', 'foofields' ),
									'desc'     => __( 'A test select field', 'foofields' ),
									'type'     => 'select',
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'checkbox',
									'label'    => __( 'Checkbox Field', 'foofields' ),
									'layout'   => 'inline',
									'type'     => 'checkbox',
								),
								array(
									'id'       => 'color',
									'label'    => __( 'Color Field', 'foofields' ),
									'desc'     => __( 'A test HTML5 color input field', 'foofields' ),
									'type'     => 'color',
								),
								array(
									'id'       => 'colorpicker',
									'label'    => __( 'Colorpicker Field', 'foofields' ),
									'desc'     => __( 'A test colorpicker field using the colorpicker built into WP', 'foofields' ),
									'type'     => 'colorpicker',
								),
							),
							'data'   => array(
								//tab data options
							)
						),
						array(
							'id'     => 'listfields',
							'label'  => __( 'List Fields', 'foofields' ),
							'icon'   => 'dashicons-list-view',
							'fields' => array(
								array(
									'id'       => 'radioinline',
									'label'    => __( 'Radio Fields Inline', 'foofields' ),
									'desc'     => __( 'Radio Fields Inline', 'foofields' ),
									'layout'   => 'inline',
									'stacked'  => false,
									'type'     => 'radiolist',
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'radioinlinestacked',
									'label'    => __( 'Radio Fields Inline Stacked', 'foofields' ),
									'desc'     => __( 'Radio Fields Inline', 'foofields' ),
									'layout'   => 'inline',
									'stacked'  => true,
									'type'     => 'radiolist',
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'checkboxlistinline',
									'label'    => __( 'Checkboxes Inline', 'foofields' ),
									'desc'     => __( 'A test checkboxlist field', 'foofields' ),
									'layout'   => 'inline',
									'type'     => 'checkboxlist',
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'radiostacked',
									'label'    => __( 'Radio Block Stacked', 'foofields' ),
									'desc'     => __( 'Radio Block Stacked', 'foofields' ),
									'type'     => 'radiolist',
									'stacked'  => true,
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'checkboxlist',
									'label'    => __( 'Checkboxlist stacked', 'foofields' ),
									'desc'     => __( 'A test checkboxlist field', 'foofields' ),
									'type'     => 'checkboxlist',
									'stacked'  => false,
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'htmllist',
									'label'    => __( 'HTML List (radio)', 'foofields' ),
									'desc'     => __( 'A test html list field', 'foofields' ),
									'type'     => 'htmllist',
									'spacer'   => '',
									'choices' => array(
										'option1' => array(
											'html' => '<img src="https://dummyimage.com/32x32/000/fff&text=1" />',
											'label' => __( 'Option 1', 'foofields' ),
											'tooltip' => __( 'A tooltip for Option 1', 'foofields' ),
										),
										'option2' => array(
											'html' => '<img src="https://dummyimage.com/32x32/000/fff&text=2" />',
											'label' => __( 'Option 2', 'foofields' ),
										)
									)
								),
								array(
									'id'       => 'htmllist2',
									'label'    => __( 'HTML List (checkbox)', 'foofields' ),
									'list-type'=> 'checkbox',
									'desc'     => __( 'A test html list field', 'foofields' ),
									'type'     => 'htmllist',
									'spacer'   => '',
									'choices' => array(
										'option1' => array(
											'html' => '<img src="https://dummyimage.com/32x32/000/fff&text=1" />',
											'label' => __( 'Option 1', 'foofields' ),
											'tooltip' => __( 'A tooltip for Option 1', 'foofields' ),
										),
										'option2' => array(
											'html' => '<img src="https://dummyimage.com/32x32/000/fff&text=2" />',
											'label' => __( 'Option 2', 'foofields' ),
										),
										'option3' => array(
											'html' => '<img src="https://dummyimage.com/32x32/000/fff&text=3" />',
											'label' => __( 'Option 3', 'foofields' ),
										)
									)
								),
							)
						),
						array(
							'id'     => 'advfields',
							'label'  => __( 'Advanced Fields', 'foofields' ),
							'icon'   => 'dashicons-list-view',
							'fields' => array(
								array(
									'id'       => 'suggest',
									'label'    => __( 'Suggest Field (autocomplete without a key)', 'foofields' ),
									'type'     => 'suggest',
									'default'  => '',
									'placeholder' => __( 'Start typing to search for movies', 'foofields' ),
									'query_type' => 'post',
									'query_data' => FOOFIELDS_CPT_MOVIE
								),
								array(
									'id'       => 'selectize',
									'label'    => __( 'Selectize Field (autocomplete with a key)', 'foofields' ),
									'type'     => 'selectize',
									'placeholder' => __( 'Start typing to search for actors', 'foofields' ),
									'query_type' => 'taxonomy',
									'query_data' => FOOFIELDS_CT_ACTOR
								),
								array(
									'id'       => 'selectize-multi',
									'label'    => __( 'Selectize Multi Select Field', 'foofields' ),
									'type'     => 'selectize-multi',
									'placeholder' => __( 'Choose from a pre-defined set of choices', 'foofields' ),
									'choices' => array(
										array( 'value' => 0, 'display' => __( 'option 1', 'foofields' ) ),
										array( 'value' => 1, 'display' => __( 'option 2', 'foofields' ) ),
										array( 'value' => 2, 'display' => __( 'option 3', 'foofields' ) ),
										array( 'value' => 3, 'display' => __( 'option 4', 'foofields' ) ),
										array( 'value' => 4, 'display' => __( 'option 5', 'foofields' ) ),
									),
									'create' => false
								),
								array(
									'id'       => 'selectize-multi-taxonomy',
									'label'    => __( 'Selectize Multi Select Field (Taxonomy)', 'foofields' ),
									'type'     => 'selectize-multi',
									'placeholder' => __( 'Choose from the actor taxonomy', 'foofields' ),
									//'close_after_select' => true,
									//'max_items' => 2,
									'binding' => array(
										'type' => 'taxonomy',
										'taxonomy' => FOOFIELDS_CT_ACTOR,
										'sync_with_post' => true
									)
								),
								array(
									'id'       => 'button1',
									'type'     => 'ajaxbutton',
									'callback' => array( $this, 'return_success' ),
									'button'   => __( 'Run Something - Return Success', 'foofields' ),
								),
								array(
									'id'       => 'button2',
									'type'     => 'ajaxbutton',
									'callback' => array( $this, 'return_error' ),
									'button'   => __( 'Run Something - Return Error', 'foofields' ),
								)

							)
						),
						array(
							'id'     => 'columns',
							'label'  => __( 'Columns', 'foofields' ),
							'icon'   => 'dashicons-editor-table',
							'class'  => 'foofields-cols-4',
							'fields' => array(
								array(
									'id'       => 'colheading',
									'label'     => __( 'Tab class set to "foofields-cols-4"', 'foofields' ),
									'type'     => 'heading',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => 'colhelp',
									'text'     => __( 'This tab shows how fields can be arranged into columns. The tab can have a "class" or foofields-cols-2, foofields-cols-3 or foofields-cols-4. This particular tab has class of "foofields-cols-4". Fields then get assigned a class of "foofields-colspan-N" where N is the number of columns to span, eg. "foofields-colspan-2".', 'foofields' ),
									'type'     => 'help',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => 'colheading1',
									'label'     => __( '1 Column', 'foofields' ),
									'type'     => 'heading',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => '12colcell1',
									'label'    => __( 'Firstname', 'foofields' ),
									'type'     => 'text',
									'class'    => 'foofields-full-width',
									'tooltip'  => __( 'This field has a class of "foofields-full-width"', 'foofields' ),
								),
								array(
									'id'       => 'colheading2',
									'label'     => __( '2 Columns', 'foofields' ),
									'type'     => 'heading',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => '2colcell1',
									'label'    => __( 'Firstname', 'foofields' ),
									'type'     => 'text',
									'class'    => 'foofields-colspan-2',
									'tooltip'  => __( 'This field has a class of "foofields-colspan-2"', 'foofields' ),
								),
								array(
									'id'       => '2colcell2',
									'label'    => __( 'Last Name', 'foofields' ),
									'type'     => 'text',
									'class'    => 'foofields-colspan-2',
									'tooltip'  => __( 'This field has a class of "foofields-colspan-2"', 'foofields' ),
								),
								array(
									'id'       => 'colheading3',
									'label'     => __( '3 Columns', 'foofields' ),
									'type'     => 'heading',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => '3colcell1',
									'label'    => __( 'Firstname', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
								array(
									'id'       => '3colcell2',
									'label'    => __( 'Middle', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
								array(
									'id'       => '3colcell3',
									'label'    => __( 'Last Name', 'foofields' ),
									'type'     => 'text',
									'class'    => 'foofields-colspan-2',
									'tooltip'  => __( 'This field has a class of "foofields-colspan-2"', 'foofields' ),
								),
								array(
									'id'       => 'colheading4',
									'label'     => __( '4 Columns', 'foofields' ),
									'type'     => 'heading',
									'class'    => 'foofields-full-width'
								),
								array(
									'id'       => '4colcell1',
									'label'    => __( 'Line 1', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
								array(
									'id'       => '4colcell2',
									'label'    => __( 'Line 2', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
								array(
									'id'       => '4colcell2',
									'label'    => __( 'Line 3', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
								array(
									'id'       => '4colcell3',
									'label'    => __( 'Line 4', 'foofields' ),
									'type'     => 'text',
									'tooltip'  => __( 'This field has no class set', 'foofields' ),
								),
							)
						),
						array(
							'id'     => 'nested',
							'label'  => __( 'Parent Tab', 'foofields' ),
							'icon'   => 'dashicons-editor-table',
							'tabs' => array(
								array(
									'id'     => 'child1',
									'label'  => __( 'Child 1', 'foofields' ),
									'fields' => array(
										array(
											'id'       => 'child1help',
											'label'    => __( 'Help Field', 'foofields' ),
											'desc'     => __( 'This tab shows an example repeater field for capturing notes. This is powerful when you want the ability to capture an unknown amount of data.', 'foofields' ),
											'type'     => 'help',
										),
										array(
											'id'       => 'repeater',
											//'label'    => __( 'Repeater Field', 'foofields' ),
											'desc'     => __( 'A repeater field', 'foofields' ),
											'type'     => 'repeater',
											'button'   => __( 'Add Note', 'foofields' ),
											'fields'   => array(
												array(
													'id'       => 'text',
													'label'    => __( 'Text Field', 'foofields' ),
													'desc'     => __( 'A test text field', 'foofields' ),
													'type'     => 'text',
												),
												array(
													'id'       => 'number',
													'label'    => __( 'Number Field', 'foofields' ),
													'desc'     => __( 'A test number field', 'foofields' ),
													'type'     => 'number',
												),
												array(
													'id'       => 'textarea',
													'label'    => __( 'Textarea Field', 'foofields' ),
													'desc'     => __( 'A test textarea field', 'foofields' ),
													'type'     => 'textarea',
												),
												array(
													'id'       => 'checkbox',
													'label'    => __( 'Checkbox Field', 'foofields' ),
													'desc'     => __( 'A test Checkbox field', 'foofields' ),
													'type'     => 'checkbox',
												),
												array(
													'id'       => 'select',
													'label'    => __( 'Select Field', 'foofields' ),
													'desc'     => __( 'A test select field', 'foofields' ),
													'type'     => 'select',
													'choices' => array(
														'option1' => __( 'Option 1', 'foofields' ),
														'option2' => __( 'Option 2', 'foofields' ),
														'option3' => __( 'Option 3', 'foofields' ),
														'option4' => __( 'Option 4', 'foofields' ),
													)
												),
												array(
													'id'       => 'manage',
													'type'     => 'manage',
												),
											)
										)
									)
								),
								array(
									'id'     => 'child2',
									'label'  => __( 'Child 2', 'foofields' ),
									'fields' => array(
										array(
											'id'       => 'child2text',
											'label'    => __( 'Another Text Field', 'foofields' ),
											'type'     => 'text',
										),
										array(
											'id'       => 'child2textarea',
											'label'    => __( 'More Text', 'foofields' ),
											'type'     => 'textarea',
										)
									)
								),
							)
						),
						array(
							'id'     => 'metaboxes',
							'label'  => __( 'Metaboxes', 'foofields' ),
							'icon'   => 'dashicons-format-image',
							'fields' => array(
								array(
									'id'       => 'mb-help',
									'desc'     => __( 'Metabox content can be embedded into fields.', 'foofields' ),
									'type'     => 'help',
								),
								array(
									'id'         => 'move_featured_image',
									'label'      => __( 'Movie Portrait', 'foofields' ),
									'type'       => 'embed-metabox',
									'metabox_id' => 'postimagediv'
								),
								array(
									'id'         => 'move_actors',
									'label'      => __( 'Movie Actors', 'foofields' ),
									'type'       => 'embed-metabox',
									'metabox_id' => 'tagsdiv-foofields_actor'
								),
							)
						),
					)
				) );

			parent::__construct(
				array(
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'test',
					'metabox_title'  => __( 'Test Metabox for Movie', 'foofields' ),
					'priority'       => 'default', //low, default, high
					'meta_key'       => FOOFIELDS_MOVIE_META_TEST,
					'text_domain'    => FOOFIELDS_SLUG,
					'plugin_url'     => FOOFIELDS_URL,
					'plugin_version' => FOOFIELDS_VERSION,
					//'layout'         => 'foofields-tabs-vertical',
					'fields'         => $field_group
				)
			);
		}

		/**
		 * Runs a successful thing on the server
		 *
		 * @param $field
		 */
		function return_success( $field ) {
			$post_id = $this->safe_get_from_request( 'postID' );

			wp_send_json_success( array(
				'message' => sprintf( __( 'A successful thing was run on the server. Post ID: %s', 'foofields' ), $post_id )
			) );
		}

		/**
		 * Runs a error thing on the server
		 *
		 * @param $field
		 */
		function return_error( $field ) {
			$post_id = $this->safe_get_from_request( 'postID' );

			wp_send_json_error( array(
				'message' => sprintf( __( 'An error occurred on the server. Post ID: %s', 'foofields' ), $post_id )
			) );
		}
	}
}
