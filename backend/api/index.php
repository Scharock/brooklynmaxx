<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

define('MAX_FILESIZE_IN_MB', '20');

$counter = 0;
foreach ($_FILES as $file) {
    $filePath = $file['tmp_name'];

    if (validateFile($filePath)) {
        $counter++;
        move_uploaded_file($file['tmp_name'], '../images/' . basename($file['name']));
    }
}

header("HTTP/1.1 200 Ok");
echo $counter . ' image(s) are saved';

function validateFile($filePath)
{
    if (!isImage($filePath) || isFilesizeToBig($filePath)) {
        return false;
    }

    return true;
}

function isImage($filePath)
{
    return (exif_imagetype($filePath) == IMAGETYPE_JPEG || exif_imagetype($filePath) == IMAGETYPE_PNG || exif_imagetype($filePath) == IMAGETYPE_GIF);
}

function isFilesizeToBig($filePath)
{
    $filesizeInMB = filesize($filePath) / 1024 / 1024;

    return $filesizeInMB > MAX_FILESIZE_IN_MB;
}