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
						array(
							'id'     => 'portrait',
							'label'  => __( 'Portrait', 'foofields' ),
							'icon'   => 'dashicons-format-image',
							'fields' => array(),
							'type'   => 'featured_image',
							'featuredImage' => true
						),
						array(
							'id'     => 'genres',
							'label'  => __( 'Genres', 'foofields' ),
							'icon'   => 'dashicons-groups',
							'type'   => 'taxonomy',
							'fields' => array(),
							'taxonomy' => FOOFIELDS_CT_GENRE
						),
						array(
							'id'     => 'nested',
							'label'  => __( 'Parent', 'foofields' ),
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
								array(
									'id'       => 'suggest',
									'label'    => __( 'Suggest Field (autocomplete without a key)', 'foofields' ),
									'type'     => 'suggest',
									'default'  => '',
									'placeholder' => __( 'Start typing', 'foofields' ),
									'query_type' => 'post',
									'query_data' => FOOFIELDS_CPT_MOVIE
								),
								array(
									'id'       => 'selectize',
									'label'    => __( 'selectize Field (autocomplete with a key)', 'foofields' ),
									'type'     => 'selectize',
									'placeholder' => __( 'Start typing', 'foofields' ),
									'query_type' => 'post',
									'query_data' => FOOFIELDS_CPT_MOVIE
								)
							)
						)
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
	}
}
