<?php
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
function enqueue_parent_styles() {
    wp_enqueue_style( 'astra-style', get_template_directory_uri().'/style.css' );
}

function my_custom_script_front_page(){
    wp_register_script( 'promise', 'https://polyfill.io/v3/polyfill.min.js?features=Array.from,Promise,Symbol,Object.setPrototypeOf,Object.getOwnPropertySymbols,Set', null, null, true );
    wp_enqueue_script('promise');
    wp_register_script( 'superagent', 'https://cdn.jsdelivr.net/npm/superagent', null, null, true );
    wp_enqueue_script('superagent');
    
    wp_enqueue_script('search-uv', get_stylesheet_directory_uri().'/scripts/search-uv.js',
        array('jquery','promise','superagent'), '', true);
    wp_enqueue_script('customStyleRshiny', get_stylesheet_directory_uri().'/scripts/customStyleRshiny.js',
        array('jquery','promise','superagent'), '', true);

    
}
add_action('wp_enqueue_scripts', 'my_custom_script_front_page');