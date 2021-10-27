<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

# Provide universal absolute path to the installation.
$settings['simplesamlphp_dir'] = $_ENV['HOME'] .'/code/private/simplesamlphp';

/**
 * If there is a site settings file, then include it
 */
$site_settings = __DIR__ . "/settings.site.php";
if (file_exists($site_settings)) {
  include $site_settings;
}

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}
/**
 * If there is a redis file, then include it
 */
$redis_settings = __DIR__ . "/settings.redis.php";
if (file_exists($redis_settings)) {
  include $redis_settings;
}

/**
 * If there is a redirects file, then include it
 */
$redirects = __DIR__ . "/settings.redirects.php";
if (file_exists($redirects)) {
  include $redirects;
}
