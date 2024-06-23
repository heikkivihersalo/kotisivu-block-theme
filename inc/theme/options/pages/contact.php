<?php

return array(
	'kotisivu-block-theme_site-contact' => array(
		'page_title'  => __( 'Contact', 'kotisivu-block-theme' ),
		'parent_slug' => 'kotisivu_theme_settings',
		'sections'    => array(
			'section-contact' => array(
				'title'  => __( 'Contact Information', 'kotisivu-block-theme' ),
				'text'   => '<p>' .
					__( 'Add contact information here.', 'kotisivu-block-theme' )
					. '</p>',
				'fields' => array(
					'name'    => array(
						'id'       => 'contact-company-name',
						'type'     => 'text',
						'title'    => __( 'Company Name', 'kotisivu-block-theme' ),
						'sanitize' => true,
					),
					'address' => array(
						'id'          => 'contact-address',
						'title'       => __( 'Address', 'kotisivu-block-theme' ),
						'type'        => 'text',
						'placeholder' => 'Osoite 123',
						'sanitize'    => true,
					),
					'zip'     => array(
						'id'          => 'contact-zip',
						'type'        => 'text',
						'title'       => __( 'ZIP', 'kotisivu-block-theme' ),
						'placeholder' => '12345',
						'sanitize'    => true,
					),
					'city'    => array(
						'id'          => 'contact-city',
						'type'        => 'text',
						'title'       => __( 'City', 'kotisivu-block-theme' ),
						'placeholder' => 'Kaupunki',
						'sanitize'    => true,
					),
					'country' => array(
						'id'          => 'contact-country',
						'type'        => 'text',
						'title'       => __( 'country', 'kotisivu-block-theme' ),
						'placeholder' => 'Maa',
						'sanitize'    => true,
					),
					'email'   => array(
						'id'          => 'contact-email',
						'title'       => __( 'Email', 'kotisivu-block-theme' ),
						'type'        => 'email',
						'placeholder' => 'email.address@domain.com',
						'sanitize'    => true,
					),
					'phone'   => array(
						'id'          => 'contact-phone',
						'title'       => __( 'Phone', 'kotisivu-block-theme' ),
						'type'        => 'tel',
						'placeholder' => '044 123 1234',
						'sanitize'    => true,
					),
					'id'      => array(
						'id'       => 'contact-business-id',
						'type'     => 'text',
						'title'    => __( 'Business ID', 'kotisivu-block-theme' ),
						'sanitize' => true,
					),
					'vat'     => array(
						'id'       => 'contact-vat-number',
						'type'     => 'text',
						'title'    => __( 'VAT number', 'kotisivu-block-theme' ),
						'sanitize' => true,
					),
				),
			),
		),
	),
);
