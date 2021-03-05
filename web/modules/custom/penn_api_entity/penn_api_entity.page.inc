<?php

/**
 * @file
 * Contains penn_api_entity.page.inc.
 *
 * Page callback for Penn API Entity entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Penn API Entity templates.
 *
 * Default template: penn_api_entity.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_penn_api_entity(array &$variables) {
  // Fetch PennApiEntity Entity Object.
  $penn_api_entity = $variables['elements']['#penn_api_entity'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
