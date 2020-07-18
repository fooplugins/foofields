<?php

namespace FooPlugins\FooFields\Admin\Movie;

use FooPlugins\FooFields\Admin\Metaboxes\CustomPostTypeMetaboxFieldGroup;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest' ) ) {

	class MetaboxTest extends CustomPostTypeMetaboxFieldGroup {

		function __construct() {
			//filter to allow field group to be overridden
			$field_group = apply_filters( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest\FieldGroup',
				array(
					'tabs' => array(
//						array(
//							'id'     => 'genres',
//							'label'  => __( 'Genres', 'foofields' ),
//							'icon'   => 'dashicons-groups',
//							'type'   => 'taxonomy',
//							'fields' => array(),
//							'taxonomy' => FOOFIELDS_CT_GENRE
//						),
						array(
							'id'     => 'simplefields',
							'label'  => __( 'Simple Fields', 'foofields' ),
							'icon'   => 'dashicons-editor-kitchensink',
							'fields' => array(
								array(
									'id'       => 'help',
									'desc'     => __( 'This tab shows all the available fields. This is a help field.', 'foofields' ),
									'type'     => 'help',
								),
								array(
									'id'       => 'heading',
									'desc'     => __( 'Heading Field', 'foofields' ),
									'type'     => 'heading',
								),
								array(
									'id'       => 'singlecolumn',
									'desc'     => __( 'Another help field but with class set to foometafields-icon foometafields-icon-promo', 'foofields' ),
									'class'    => 'foometafields-icon-promo',
									'type'     => 'help',
								),
								array(
									'id'       => 'text',
									'label'    => __( 'Block Field', 'foofields' ),
									'desc'     => __( 'This field should have the label above the input', 'foofields' ),
									'type'     => 'text',
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
									'type'     => 'radiolist',
									'spacer'   => '',
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
									'label'    => __( 'Radio Fields Stacked', 'foofields' ),
									'desc'     => __( 'Radio Fields Stacked', 'foofields' ),
									'type'     => 'radiolist',
									// 'spacer'   => '',
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
									'choices' => array(
										'option1' => __( 'Option 1', 'foofields' ),
										'option2' => __( 'Option 2', 'foofields' ),
										'option3' => __( 'Option 3', 'foofields' ),
										'option4' => __( 'Option 4', 'foofields' ),
									)
								),
								array(
									'id'       => 'htmllist',
									'label'    => __( 'HTML List Field (radio)', 'foofields' ),
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
									'label'    => __( 'HTML List Field (checkbox)', 'foofields' ),
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
					'plugin_version' => FOOFIELDS_VERSION
				),
				$field_group
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
