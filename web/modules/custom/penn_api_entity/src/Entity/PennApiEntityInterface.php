<?php

namespace Drupal\penn_api_entity\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\RevisionLogInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Penn API Entity entities.
 *
 * @ingroup penn_api_entity
 */
interface PennApiEntityInterface extends ContentEntityInterface, RevisionLogInterface, EntityChangedInterface, EntityPublishedInterface, EntityOwnerInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Penn API Entity name.
   *
   * @return string
   *   Name of the Penn API Entity.
   */
  public function getName();

  /**
   * Sets the Penn API Entity name.
   *
   * @param string $name
   *   The Penn API Entity name.
   *
   * @return \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   *   The called Penn API Entity entity.
   */
  public function setName($name);

  /**
   * Gets the Penn API Entity creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Penn API Entity.
   */
  public function getCreatedTime();

  /**
   * Sets the Penn API Entity creation timestamp.
   *
   * @param int $timestamp
   *   The Penn API Entity creation timestamp.
   *
   * @return \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   *   The called Penn API Entity entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Gets the Penn API Entity revision creation timestamp.
   *
   * @return int
   *   The UNIX timestamp of when this revision was created.
   */
  public function getRevisionCreationTime();

  /**
   * Sets the Penn API Entity revision creation timestamp.
   *
   * @param int $timestamp
   *   The UNIX timestamp of when this revision was created.
   *
   * @return \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   *   The called Penn API Entity entity.
   */
  public function setRevisionCreationTime($timestamp);

  /**
   * Gets the Penn API Entity revision author.
   *
   * @return \Drupal\user\UserInterface
   *   The user entity for the revision author.
   */
  public function getRevisionUser();

  /**
   * Sets the Penn API Entity revision author.
   *
   * @param int $uid
   *   The user ID of the revision author.
   *
   * @return \Drupal\penn_api_entity\Entity\PennApiEntityInterface
   *   The called Penn API Entity entity.
   */
  public function setRevisionUserId($uid);

}
