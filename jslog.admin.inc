<?php

function jslog_settings() {
  $form = array();

  $form['jslog_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Jslog Enabled'),
    '#default_value' => variable_get('jslog_enabled', TRUE),
    '#description' => t("Removes jslog scripts and logging functions."),
  );
  
  $form['jslog_identity'] = array(
    '#type' => 'textfield',
    '#title' => t('JSLog Watchdog Identity'),
    '#default_value' => variable_get('jslog_identity', 'jslog'),
    '#description' => t("Sets the watchdog logging identity of jslog messages."),
  );

  return system_settings_form($form);
}