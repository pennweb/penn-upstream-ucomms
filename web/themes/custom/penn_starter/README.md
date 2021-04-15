# Penn Starter: A Customizable Subtheme

You can add custom CSS, change logos, and override templates here.

## Custom CSS
Custom CSS should go in `assets/dist/overrides.css`.

TODO: set up gulp

## To change the header logo:
Override the `masthead.html.twig` template:

1. Copy it from the parent theme: `/penn_global/templates/layouts/masthead.html.twig`
2. Paste it into the subtheme:  `/penn_starter/templates/layouts/masthead.html.twig`
3. Make your changes (you can insert a different SVG, change it to an image, ...)

*EDIT:* This didn't work as hoped, because two templates in penn_global (`header.html.twig` and `page.html.twig`) use twig includes that reference the `penn_global` theme. For example, in `header.html.twig`, it says:
```
{% include '@penn_global/layouts/masthead.html.twig' %}
```
Simply overriding that template in `penn_starter` doesn't work, because Twig includes don't behave the same way that Drupal's template hooks do.
Templates in subthemes will get pulled in by template hooks, but apparently not by Twig includes.

I had to copy and modify *all three templates* (masthead, header, and page) over to the subtheme in order to change the logo. It works, but doesn't seem ideal.

## To change the footer logo:
Modify the `/penn_starter/assets/img/UPenn-logo.svg` file; and/or override the `footer.html.twig` template.

To override the template:

1. Copy it from the parent theme: `/penn_global/templates/layouts/footer.html.twig`
2. Paste it into the subtheme:  `/penn_starter/templates/layouts/footer.html.twig`
3. Make your changes.
