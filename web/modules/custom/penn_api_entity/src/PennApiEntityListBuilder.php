<?php

namespace Drupal\penn_api_entity;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;

/**
 * Defines a class to build a listing of Penn API Entity entities.
 *
 * @ingroup penn_api_entity
 */
class PennApiEntityListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Penn API Entity ID');
    $header['name'] = $this->t('Name');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var \Drupal\penn_api_entity\Entity\PennApiEntity $entity */
    $row['id'] = $entity->id();
    $row['name'] = Link::createFromRoute(
      $entity->label(),
      'entity.penn_api_entity.edit_form',
      ['penn_api_entity' => $entity->id()]
    );
    return $row + parent::buildRow($entity);
  }

}
