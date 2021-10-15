<?php

namespace Drupal\penn_entity\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityPublishedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Penn Entity entity.
 *
 * @ingroup penn_entity
 *
 * @ContentEntityType(
 *   id = "penn_entity",
 *   label = @Translation("Penn Entity"),
 *   bundle_label = @Translation("Penn Entity type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\penn_entity\PennEntityListBuilder",
 *     "views_data" = "Drupal\penn_entity\Entity\PennEntityViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\penn_entity\Form\PennEntityForm",
 *       "add" = "Drupal\penn_entity\Form\PennEntityForm",
 *       "edit" = "Drupal\penn_entity\Form\PennEntityForm",
 *       "delete" = "Drupal\penn_entity\Form\PennEntityDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\penn_entity\PennEntityHtmlRouteProvider",
 *     },
 *     "access" = "Drupal\penn_entity\PennEntityAccessControlHandler",
 *   },
 *   base_table = "penn_entity",
 *   translatable = FALSE,
 *   admin_permission = "administer penn entity entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "bundle" = "type",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *     "published" = "status",
 *   },
 *   config_export = {
 *     "id",
 *     "label",
 *   },
 *   links = {
 *     "canonical" = "/penn_entity/{penn_entity}",
 *     "add-page" = "/admin/structure/penn_entity/add",
 *     "add-form" = "/admin/structure/penn_entity/add/{penn_entity_type}",
 *     "edit-form" = "/admin/structure/penn_entity/{penn_entity}/edit",
 *     "delete-form" = "/admin/structure/penn_entity/{penn_entity}/delete",
 *     "collection" = "/admin/structure/penn_entity",
 *   },
 *   revision_metadata_keys = {
 *     "revision_user" = "revision_user",
 *     "revision_created" = "revision_created",
 *     "revision_log_message" = "revision_log_message",
 *   },
 *   bundle_entity_type = "penn_entity_type",
 *   field_ui_base_route = "entity.penn_entity_type.edit_form"
 * )
 */
class PennEntity extends ContentEntityBase implements PennEntityInterface {

  use EntityChangedTrait;
  use EntityPublishedTrait;

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // Add the published field.
    $fields += static::publishedBaseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Entity Name'))
      ->setDescription(t('Used for content management. Choose a descriptive name. Example: "Arts & Culture > Accordion - Culturual Institutions"'))
      ->setSettings([
        'max_length' => 255,
        'text_processing' => 0,
      ])
      // ->setDefaultValue('Penn Entity')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['status']->setDescription(t('A boolean indicating whether the Penn Entity is published.'))
      ->setDefaultValue(TRUE)
      ->setDisplayOptions('form', [
        // 'type' => 'boolean_checkbox',
        'region' => 'hidden',
        'weight' => -3,
      ]);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
