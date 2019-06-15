#!/bin/bash

# --------------------------------------------------------
# Welcome
clear

# --------------------------------------------------------
# Variables declaration

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

SCRIPT_FILE=`realpath "$0"`
SCRIPT_DIR=`dirname $SCRIPT_FILE`
DIR=$SCRIPT_DIR/../../..

jsdoc -r $DIR/src -d $DIR/docs/www