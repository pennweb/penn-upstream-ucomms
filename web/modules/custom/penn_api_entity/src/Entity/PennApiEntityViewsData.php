<?php

namespace Drupal\penn_api_entity\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Penn API Entity entities.
 */
class PennApiEntityViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.
    return $data;
  }

}
