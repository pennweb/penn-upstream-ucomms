<?php

namespace Drupal\penn_shortcuts\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class DefaultShortcutsForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'default_shortcuts_form';
  }
  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['description_text'] = array(
      '#markup' => '<p>This button will set up our default shortcut links.</br>You can also use our Drush command: `drush add-sc`</p>'
    );
    $form['default_shortcuts'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Add shortcuts'),
    );
    return $form;
  }
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    \Drupal\penn_shortcuts\AddShortcuts::addShortcuts();
  }

}