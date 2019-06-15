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

jshint -c $DIR/configs/jshit.conf.json $DIR/src