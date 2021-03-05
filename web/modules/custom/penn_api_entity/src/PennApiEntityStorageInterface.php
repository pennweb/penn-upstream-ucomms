<?php

namespace Drupal\penn_api_entity;

use Drupal\Core\Entity\ContentEntityStorageInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\penn_api_entity\Entity\PennApiEntityInterface;

/**
 * Defines the storage handler class for Penn API Entity entities.
 *
 * This extends the base storage class, adding required special handling for
 * Penn API Entity entities.
 *
 * @ingroup penn_api_entity
 */
interface PennApiEntityStorageInterface extends ContentEntityStorageInterface {

  /**
   * Gets a list of Penn API Entity revision IDs for a specific Penn API Entity.
   *
   * @param \Drupal\penn_api_entity\Entity\PennApiEntityInterface $entity
   *   The Penn API Entity entity.
   *
   * @return int[]
   *   Penn API Entity revision IDs (in ascending order).
   */
  public function revisionIds(PennApiEntityInterface $entity);

  /**
   * Gets a list of revision IDs having a given user as Penn API Entity author.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The user entity.
   *
   * @return int[]
   *   Penn API Entity revision IDs (in ascending order).
   */
  public function userRevisionIds(AccountInterface $account);

  /**
   * Counts the number of revisions in the default language.
   *
   * @param \Drupal\penn_api_entity\Entity\PennApiEntityInterface $entity
   *   The Penn API Entity entity.
   *
   * @return int
   *   The number of revisions in the default language.
   */
  public function countDefaultLanguageRevisions(PennApiEntityInterface $entity);

  /**
   * Unsets the language for all Penn API Entity with the given language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   */
  public function clearRevisionsLanguage(LanguageInterface $language);

}
