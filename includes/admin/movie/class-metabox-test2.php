<?php

namespace FooPlugins\FooFields\Admin\Movie;

use FooPlugins\FooFields\Admin\Metaboxes\CustomPostTypeMetabox;

if ( ! class_exists( 'FooPlugins\FooFields\Admin\Movie\MetaboxTest2' ) ) {

	class MetaboxTest2 extends CustomPostTypeMetabox {

		function __construct() {
			parent::__construct(
				array(
					'post_type'      => FOOFIELDS_CPT_MOVIE,
					'metabox_id'     => 'test2',
					'metabox_title'  => __( 'Test Metabox for Movie - hardcoded', 'foofields' ),
					'priority'       => 'low',
					'text_domain'    => FOOFIELDS_SLUG,
					'plugin_url'     => FOOFIELDS_URL,
					'plugin_version' => FOOFIELDS_VERSION,
					'metabox_render_function' => array( $this, 'render' )
				)
			);
		}

		function render() {
?>
			<div class="foofields-container foofields-tabs-vertical">
				<ul class="foofields-tabs">
					<li class="foofields-tab">
						<a href="#general" class="foofields-tab-link">
							<span class="foofields-tab-icon dashicons dashicons-admin-tools"></span>
							<span class="foofields-tab-text">General</span>
						</a>
					</li>
					<li class="foofields-tab">
						<a href="#advanced" class="foofields-tab-link">
							<span class="foofields-tab-icon dashicons dashicons-admin-generic"></span>
							<span class="foofields-tab-text">Advanced</span>
						</a>
					</li>
					<li class="foofields-tab">
						<a href="#lightbox-general" class="foofields-tab-link">
							<span class="foofields-tab-icon dashicons dashicons-grid-view"></span>
							<span class="foofields-tab-text">Lightbox</span>
						</a>
						<ul class="foofields-tab-menu">
							<li class="foofields-tab-menu-item">
								<a href="#lightbox-general" class="foofields-tab-menu-link">
									<span class="foofields-tab-menu-text">General</span>
								</a>
							</li>
							<li class="foofields-tab-menu-item">
								<a href="#lightbox-captions" class="foofields-tab-menu-link">
									<span class="foofields-tab-menu-text">Captions</span>
								</a>
							</li>
							<li class="foofields-tab-menu-item">
								<a href="#lightbox-thumbnails" class="foofields-tab-menu-link">
									<span class="foofields-tab-menu-text">Thumbnails</span>
								</a>
							</li>
						</ul>
					</li>
					<li class="foofields-tab">
						<a href="#video" class="foofields-tab-link">
							<span class="foofields-tab-icon dashicons dashicons-format-video"></span>
							<span class="foofields-tab-text">Video</span>
						</a>
					</li>
				</ul>
				<div id="general" class="foofields-content">
					<h4>General</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
					<p>
						Vestibulum id eleifend ante, eu interdum nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer dapibus massa dolor, vitae tempus diam sodales id. Proin rhoncus aliquam justo, at tempus libero. Cras rhoncus placerat ipsum, at commodo mi bibendum ut. Etiam vel ornare sem. Mauris tincidunt metus eget augue eleifend, vel mattis tellus egestas. Sed tincidunt dapibus ex, et eleifend ipsum condimentum quis. Aenean sed convallis lectus, sit amet tincidunt sem. Nunc consectetur in nisl sed porta. Mauris tempor dui vel ipsum hendrerit, vel tristique ipsum finibus.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus purus sit amet ultricies convallis. Curabitur blandit, velit eu imperdiet faucibus, ex quam mattis leo, iaculis tincidunt magna sem ut orci. Ut porta leo vestibulum nisi euismod, sodales auctor lectus sollicitudin. Aenean vehicula sollicitudin nibh, cursus suscipit sapien malesuada ut. Phasellus mollis aliquet felis, consectetur viverra neque commodo et. Fusce dui libero, viverra vitae massa id, pellentesque condimentum justo. Aliquam nec ultricies ex. Nulla nunc nisl, malesuada non gravida et, convallis vehicula ex. Nam varius commodo massa a sagittis. Maecenas id vestibulum lorem. Nunc leo risus, pharetra sit amet luctus ut, tempus et nunc. Nullam ac ligula fermentum, dignissim urna a, consectetur turpis. Proin cursus lacus at blandit lacinia. Quisque eget leo accumsan, rutrum libero ac, suscipit ante.
					</p>
				</div>
				<div id="advanced" class="foofields-content">
					<h4>Advanced</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
					<p>
						Vestibulum id eleifend ante, eu interdum nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer dapibus massa dolor, vitae tempus diam sodales id. Proin rhoncus aliquam justo, at tempus libero. Cras rhoncus placerat ipsum, at commodo mi bibendum ut. Etiam vel ornare sem. Mauris tincidunt metus eget augue eleifend, vel mattis tellus egestas. Sed tincidunt dapibus ex, et eleifend ipsum condimentum quis. Aenean sed convallis lectus, sit amet tincidunt sem. Nunc consectetur in nisl sed porta. Mauris tempor dui vel ipsum hendrerit, vel tristique ipsum finibus.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus purus sit amet ultricies convallis. Curabitur blandit, velit eu imperdiet faucibus, ex quam mattis leo, iaculis tincidunt magna sem ut orci. Ut porta leo vestibulum nisi euismod, sodales auctor lectus sollicitudin. Aenean vehicula sollicitudin nibh, cursus suscipit sapien malesuada ut. Phasellus mollis aliquet felis, consectetur viverra neque commodo et. Fusce dui libero, viverra vitae massa id, pellentesque condimentum justo. Aliquam nec ultricies ex. Nulla nunc nisl, malesuada non gravida et, convallis vehicula ex. Nam varius commodo massa a sagittis. Maecenas id vestibulum lorem. Nunc leo risus, pharetra sit amet luctus ut, tempus et nunc. Nullam ac ligula fermentum, dignissim urna a, consectetur turpis. Proin cursus lacus at blandit lacinia. Quisque eget leo accumsan, rutrum libero ac, suscipit ante.
					</p>
				</div>
				<div id="video" class="foofields-content">
					<h4>Video</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
				</div>
				<div id="lightbox-general" class="foofields-content">
					<h4>Lightbox General</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
				</div>
				<div id="lightbox-captions" class="foofields-content">
					<h4>Lightbox Captions</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
				</div>
				<div id="lightbox-thumbnails" class="foofields-content">
					<h4>Lightbox Thumbnails</h4>
					<p>
						Aenean mattis consectetur risus, in bibendum eros egestas quis. In velit ante, mattis vel justo eu, feugiat aliquet magna. Duis dictum vel lacus vitae vulputate. Proin dignissim neque vel augue semper pulvinar. Maecenas volutpat tortor arcu, lacinia maximus ipsum feugiat vel. Suspendisse tincidunt ante nisi, id rhoncus urna condimentum eu. In ac est nec leo convallis rutrum id quis libero. Phasellus et leo in felis fermentum accumsan eget vel sapien.
					</p>
				</div>
			</div>
<?php
		}
	}
}
