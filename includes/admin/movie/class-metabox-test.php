<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest' ) ) {

	class MetaboxTest extends Metabox {

		function __construct() {
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
								'class'    => 'foofields-field-short',
								'before_input_render' => function( $field ) {
									echo '$ ';
								}
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
							array(
								'id'       => 'datejoined',
								'label'    => __( 'Joined Date', 'foofields' ),
								'desc'     => __( 'This date feild has a custom after_input_function function to show lenght of service basd on the date selected.', 'foopeople' ),
								'type'     => 'date',
								'min'     => '1970-01-01',
								'max'     => date("Y-m-d"),
								'default'  => '',
								'after_input_render' => function( $field ) {
									$datejoined = $field->value();

									if ( $datejoined !== '' ) {
										$diff = abs(time() - strtotime( $datejoined ) );
										$years = floor($diff / (365*60*60*24));
										$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));

										echo sprintf( '%d years, %d months', $years, $months );
									}
								}
							), //datejoined
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
					),
					array(
						'id'     => 'validation',
						'label'  => __( 'Validation', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'required',
								'label'    => __( 'Required Field', 'foofields' ),
								'desc'     => __( 'This field is required. To test how the validation works, save the post without entering anything.', 'foofields' ),
								'type'     => 'text',
								'required' => true
							),
							array(
								'id'       => 'checkboxlistvalidation',
								'label'    => __( 'Checkbox List Min Validation', 'foofields' ),
								'desc'     => __( 'You need to select at least 2 options', 'foofields' ),
								'required' => array(
									'minimum' => 2,
								),
								'type'     => 'checkboxlist',
								'choices' => array(
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
							array(
								'id'       => 'checkboxlistvalidation2',
								'label'    => __( 'Checkbox List Max Validation', 'foofields' ),
								'desc'     => __( 'You need to select at most 3 options', 'foofields' ),
								'required' => array(
									'maximum' => 3,
								),
								'type'     => 'checkboxlist',
								'choices' => array(
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
							array(
								'id'       => 'checkboxlistvalidation3',
								'label'    => __( 'Checkbox List Exact Validation', 'foofields' ),
								'desc'     => __( 'You need to select exactly 1 option', 'foofields' ),
								'required' => array(
									'exact' => 1,
								),
								'type'     => 'checkboxlist',
								'choices' => array(
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
							array(
								'id'       => 'customvalidation',
								'label'    => __( 'Custom Validation', 'foofields' ),
								'desc'     => __( 'This field has custom validation. You have to enter exactly "bob"', 'foofields' ),
								'type'     => 'text',
								'required' => array(
									'validation_function' => array( $this, 'validate_custom' ),
									'message' => __( 'Custom field validation failed for %s! You have to enter exactly "bob"', 'foofields' )
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
					),
					array(
						'id'     => 'showrules',
						'label'  => __( 'Show Rules', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'showrulesheading',
								'label'     => __( 'This tab shows how the field show rules work', 'foofields' ),
								'type'     => 'heading',
							),
							array(
								'id'       => 'showrulelist',
								'label'    => __( 'Show Rules List', 'foofields' ),
								'desc'     => __( 'Choose different options to see show the show rules will apply', 'foofields' ),
								'type'     => 'radiolist',
								'default'  => 'default',
								'choices' => array(
									'default' => __( 'Default', 'foofields' ),
									'option1' => __( 'Option 1', 'foofields' ),
									'option2' => __( 'Option 2', 'foofields' ),
									'option3' => __( 'Option 3', 'foofields' ),
									'option4' => __( 'Option 4', 'foofields' ),
								)
							),
							array(
								'id'       => 'showrulestext',
								'label'    => __( 'Text Field', 'foofields' ),
								'desc'     => __( 'This is shown when the "Option 1" is selected', 'foofields' ),
								'type'     => 'text',
								'data'     => array(
									'show-when' => array(
										'field' => 'showrulelist',
										'value' => 'option1',
									)
								)
							),
							array(
								'id'       => 'showrulestext2',
								'label'    => __( 'Text Field 2', 'foofields' ),
								'desc'     => __( 'This is shown when the "Default" option is NOT selected', 'foofields' ),
								'type'     => 'text',
								'data'     => array(
									'show-when' => array(
										'field' => 'showrulelist',
										'operator' => '!==',
										'value' => 'default',
									)
								)
							),
							array(
								'id'       => 'showrulestext3',
								'label'    => __( 'Text Field 3', 'foofields' ),
								'desc'     => __( 'This is shown when "Option 2" OR "Option 3" is selected', 'foofields' ),
								'type'     => 'text',
								'data'     => array(
									'show-when' => array(
										'field' => 'showrulelist',
										'operator' => 'regex',
										'value' => 'option2|option3',
									)
								)
							),
							array(
								'id'       => 'showrulelist2',
								'label'    => __( 'Some More Options', 'foofields' ),
								'desc'     => __( 'This will test nested show rules.', 'foofields' ),
								'type'     => 'radiolist',
								'default'  => 'none',
								'choices' => array(
									'none' => __( 'Show no new fields', 'foofields' ),
									'show' => __( 'Show another field', 'foofields' ),
								),
								'data'     => array(
									'show-when' => array(
										'field' => 'showrulelist',
										'value' => 'option3',
									)
								)
							),
							array(
								'id'       => 'showrulestext4',
								'label'    => __( 'Text Field 4', 'foofields' ),
								'desc'     => __( 'This is shown when "Option 3" AND "Show another field" is selected', 'foofields' ),
								'type'     => 'text',
								'data'     => array(
									'show-when' => array(
										'field' => 'showrulelist2',
										'value' => 'show',
									)
								)
							),
						)
					),
					array(
						'id'     => 'showrules2',
						'label'  => __( 'Hidden', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'showrules2heading',
								'label'     => __( 'This tab is only shown if "Option 4" is selected under the first Show Rules tab', 'foofields' ),
								'type'     => 'heading',
							)
						),
						'data'     => array(
							'show-when' => array(
								'field' => 'showrulelist',
								'value' => 'option4',
							)
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

		function validate_custom( $value, $field ) {
			return $value === 'bob';
		}
	}
}
