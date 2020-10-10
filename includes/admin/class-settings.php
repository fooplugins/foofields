<?php /** @noinspection ALL */

namespace FooPlugins\FooFields\Admin;

use FooPlugins\FooFields\Admin\FooFields\SettingsPage;

/**
 * FooFields Admin Settings Class
 */

if ( !class_exists( 'FooPlugins\FooFields\Admin\Settings' ) ) {

	class Settings extends SettingsPage {

		public function __construct() {
			$simple_tab = array(
				'id'     => 'simplefields',
				'label'  => __( 'Simple', 'foofields' ),
				'icon'   => 'dashicons-editor-kitchensink',
				'tabs' => array(
					array(
						'id'     => 'headers_icons',
						'label'  => __( 'Informational', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'simpleheading',
								'label'    => __( 'Simple Fields', 'foofields' ),
								'desc'     => __( 'This tab shows all the simple informational fields, which include headers and icons', 'foofields' ),
								'type'     => 'heading',
//											'data'     => array(
//												'show-when' => array (
//													'field' => 'text',
//													'value' => '',
//													'operator' => '!=='
//												)
//											)
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
								'id'       => 'html',
								'html'     => '<code>//An HTML field can display any HTML you want. In this example, we are displaying some code:<br />array( \'id\' => \'htmlfield\', \'type\' => \'html\', \'html\' => \'your HTML goes here!\' );</code>',
								'type'     => 'html',
							),
						)
					),
					array(
						'id'     => 'inputs',
						'label'  => __( 'Inputs', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'text',
								'label'    => __( 'Text Field', 'foofields' ),
								'desc'     => __( 'This is a normal text input', 'foofields' ),
								'type'     => 'text',
								'tooltip'  => array(
									'text' => __( 'A tooltip to help the user', 'foofields' ),
									'length' => 'small',
									'position' => 'top',
									//'icon' => 'dashicons-star-filled'
								)
							),
							array(
								'id'       => 'number',
								'label'    => __( 'Number Field', 'foofields' ),
								'desc'     => __( 'A number field', 'foofields' ),
								'type'     => 'number',
							),
							array(
								'id'       => 'textarea',
								'label'    => __( 'Textarea Field', 'foofields' ),
								'desc'     => __( 'A textarea field', 'foofields' ),
								'type'     => 'textarea',
							),
							array(
								'id'       => 'select',
								'label'    => __( 'Select Field', 'foofields' ),
								'desc'     => __( 'A select field', 'foofields' ),
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
								'desc'     => __( 'A checkbox field', 'foofields' ),
								'layout'   => 'inline',
								'type'     => 'checkbox',
							),
							array(
								'id'       => 'color',
								'label'    => __( 'Color Field', 'foofields' ),
								'desc'     => __( 'A HTML5 color input field', 'foofields' ),
								'type'     => 'color',
							),
							array(
								'id'       => 'colorpicker',
								'label'    => __( 'Colorpicker Field', 'foofields' ),
								'desc'     => __( 'A colorpicker field using the colorpicker built into WP', 'foofields' ),
								'type'     => 'colorpicker',
							),
						)
					),
					array(
						'id'    => 'lists',
						'label'  => __( 'Lists', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'radiolist',
								'label'    => __( 'Radio List', 'foofields' ),
								'desc'     => __( 'A Radio List field with a set of options, default layout is inline', 'foofields' ),
								'type'     => 'radiolist',
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
								'id'       => 'radioliststacked',
								'label'    => __( 'Radio List Stacked', 'foofields' ),
								'desc'     => __( 'A Radio List field with "stacked" = true', 'foofields' ),
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
								'id'       => 'checkboxliststacked',
								'label'    => __( 'Checkbox List Stacked', 'foofields' ),
								'desc'     => __( 'A Checkbox List field with "stacked" = true', 'foofields' ),
								'stacked'  => true,
								'type'     => 'checkboxlist',
								'choices' => array(
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
						)
					)
				)
			);
			$layout_tab = array(
				'id'     => 'layoutfields',
				'label'  => __( 'Layout', 'foofields' ),
				'icon'   => 'dashicons-editor-table',
				'tabs' => array(
					array(
						'id'     => 'fieldlayout',
						'label'  => __( 'Field Layout', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'fieldlayoutheading',
								'label'    => __( 'Field Layout', 'foofields' ),
								'desc'     => __( 'This tab shows how fields can have different layouts, including not displaying a label at all', 'foofields' ),
								'type'     => 'heading'
							),
							array(
								'id'       => 'fieldlayouttext',
								'label'    => __( 'Block Field', 'foofields' ),
								'desc'     => __( 'This field should have the label above the input', 'foofields' ),
								'layout' => 'block',
								'type'     => 'text'
							),
							array(
								'id'       => 'fieldlayoutinline',
								'label'    => __( 'Inline Field', 'foofields' ),
								'desc'     => __( 'This field should have the label next to the input. "layout" = "inline"', 'foofields' ),
								'layout'   => 'inline',
								'type'     => 'text',
							),
							array(
								'id'       => 'fieldlayoutnolabel',
								'desc'     => __( 'This field does not have a label', 'foofields' ),
								'type'     => 'text',
							),
							array(
								'id'       => 'radioblockstacked',
								'label'    => __( 'Radio Fields Block Stacked', 'foofields' ),
								'layout'   => 'block',
								'stacked'  => true,
								'type'     => 'radiolist',
								'choices' => array(
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
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
								'id'       => '4colcell3',
								'label'    => __( 'Line 3', 'foofields' ),
								'type'     => 'text',
								'tooltip'  => __( 'This field has no class set', 'foofields' ),
							),
							array(
								'id'       => '4colcell4',
								'label'    => __( 'Line 4', 'foofields' ),
								'type'     => 'text',
								'tooltip'  => __( 'This field has no class set', 'foofields' ),
							),
						)
					)
				)
			);
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
								'label'    => __( 'Suggest Field (autocomplete using movies)', 'foofields' ),
								'type'     => 'suggest',
								'placeholder' => __( 'Start typing to search for movies', 'foofields' ),
								'query' => array(
									'type' => 'post',
									'data' => FOOFIELDS_CPT_MOVIE
								)
							),
							array(
								'id'       => 'suggest2',
								'label'    => __( 'Suggest Field (autocomplete using taxonomy actor)', 'foofields' ),
								'type'     => 'suggest',
								'placeholder' => __( 'Start typing to search for actors', 'foofields' ),
								'query' => array(
									'type' => 'taxonomy',
									'data' => FOOFIELDS_CT_ACTOR
								)
							),
							array(
								'id'       => 'selectize',
								'label'    => __( 'Selectize Field (autocomplete with a key)', 'foofields' ),
								'type'     => 'selectize',
								'placeholder' => __( 'Start typing to search for actors', 'foofields' ),
								'query' => array(
									'type' => 'taxonomy',
									'data' => FOOFIELDS_CT_ACTOR
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
								'id'       => 'selectize-multi-taxonomy',
								'label'    => __( 'Selectize Multi Select Field (Taxonomy)', 'foofields' ),
								'type'     => 'selectize-multi',
								'placeholder' => __( 'Choose from the actor taxonomy', 'foofields' ),
								'create' => true,
//									'close_after_select' => false,
//									'max_items' => 2,
								'binding' => array(
									'type' => 'taxonomy',
									'taxonomy' => FOOFIELDS_CT_ACTOR,
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
								'id'       => 'repeater',
								//'label'    => __( 'Repeater Field', 'foofields' ),
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
							)
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
				'tabs' => array(
					$simple_tab,
					$layout_tab,
					$advanced_tab,
					array(
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
					)
				)
			);

			parent::__construct(
				array(
					'settings_id'     => 'foofields', //foofields-settings
					'page_title'  => __( 'FooField Settings', 'foofields' ),
					'menu_title' => __('Settings', 'foofields'),
					'menu_parent_slug' => 'edit.php?post_type=' . FOOFIELDS_CPT_MOVIE,
					'text_domain'    => FOOFIELDS_SLUG,
					'plugin_url'     => FOOFIELDS_URL,
					'plugin_version' => FOOFIELDS_VERSION,
					'layout'         => 'foofields-tabs-horizontal',
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
			wp_send_json_success( array(
				'message' => __( 'A successful thing was run on the server', 'foofields' )
			) );
		}

		/**
		 * Runs a error thing on the server
		 *
		 * @param $field
		 */
		function return_error( $field ) {
			wp_send_json_error( array(
				'message' => __( 'An error occurred on the server.', 'foofields' )
			) );
		}
	}
}
