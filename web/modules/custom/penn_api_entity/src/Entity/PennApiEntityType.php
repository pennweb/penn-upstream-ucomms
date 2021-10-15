<?php

namespace Drupal\penn_api_entity\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBundleBase;

/**
 * Defines the Penn API Entity type entity.
 *
 * @ConfigEntityType(
 *   id = "penn_api_entity_type",
 *   label = @Translation("Penn API Entity type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\penn_api_entity\PennApiEntityTypeListBuilder",
 *     "form" = {
 *       "add" = "Drupal\penn_api_entity\Form\PennApiEntityTypeForm",
 *       "edit" = "Drupal\penn_api_entity\Form\PennApiEntityTypeForm",
 *       "delete" = "Drupal\penn_api_entity\Form\PennApiEntityTypeDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\penn_api_entity\PennApiEntityTypeHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "penn_api_entity_type",
 *   admin_permission = "administer site configuration",
 *   bundle_of = "penn_api_entity",
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
 *     "canonical" = "/admin/structure/penn_api_entity_type/{penn_api_entity_type}",
 *     "add-form" = "/admin/structure/penn_api_entity_type/add",
 *     "edit-form" = "/admin/structure/penn_api_entity_type/{penn_api_entity_type}/edit",
 *     "delete-form" = "/admin/structure/penn_api_entity_type/{penn_api_entity_type}/delete",
 *     "collection" = "/admin/structure/penn_api_entity_type"
 *   }
 * )
 */
class PennApiEntityType extends ConfigEntityBundleBase implements PennApiEntityTypeInterface {

  /**
   * The Penn API Entity type ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Penn API Entity type label.
   *
   * @var string
   */
  protected $label;

}
