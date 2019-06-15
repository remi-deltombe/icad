#!/bin/bash

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

SCRIPT_FILE=`realpath "$0"`
SCRIPT_DIR=`dirname $SCRIPT_FILE`


rm -R $SCRIPT_DIR/../../www/js/ICad
rm -R $SCRIPT_DIR/../../www/css/ICad
rm -R $SCRIPT_DIR/../../www/fonts
rm -R $SCRIPT_DIR/../../www/images