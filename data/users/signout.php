<?php
//data/users/signout.php
header("Content-Type:application/json");
session_start();
session_unset();
session_destroy();