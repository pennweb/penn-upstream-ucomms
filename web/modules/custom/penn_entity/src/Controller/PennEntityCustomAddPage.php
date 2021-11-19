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
   * The list of which bundles we want to show on our custom 'Add Entity' page, with optional descriptions.
   */
  private $bundleWhitelist = [
    [
      'bundle' => 'accordion',
    ],
    [
      'bundle' => 'accordion',
    ],
    [
      'bundle' => 'aside_fact_card',
    ],
    [
      'bundle' => 'card_feat_initiative_card_group',
    ],
    [
      'bundle' => 'fact_list',
    ],
    [
      'bundle' => 'layout_faculty_grid',
    ],
    [
      'bundle' => 'hero_article_card_hero',
    ],
    [
      'bundle' => 'hero_full_width',
    ],
    [
      'bundle' => 'layout_a_z',
      // 'description' => 'See them in action in the <a style="display:inline-block" href="https://www.upenn.edu/penn-a-z">Penn A-Z</a>.',
    ],
    [
      'bundle' => 'layout_accordion_columns',
    ],
    [
      'bundle' => 'layout_callout',
    ],
    [
      'bundle' => 'layout_card_listing',
    ],
    [
      'bundle' => 'layout_card_slider',
    ],
    [
      'bundle' => 'layout_columns',
    ],
    [
      'bundle' => 'layout_contact_information',
    ],
    [
      'bundle' => 'layout_container',
    ],
    [
      'bundle' => 'layout_content_aside',
    ],
    [
      'bundle' => 'layout_content_gallery',
    ],
    [
      'bundle' => 'layout_content_spotlight',
    ],
    [
      'bundle' => 'layout_event_cards',
    ],
    [
      'bundle' => 'layout_fact_bars',
    ],
    [
      'bundle' => 'layout_facts',
    ],
    [
      'bundle' => 'layout_featured_story',
    ],
    [
      'bundle' => 'layout_grid',
    ],
    [
      'bundle' => 'layout_hero_listing',
    ],
    [
      'bundle' => 'layout_horizontal_links',
    ],
    [
      'bundle' => 'layout_image_slider',
    ],
    [
      'bundle' => 'layout_link_grid',
    ],
    [
      'bundle' => 'layout_link_list',
    ],
    [
      'bundle' => 'layout_listing_cards',
    ],
    [
      'bundle' => 'layout_offset_card_with_image',
    ],
    [
      'bundle' => 'layout_quote',
    ],
    [
      'bundle' => 'layout_quote_overlay',
    ],
    [
      'bundle' => 'layout_quote_slider',
    ],
    [
      'bundle' => 'layout_social_grid',
    ],
    [
      'bundle' => 'layout_split_content',
    ],
    [
      'bundle' => 'layout_student_spotlight',
    ],
    [
      'bundle' => 'layout_tabs',
    ],
    [
      'bundle' => 'links_quick_links_wide',
    ],
    [
      'bundle' => 'slider_penn_priorities',
    ],
    [
      'bundle' => 'video_inline',
    ],
    [
      'bundle' => 'video_inline_poster_controls',
    ],
    [
      'bundle' => 'video_modal',
    ],
    [
      'bundle' => 'video_vimeo',
    ],    
  ];

  /**
   * Returns a renderable array for our page.
   */
  public function content() {
    // Fetch a list of all Penn Entity bundles and their info (labels, etc). See API docs for "EntityTypeBundleInfo::getBundleInfo".
    $allEntities = \Drupal::service('entity_type.bundle.info')->getBundleInfo('penn_entity');

    // Sort the array of bundles alphabetically by label:
    uasort($allEntities, function ($a,$b) {
      return strcmp($a['label'], $b['label']);
    });

    // Create an unordered list of the bundles we've included in our whitelist:
    $list_items = '';
    foreach ($this->bundleWhitelist as $entity_type) {
      $bundle = $entity_type['bundle'];
      if (array_key_exists($bundle, $allEntities)) {
        $link = '<a href="/admin/structure/penn_entity/add/' . $bundle . '"><span class="label">' . $allEntities[$bundle]['label'] . '</span></a>';
        if (array_key_exists('description', $entity_type)) {
          $link .= '<div class="description">' . $entity_type['description'] . '</div>';
        }
        $list_items .= '<li class="clearfix">' . $link . '</li>';
      }
    }

    $build = [
      '#markup' => '<ul class="admin-list">' . $list_items . '</ul>',
    ];
    return $build;
  }

}
