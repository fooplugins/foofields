<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxAdvanced' ) ) {

	class MetaboxAdvanced extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOFIELDS_SLUG,
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'details',
					'unique_id'      => 'movie_details_advanced',
					'metabox_title'  => __( 'Advanced Metabox for Movie', 'foofields' ),
					'priority'       => 'default', //low, default, high
					'meta_key'       => FOOFIELDS_MOVIE_META_ADVANCED,
					//'layout'         => 'foofields-tabs-vertical',
					'condition'      => array(
						'meta_key' => FOOFIELDS_MOVIE_META_TYPE,
						'field_id' => 'type',
						'field_value' => 'advanced'
						// Only show this metabox if the type field of another metabox is set to advanced
					)
				)
			);
		}

		function get_tabs() {
			$advanced_tab = array(
				'id'     => 'advfields',
				'label'  => __( 'Advanced Fields', 'foofields' ),
				'icon'   => 'dashicons-list-view',
				'tabs'   => array(
					array(
						'id'     => 'advfields_lookups',
						'label'  => __( 'Lookup Fields', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'suggest',
								'label'    => __( 'Suggest (Post)', 'foofields' ),
								'desc'     => __( 'Autosuggest field using the movie custom post type as the data source', 'foofields' ),
								'type'     => 'suggest',
								'placeholder' => __( 'Start typing to search for movies', 'foofields' ),
								'query' => array(
									'type' => 'post',
									'data' => FOOFIELDS_CPT_MOVIE
								)
							),
							array(
								'id'       => 'suggest2',
								'label'    => __( 'Suggest (Taxonomy)', 'foofields' ),
								'desc'     => __( 'Autosuggest field using the actor taxonomy as the data source', 'foofields' ),
								'type'     => 'suggest',
								'placeholder' => __( 'Start typing to search for actors', 'foofields' ),
								'query' => array(
									'type' => 'taxonomy',
									'data' => FOOFIELDS_CT_ACTOR
								)
							),
							array(
								'id'       => 'selectize',
								'label'    => __( 'Selectize Field', 'foofields' ),
								'desc'     => __( 'Selectize field using the actor taxonomy as the data source. This fields stores both the id and value of the chosen item', 'foofields' ),
								'type'     => 'selectize',
								'placeholder' => __( 'Start typing to search for actors', 'foofields' ),
								'query' => array(
									'type' => 'taxonomy',
									'data' => FOOFIELDS_CT_ACTOR
								)
							),
							array(
								'id'       => 'selectize-multi',
								'label'    => __( 'Multi Select Field', 'foofields' ),
								'type'     => 'selectize-multi',
								'placeholder' => __( 'Choose from a pre-defined set of choices', 'foofields' ),
								'choices' => array(
									array( 'value' => 0, 'display' => __( 'option 1', 'foofields' ) ),
									array( 'value' => 1, 'display' => __( 'option 2', 'foofields' ) ),
									array( 'value' => 2, 'display' => __( 'option 3', 'foofields' ) ),
									array( 'value' => 3, 'display' => __( 'option 4', 'foofields' ) ),
									array( 'value' => 4, 'display' => __( 'option 5', 'foofields' ) ),
								)
							),
							array(
								'id'       => 'selectize-multi-taxonomy',
								'label'    => __( 'Multi Select Field (Taxonomy)', 'foofields' ),
								'type'     => 'selectize-multi',
								'desc'     => __( 'Seletize mult-select field using the actor taxonomy as the data source. Only 1 item can be selected.', 'foofields' ),
								'placeholder' => __( 'Choose an actor', 'foofields' ),
								'create' => true,
								'close_after_select' => false,
								'max_items' => 1,
								'binding' => array(
									'type' => 'taxonomy',
									'taxonomy' => FOOFIELDS_CT_ACTOR,
									'sync_with_post' => true
								)
							),
							array(
								'id'       => 'selectize-multi-taxonomy2',
								'label'    => __( 'Multi Select Field (Taxonomy 2)', 'foofields' ),
								'type'     => 'selectize-multi',
								'desc'     => __( 'Seletize mult-select field using the genre taxonomy as the data source', 'foofields' ),
								'placeholder' => __( 'Choose from the genre taxonomy', 'foofields' ),
								'create' => true,
								//									'close_after_select' => false,
								//									'max_items' => 2,
								'binding' => array(
									'type' => 'taxonomy',
									'taxonomy' => FOOFIELDS_CT_GENRE,
									'sync_with_post' => true
								)
							),
						),
					),
					array(
						'id' => 'advfields_buttons',
						'label' => __( 'Buttons', 'foofields' ),
						'fields' => array(
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
						'id' => 'advfields_lists',
						'label' => __( 'List Fields', 'foofields' ),
						'fields' => array(
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
						'id'     => 'advfields_repeater',
						'label'  => __( 'Repeater', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'child1help',
								'label'    => __( 'Help Field', 'foofields' ),
								'text'     => __( 'This tab shows a repeater field for capturing notes. This is powerful when you want the ability to capture an unknown amount of data.', 'foofields' ),
								'type'     => 'help',
							),
							array(
								'id'       => 'repeater_text',
								'label'    => __( 'Text Field', 'foofields' ),
								'desc'     => __( 'This is a normal text input, just here to compare the repeater CSS to.', 'foofields' ),
								'type'     => 'text'
							),
							array(
								'id'       => 'repeater',
								'label'    => __( 'Repeater Field', 'foofields' ),
								'desc'     => __( 'A repeater field', 'foofields' ),
								'type'     => 'repeater',
								'add_button_text'   => __( 'Add Note', 'foofields' ),
								'fields'   => array(
									array(
										'id' => 'index',
										'type' => 'repeater-index'
									),
									array(
										'id'       => 'text',
										'label'    => __( 'Text Field', 'foofields' ),
										'desc'     => __( 'A test text field', 'foofields' ),
										'type'     => 'text',
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
										'id'       => 'checkboxlist',
										'label'    => __( 'Checkbox List', 'foofields' ),
										'desc'     => __( 'A Checkbox List field', 'foofields' ),
										'type'     => 'checkboxlist',
										'choices' => array(
											'option1' => __( 'Option 1', 'foofields' ),
											'option2' => __( 'Option 2', 'foofields' ),
											'option3' => __( 'Option 3', 'foofields' ),
											'option4' => __( 'Option 4', 'foofields' ),
										)
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
										)
									),
									array(
										'id'       => 'manage',
										'type'     => 'repeater-delete',
									),
								)
							),
							array(
								'id'       => 'repeater_text_2',
								'label'    => __( 'Text Field 2', 'foofields' ),
								'desc'     => __( 'This is a normal text input, just here to compare the repeater CSS to.', 'foofields' ),
								'type'     => 'text'
							),
						)
					),
					array(
						'id'     => 'advfields_metaboxes',
						'label'  => __( 'Metaboxes', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'mb-help',
								'desc'     => __( 'Metabox content can be embedded into tabs and fields. Below we are embedding the featured image metabox and the movie actor taxonomy metabox', 'foofields' ),
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
					)
				)
			);

			$field_group = array(
				'advfields' => $advanced_tab,
				'empty' => array(
					'id' => 'empty',
					'label'  => __( 'Empty', 'foofields' ),
					'icon'   => 'dashicons-sos',
					'fields' => array(
						array(
							'id'       => 'no-children',
							'text'     => __( 'This tab exists just to test a tab with no child tabs.', 'foofields' ),
							'type'     => 'help',
						)
					)
				),
				'empty_2' => array(
					'id' => 'empty_2',
					'label'  => __( 'Empty Menu', 'foofields' ),
					'icon'   => 'dashicons-sos',
					'fields' => array(
						array(
							'id'       => 'hidden-children',
							'text'     => __( 'This tab exists just to test a tab with all hidden child tabs.', 'foofields' ),
							'type'     => 'help',
						),
						array(
							'id'       => 'hide-child-tab',
							'label'    => __( 'Child Tab', 'foofields' ),
							'type'     => 'radiolist',
							'default'   => 'show',
							'choices' => array(
								'show'  => __( 'Show', 'foofields' ),
								'hide'  => __( 'Hide', 'foofields' )
							)
						)
					),
					'tabs' => array(
						array(
							'id' => 'hidden-child',
							'label'  => __( 'Empty', 'foofields' ),
							'fields' => array(
								array(
									'id'       => 'hidden-child',
									'text'     => __( 'This tab exists just to test a tab with all hidden child tabs.', 'foofields' ),
									'type'     => 'help',
								)
							),
							'data' => array(
								'show-when' => array(
									'field' => 'hide-child-tab',
									'value' => 'show'
								)
							)
						)
					)
				)
			);

			return $field_group;
		}

		/**
		 * Runs a successful thing on the server
		 *
		 * @param $field
		 */
		function return_success( $field ) {
			$post_id = sanitize_key( $_REQUEST['postID'] );

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
			$post_id = sanitize_key( $_REQUEST['postID'] );

			wp_send_json_error( array(
				'message' => sprintf( __( 'An error occurred on the server. Post ID: %s', 'foofields' ), $post_id )
			) );
		}
	}
}
