<?php
use Glpi\Plugin\Hooks;
/**
 * Define a versão do plugin
 */
define('PLUGIN_ZOOMIMG_VERSION', '1.0.0');

/**
 * Inicialização dos hooks (vazio por enquanto)
 */
function plugin_init_zoomimg() {
   global $PLUGIN_HOOKS;
   $PLUGIN_HOOKS['csrf_compliant']['zoomimg'] = true;

   if (Session::getLoginUserID()) {
      $PLUGIN_HOOKS[Hooks::ADD_JAVASCRIPT]['zoomimg'] = 'js/zoom.js';
      $PLUGIN_HOOKS[Hooks::ADD_CSS]['zoomimg']        = 'css/zoom.css';
   }
}

/**
 * Informações exibidas na lista de plugins
 */
function plugin_version_zoomimg() {
   return [
      'name'           => 'ZoomImg +',
      'version'        => PLUGIN_ZOOMIMG_VERSION,
      'author'         => 'PauloPaulino[JFQ],
      'license'        => 'GPLv2+',
      'homepage'       => 'https://github.com/seu-repo',
      'requirements'   => [
         'glpi' => [
            'min' => '10.0.0', // Versão mínima do GLPI
         ]
      ]
   ];
}
function plugin_zoomimg_check_prerequisites() { return true; }
function plugin_zoomimg_check_config($verbose = false) { return true;
/**
 * Checagem de pré-requisitos (obrigatório para não dar erro)
 */
function plugin_zoomimg_check_prerequisites() {
   return true;
}

/**
 * Checagem de configuração
 */
function plugin_zoomimg_check_config($verbose = false) {
   return true;
}