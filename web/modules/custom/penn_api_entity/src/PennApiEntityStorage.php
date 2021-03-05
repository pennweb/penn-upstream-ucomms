<?php

namespace Drupal\penn_api_entity;

use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
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
class PennApiEntityStorage extends SqlContentEntityStorage implements PennApiEntityStorageInterface {

  /**
   * {@inheritdoc}
   */
  public function revisionIds(PennApiEntityInterface $entity) {
    return $this->database->query(
      'SELECT vid FROM {penn_api_entity_revision} WHERE id=:id ORDER BY vid',
      [':id' => $entity->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function userRevisionIds(AccountInterface $account) {
    return $this->database->query(
      'SELECT vid FROM {penn_api_entity_field_revision} WHERE uid = :uid ORDER BY vid',
      [':uid' => $account->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function countDefaultLanguageRevisions(PennApiEntityInterface $entity) {
    return $this->database->query('SELECT COUNT(*) FROM {penn_api_entity_field_revision} WHERE id = :id AND default_langcode = 1', [':id' => $entity->id()])
      ->fetchField();
  }

  /**
   * {@inheritdoc}
   */
  public function clearRevisionsLanguage(LanguageInterface $language) {
    return $this->database->update('penn_api_entity_revision')
      ->fields(['langcode' => LanguageInterface::LANGCODE_NOT_SPECIFIED])
      ->condition('langcode', $language->getId())
      ->execute();
  }

}
