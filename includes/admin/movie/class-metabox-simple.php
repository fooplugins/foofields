<?php

namespace FooPlugins\FooFields\Admin\Movie;


use FooPlugins\FooFields\Admin\FooFields\Metabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxSimple' ) ) {

	class MetaboxSimple extends Metabox {

		function __construct() {
			parent::__construct(
				array(
					'manager'        => FOOFIELDS_SLUG,
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'details',
					'unique_id'      => 'movie_details_simple',
					'metabox_title'  => __( 'Simple Metabox for Movie', 'foofields' ),
					'priority'       => 'default', //low, default, high
					'meta_key'       => FOOFIELDS_MOVIE_META_SIMPLE,
					//'layout'         => 'foofields-tabs-vertical',
					'condition'      => array(
						'meta_key' => FOOFIELDS_MOVIE_META_TYPE,
						'field_id' => 'type',
						'field_value' => 'simple' // Only show this metabox if the type field of another metaobx is set to simple
					)
				)
			);
		}

		function get_tabs() {
			$simple_tab = array(
				'id'     => 'simplefields',
				'label'  => __( 'Simple', 'foofields' ),
				'icon'   => 'dashicons-editor-kitchensink',
				'tabs' => array(
					'headers_icons' => array(
						'id'     => 'headers_icons',
						'label'  => __( 'Informational', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'simpleheading',
								'label'    => __( 'Simple Fields', 'foofields' ),
								'desc'     => __( 'This tab shows all the simple informational fields, which include headers and icons', 'foofields' ),
								'type'     => 'heading',
								'tooltip'  => array(
									'text' => __( 'A tooltip to help the user', 'foofields' ),
									'length' => 'small',
									'position' => 'top'
								)
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
					'inputs' => array(
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
								'type'     => 'colorpicker'
							),
							array(
								'id'       => 'alpha_colorpicker',
								'label'    => __( 'Alpha Colorpicker Field', 'foofields' ),
								'desc'     => __( 'A colorpicker field using a modified version of the colorpicker built into WP', 'foofields' ),
								'type'     => 'colorpicker',
								'alpha'    => true
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
					'lists' => array(
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
					'validation' => array(
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
								'id'       => 'fieldlayoutauto',
								'label'    => __( 'Auto Field', 'foofields' ),
								'desc'     => __( 'This field automatically switches between "inline" and "block" layouts depending on available space.', 'foofields' ),
								'type'     => 'text'
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
						'id'    => 'fieldgroups',
						'label' => __( 'Field Groups', 'foofields' ),
						'fields' => array(
							array(
								'id'       => 'fieldgroupsheading',
								'label'    => __( 'Field Groups', 'foofields' ),
								'desc'     => __( 'This tab shows how fields can be grouped together allowing for more advanced field layouts. Groups support the column CSS classes which allows you to have more than one type of column layout within a single content area. As an example this content area has no columns specified however further down there are groups specifying there own column layout. You can see another example of this in the "Columns" examples where it is used to provide a 3 column layout within a 4 column layout content area. Groups also support the Show Rules just like other fields so you can set a single rule to toggle the visibility of the entire group. You can see an example of this under the "Show Rules" tab when selecting "Option 4".', 'foofields' ),
								'type'     => 'heading'
							),
							array(
								'id' => 'fieldgroupsgroup',
								'label' => __( 'Field Group', 'foofields' ),
								'desc' => __( 'This is a field group. The "label" creates the above header while the "desc" creates this paragraph. Child fields are then rendered directly after this heading.', 'foofields' ),
								'type' => 'field-group',
								'fields' => array(
									array(
										'id' => 'fieldgroupsgroupinput1',
										'label' => __( 'Text Input', 'foofields' ),
										'desc' => __( 'This text input is grouped with the above header and the below text area.', 'foofields' ),
										'type' => 'text'
									),
									array(
										'id' => 'fieldgroupsgroupinput2',
										'label' => __( 'Text Area' ),
										'desc' => __( 'This text area is grouped with the above text input and header.', 'foofields' ),
										'type' => 'textarea'
									)
								)
							),
							array(
								'id' => 'fieldgroupsgroupblock',
								'label' => __( 'Field Group - Block', 'foofields' ),
								'desc' => __( 'This is another field group identical to the above except the "layout" option has been set to "block". Child fields will inherit the layout value of the field group as there own default layout value.', 'foofields' ),
								'type' => 'field-group',
								'layout' => 'block',
								'fields' => array(
									array(
										'id' => 'fieldgroupsgroupblockinput1',
										'label' => __( 'Text Input', 'foofields' ),
										'desc' => __( 'This text input is grouped with the above header and the below text area.', 'foofields' ),
										'type' => 'text'
									),
									array(
										'id' => 'fieldgroupsgroupblockinput2',
										'label' => __( 'Text Area' ),
										'desc' => __( 'This text area is grouped with the above text input and header.', 'foofields' ),
										'type' => 'textarea'
									)
								)
							),
							array(
								'id' => 'fieldgroupsgroupindent',
								'label' => __( 'Field Group - Indent', 'foofields' ),
								'desc' => __( 'This is another field group with the "indent" option set to "true". This will add the "foofields-field-indent" class to each child field.', 'foofields' ),
								'type' => 'field-group',
								'indent' => true,
								'fields' => array(
									array(
										'id' => 'fieldgroupsgroupindentinput1',
										'label' => __( 'Text Input', 'foofields' ),
										'desc' => __( 'This text input is grouped with the above header and the below text area.', 'foofields' ),
										'type' => 'text'
									),
									array(
										'id' => 'fieldgroupsgroupindentinput2',
										'label' => __( 'Text Area' ),
										'desc' => __( 'This text area is grouped with the above text input and header.', 'foofields' ),
										'type' => 'textarea'
									)
								)
							),
							array(
								'id' => 'fieldgroupstwocolumns',
								'label' => __( 'Field Groups + Columns' ),
								'desc' => __( 'The above examples simply demonstrate the basic properties of a group. The real power of groups comes into play when combined with columns. This field group has the class "foofields-cols-4" on it and has nested field groups within it which could in turn specify there own column layout. Being able to group fields together prevents them being jumbled when switching to a small screen layout like they would if you were just using the column classes to position them.' ),
								'class' => 'foofields-cols-4',
								'type' => 'field-group',
								'fields' => array(
									array(
										'id' => 'fieldgroupstwocolumnsgroup1',
										'label' => __( 'Group 1', 'foofields' ),
										'type' => 'field-group',
										'fields' => array(
											array(
												'id' => 'fieldgroupstwocolumnsgroup1input1',
												'label' => __( 'Group 1 - Input 1' ),
												'type' => 'text'
											),
											array(
												'id' => 'fieldgroupstwocolumnsgroup1input2',
												'label' => __( 'Group 1 - Input 2' ),
												'type' => 'textarea'
											)
										)
									),
									array(
										'id' => 'fieldgroupstwocolumnsgroup2',
										'label' => __( 'Group 2', 'foofields' ),
										'type' => 'field-group',
										'fields' => array(
											array(
												'id' => 'fieldgroupstwocolumnsgroup2input1',
												'label' => __( 'Group 2 - Input 1' ),
												'type' => 'text'
											),
											array(
												'id' => 'fieldgroupstwocolumnsgroup2input2',
												'label' => __( 'Group 2 - Input 2' ),
												'type' => 'textarea'
											)
										)
									),
									array(
										'id' => 'fieldgroupstwocolumnsgroup3',
										'label' => __( 'Group 3', 'foofields' ),
										'type' => 'field-group',
										'fields' => array(
											array(
												'id' => 'fieldgroupstwocolumnsgroup3input1',
												'label' => __( 'Group 3 - Input 1' ),
												'type' => 'text'
											),
											array(
												'id' => 'fieldgroupstwocolumnsgroup3input2',
												'label' => __( 'Group 3 - Input 2' ),
												'type' => 'textarea'
											)
										)
									),
									array(
										'id' => 'fieldgroupstwocolumnsgroup4',
										'label' => __( 'Group 4', 'foofields' ),
										'type' => 'field-group',
										'fields' => array(
											array(
												'id' => 'fieldgroupstwocolumnsgroup4input1',
												'label' => __( 'Group 4 - Input 1' ),
												'type' => 'text'
											),
											array(
												'id' => 'fieldgroupstwocolumnsgroup4input2',
												'label' => __( 'Group 4 - Input 2' ),
												'type' => 'textarea'
											)
										)
									)
								)
							)
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
								'id'       => 'colheadinggroup3',
								'label'     => __( '3 Columns - Field Group', 'foofields' ),
								'desc'      => __( 'This field group has a class of "foofields-full-width foofields-cols-3". "foofields-full-width" makes it use all 4 columns of the parent tab and then "foofields-cols-3" divides its contents into 3 columns.', 'foofields' ),
								'type'     => 'field-group',
								'class'    => 'foofields-full-width foofields-cols-3',
								'fields'    => array(
									array(
										'id'       => '3colgroupcell1',
										'label'    => __( 'Firstname', 'foofields' ),
										'type'     => 'text',
										'tooltip'  => __( 'This field has no class set', 'foofields' ),
									),
									array(
										'id'       => '3colgroupcell2',
										'label'    => __( 'Middle', 'foofields' ),
										'type'     => 'text',
										'tooltip'  => __( 'This field has no class set', 'foofields' ),
									),
									array(
										'id'       => '3colgroupcell3',
										'label'    => __( 'Last Name', 'foofields' ),
										'type'     => 'text',
										'tooltip'  => __( 'This field has no class set', 'foofields' ),
									)
								)
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
							array(
								'id'    => 'showrulesfieldgroup',
								'label' => __( 'Field Group', 'foofields' ),
								'desc'  => __( 'This field group is shown when "Option 4" is selected', 'foofields' ),
								'type'  => 'field-group',
								'fields'=> array(
									array(
										'id'       => 'showrulesfieldgrouptext',
										'label'    => __( 'Text Field', 'foofields' ),
										'desc'     => __( 'This is shown as part of the field group when the "Option 4" is selected', 'foofields' ),
										'type'     => 'text'
									),
									array(
										'id'       => 'showrulesfieldgroupradio',
										'label'    => __( 'Nested Rules', 'foofields' ),
										'desc'     => __( 'Show nested field group?', 'foofields' ),
										'type'     => 'radiolist',
										'default'  => 'no',
										'choices' => array(
											'no' => __( 'No', 'foofields' ),
											'yes' => __( 'Yes', 'foofields' ),
										)
									),
									array(
										'id' => 'showrulesfieldgroupnested',
										'label' => __( 'A Nested Field Group', 'foofields' ),
										'desc'  => __( 'This field group is shown when "Option 1" is selected', 'foofields' ),
										'type'  => 'field-group',
										'fields' => array(
											array(
												'id'       => 'showrulesfieldgroupnestedtext',
												'label'    => __( 'Nested Text Field', 'foofields' ),
												'desc'     => __( 'This is shown as part of the nested field group', 'foofields' ),
												'type'     => 'text'
											)
										),
										'data'     => array(
											'show-when' => array(
												'field' => 'showrulesfieldgroupradio',
												'value' => 'yes',
											)
										)
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

			$field_group = array(
				'simplefields' => $simple_tab,
				'layoutfields' => $layout_tab,
			);

			return $field_group;
		}

		function validate_custom( $value, $field ) {
			return $value === 'bob';
		}
	}
}