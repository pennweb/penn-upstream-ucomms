<?php

namespace Drupal\penn_shortcuts\Commands;

use Drush\Commands\DrushCommands;

/**
 * A drush command file.
 * https://www.droptica.com/blog/creating-custom-drush-9-commands-drupal-8/
 *
 * @package Drupal\penn_shortcuts\Commands
 */
class ShortcutDrushCommands extends DrushCommands {

  /**
   * Drush command that adds our shortcuts.
   *
   * @command penn_shortcuts:add-shortcuts
   * @aliases add-shortcuts add-sc
   */
  public function addShortcuts() {
    \Drupal\penn_shortcuts\AddShortcuts::addShortcuts();
  }
  
}