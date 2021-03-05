<?php

namespace Drupal\penn_search\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element;

/**
 * Config form for the penn_search module.
 */
class PennSearchAdmin extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'penn_search_admin';
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('penn_search.settings');

    foreach (Element::children($form) as $variable) {
      $config->set($variable, $form_state->getValue($form[$variable]['#parents']));
    }
    $config->save();

    if (method_exists($this, '_submitForm')) {
      $this->_submitForm($form, $form_state);
    }

    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['penn_search.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['penn_search_cx'] = [
      '#type' => 'textfield',
      '#title' => t('Search Engine ID'),
      '#default_value' => $this->config('penn_search.settings')->get('penn_search_cx'),
      '#required' => TRUE,
    ];
    $form['penn_search_label'] = [
      '#type' => 'textfield',
      '#title' => t('Refinement Label'),
      '#default_value' => $this->config('penn_search.settings')->get('penn_search_label'),
      '#description' => t('Optional: If you provide a refinement label, the search results will have two tabs: one for "All of Penn", and one for the refined search.'),
      '#required' => FALSE,
    ];
    $form['search_pg_title'] = [
      '#type' => 'textfield',
      '#title' => t('Search Page Title'),
      '#default_value' => $this->config('penn_search.settings')->get('search_pg_title'),
      '#required' => TRUE,
    ];
    $form['search_pg_tagline'] = [
      '#type' => 'textfield',
      '#title' => t('Search Page Tagline'),
      '#default_value' => $this->config('penn_search.settings')->get('search_pg_tagline'),
      '#description' => t('Optional; tagline can be removed.'),
      '#required' => FALSE,
    ];
    $form['search_query_parameter'] = [
      '#type' => 'textfield',
      '#title' => t('Search Query Parameter'),
      '#default_value' => $this->config('penn_search.settings')->get('search_query_parameter'),
      '#description' => t('The default URL parameter, "terms", is fine for most sites. But you\'re able to customize it here if you need to.'),
      '#required' => TRUE,
    ];
    return parent::buildForm($form, $form_state);
  }

}
