<?php

function jslog_settings() {
  $form = array();

  $form['jslog_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Jslog Enabled'),
    '#default_value' => variable_get('jslog_enabled', TRUE),
    '#description' => t("Removes jslog scripts and logging functions."),
  );

  $form['jslog_window_on_error'] = array(
    '#type' => 'checkbox',
    '#title' => t('Catch Errors'),
    '#default_value' => variable_get('jslog_window_on_error', TRUE),
    '#description' => t("Just enable the logging object do not hook into window.onerror."),
  );

  $form['jslog_continue'] = array(
    '#type' => 'checkbox',
    '#title' => t('Jslog Continue on Error'),
    '#default_value' => variable_get('jslog_continue', TRUE),
    '#description' => t("Log exception and continue without notifying browser."),
  );

  $form['jslog_console'] = array(
    '#type' => 'checkbox',
    '#title' => t('Jslog Console Logging Enabled'),
    '#default_value' => variable_get('jslog_console', FALSE),
    '#description' => t("Output message to console log as well."),
  );

  $form['jslog_browser_debug_data'] = array(
    '#type' => 'checkbox',
    '#title' => t('Browser Debug Data'),
    '#default_value' => variable_get('jslog_browser_debug_data', TRUE),
    '#description' => t("Send the browser debug data with the message."),
  );

  
  $form['jslog_identity'] = array(
    '#type' => 'textfield',
    '#title' => t('JSLog Watchdog Identity'),
    '#default_value' => variable_get('jslog_identity', 'jslog'),
    '#description' => t("Sets the watchdog logging identity of jslog messages."),
  );

  return system_settings_form($form);
}