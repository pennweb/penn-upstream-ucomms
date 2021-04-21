# Penn Starter: A Customizable Subtheme

You can add custom CSS, change logos, and override templates here.

## Custom CSS

- In terminal, navigate to this folder and run `npm install`.
- Add your desired CSS to `assets/scss/overrides.scss`
- Run `gulp build` to generate the final CSS file.

## To change the header logo:
Modify this file:  `/penn_starter/templates/layouts/masthead.html.twig`
What you do is up to you; you can insert a different SVG, change it to an image, ...

## To change the footer logo:
Modify the `/penn_starter/assets/img/UPenn-logo.svg` file; and/or override the `footer.html.twig` template.

To override the template:

1. Copy it from the parent theme: `/penn_global/templates/layouts/footer.html.twig`
2. Paste it into the subtheme:  `/penn_starter/templates/layouts/footer.html.twig`
3. Make your changes.
