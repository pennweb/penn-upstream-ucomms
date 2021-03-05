<?php

namespace Drupal\penn_entity;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Penn Entity entity.
 *
 * @see \Drupal\penn_entity\Entity\PennEntity.
 */
class PennEntityAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\penn_entity\Entity\PennEntityInterface $entity */

    $route_match = \Drupal::routematch();
    $route_name = $route_match->getRouteName();

    switch ($operation) {

      case 'view':

        if($route_name == 'entity.penn_entity.canonical') {
          return AccessResult::allowedIfHasPermission($account, 'view individual penn entity entities');
        }        

        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished penn entity entities');
        }

        return AccessResult::allowedIfHasPermission($account, 'view published penn entity entities');

      case 'update':

        return AccessResult::allowedIfHasPermission($account, 'edit penn entity entities');

      case 'delete':

        return AccessResult::allowedIfHasPermission($account, 'delete penn entity entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add penn entity entities');
  }


}
