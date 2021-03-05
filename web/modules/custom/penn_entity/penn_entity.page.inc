<?php

/**
 * @file
 * Contains penn_entity.page.inc.
 *
 * Page callback for Penn Entity entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Penn Entity templates.
 *
 * Default template: penn_entity.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_penn_entity(array &$variables) {
  // Fetch PennEntity Entity Object.
  $penn_entity = $variables['elements']['#penn_entity'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
