<?php

namespace Drupal\penn_entity\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBundleBase;

/**
 * Defines the Penn Entity type entity.
 *
 * @ConfigEntityType(
 *   id = "penn_entity_type",
 *   label = @Translation("Penn Entity type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\penn_entity\PennEntityTypeListBuilder",
 *     "form" = {
 *       "add" = "Drupal\penn_entity\Form\PennEntityTypeForm",
 *       "edit" = "Drupal\penn_entity\Form\PennEntityTypeForm",
 *       "delete" = "Drupal\penn_entity\Form\PennEntityTypeDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\penn_entity\PennEntityTypeHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "penn_entity_type",
 *   admin_permission = "administer site configuration",
 *   bundle_of = "penn_entity",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   config_export = {
 *     "id",
 *     "label",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/penn_entity_type/{penn_entity_type}",
 *     "add-form" = "/admin/structure/penn_entity_type/add",
 *     "edit-form" = "/admin/structure/penn_entity_type/{penn_entity_type}/edit",
 *     "delete-form" = "/admin/structure/penn_entity_type/{penn_entity_type}/delete",
 *     "collection" = "/admin/structure/penn_entity_type"
 *   }
 * )
 */
class PennEntityType extends ConfigEntityBundleBase implements PennEntityTypeInterface {

  /**
   * The Penn Entity type ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Penn Entity type label.
   *
   * @var string
   */
  protected $label;

}
