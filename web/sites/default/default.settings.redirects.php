<?php 

if (isset($_SERVER['REQUEST_URI'])){
  $request = rtrim(urldecode($_SERVER['REQUEST_URI']), '/');
  switch ($request) {
    case '/old-url':
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: /new-url');
      exit();
  }
}