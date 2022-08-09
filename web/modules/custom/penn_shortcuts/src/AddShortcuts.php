<?php

namespace Drupal\penn_shortcuts;

/**
 * A utility class containing our core "addShortcuts" function.
 */
class AddShortcuts {

  /**
   * A function that sets up our default shortcuts.
   * It can be called wherever we like (a form in the admin UI, a drush command, ...).
   * 
   * The function first removes any preexisting shortcuts in the default set, and
   * replaces them with the set of links we've decided should go in our Upstream sites.
   */
  public static function addShortcuts() {

    $shortcutSet = 'default';

    // These are the links we want in our default shortcuts:
    $shortcutLinks = array(
      ['shortcut_set' => $shortcutSet, 'title' => t('Add Entity'), 'weight' => 0, 'link' => 'internal:/admin/content/add-entity'],
      ['shortcut_set' => $shortcutSet, 'title' => t('Manage Entities'), 'weight' => 1, 'link' => 'internal:/admin/structure/penn-entity-management'],
      ['shortcut_set' => $shortcutSet, 'title' => t('Penn Entity Types'), 'weight' => 2, 'link' => 'internal:/admin/structure/penn_entity_type'],
      ['shortcut_set' => $shortcutSet, 'title' => t('Synchronize'), 'weight' => 3, 'link' => 'internal:/admin/config/development/configuration'],
      ['shortcut_set' => $shortcutSet, 'title' => t('Media'), 'weight' => 4, 'link' => 'internal:/admin/content/media']
    );

    $shortcutEntityTypeManger = \Drupal::entityTypeManager()->getStorage('shortcut');

    // First remove the old links from the set (prevents us from adding duplicates):
    $oldShortcuts = $shortcutEntityTypeManger->loadByProperties(array(
      'shortcut_set' => $shortcutSet
    ));
    $shortcutEntityTypeManger->delete($oldShortcuts);

    // Populate the default shortcut set with our desired links:
    foreach ($shortcutLinks as $link) {
      $shortcut = $shortcutEntityTypeManger->create($link);
      $shortcut->save();
    }

    \Drupal::messenger()->addStatus('The default shortcut set has been updated.');
  }

}