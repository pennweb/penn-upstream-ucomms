<?php

namespace Drupal\penn_entity\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;

/**
 * Provides an interface for defining Penn Entity entities.
 *
 * @ingroup penn_entity
 */
interface PennEntityInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Penn Entity name.
   *
   * @return string
   *   Name of the Penn Entity.
   */
  public function getName();

  /**
   * Sets the Penn Entity name.
   *
   * @param string $name
   *   The Penn Entity name.
   *
   * @return \Drupal\penn_entity\Entity\PennEntityInterface
   *   The called Penn Entity entity.
   */
  public function setName($name);

  /**
   * Gets the Penn Entity creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Penn Entity.
   */
  public function getCreatedTime();

  /**
   * Sets the Penn Entity creation timestamp.
   *
   * @param int $timestamp
   *   The Penn Entity creation timestamp.
   *
   * @return \Drupal\penn_entity\Entity\PennEntityInterface
   *   The called Penn Entity entity.
   */
  public function setCreatedTime($timestamp);

}
