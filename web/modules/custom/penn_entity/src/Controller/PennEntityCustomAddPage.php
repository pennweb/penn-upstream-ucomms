<?php

namespace Drupal\penn_entity\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Custom 'add entity' page that only shows a curated list of entities to choose from.
 *
 * @ingroup penn_entity
 */
class PennEntityCustomAddPage extends ControllerBase {

  /**
   * The list of which bundles we want to show on our custom 'Add Entity' page.
   */
  private $bundleWhitelist = [
    'accordion',
    'aside_fact_card',
    'card_feat_initiative_card_group',
    'fact_list',
    'hero_article_card_hero',
    'layout_a_z',
    'layout_accordion_columns',
    'layout_callout',
    'layout_card_listing',
    'layout_card_slider',
    'layout_columns',
    'layout_contact_information',
    'layout_container',
    'layout_content_aside',
    'layout_content_gallery',
    'layout_content_spotlight',
    'layout_fact_bars',
    'layout_facts',
    'layout_featured_story',
    'layout_grid',
    'layout_hero_listing',
    'layout_horizontal_links',
    'layout_image_slider',
    'layout_link_grid',
    'layout_link_list',
    'layout_listing_cards',
    'layout_quote',
    'layout_quote_overlay',
    'layout_quote_slider',
    'layout_social_grid',
    'layout_split_content',
    'layout_student_spotlight',
    'layout_tabs',
    'links_quick_links_wide',
    'slider_penn_priorities',
    'video_inline',
    'video_inline_poster_controls',
    'video_modal',
  ];

  /**
   * Returns a renderable array for our page.
   */
  public function content() {
    // Fetch a list of all Penn Entity bundles and their info (labels, etc). See API docs for "EntityTypeBundleInfo::getBundleInfo".
    $entities = \Drupal::service('entity_type.bundle.info')->getBundleInfo('penn_entity');

    // Sort the array of bundles alphabetically by label:
    uasort($entities, function ($a,$b) {
      return strcmp($a['label'], $b['label']);
    });

    // Create an unordered list of the bundles we've included in our whitelist:
    $list_items = '';
    foreach ($entities as $bundle => $contents) {
      if (in_array($bundle, $this->bundleWhitelist)) {
        $link = '<a href="/admin/structure/penn_entity/add/' . $bundle . '"><span class="label">' . $contents['label'] . '</span></a>';
        $list_items .= '<li class="clearfix">' . $link . '</li>';
      }
    }

    $build = [
      '#markup' => '<ul class="admin-list">' . $list_items . '</ul>',
    ];
    return $build;
  }

}
