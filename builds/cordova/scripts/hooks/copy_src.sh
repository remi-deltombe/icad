#!/bin/bash

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

SCRIPT_FILE=`realpath "$0"`
SCRIPT_DIR=`dirname $SCRIPT_FILE`
DIR=$SCRIPT_DIR/../../../..


cp -R $DIR/builds/javascript $SCRIPT_DIR/../../www/js/ICad
cp -R $DIR/builds/css $SCRIPT_DIR/../../www/css/ICad
cp -R $DIR/builds/fonts $SCRIPT_DIR/../../www/fonts
cp -R $DIR/builds/images $SCRIPT_DIR/../../www/images