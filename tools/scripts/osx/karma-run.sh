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

gulp --gulpfile $DIR/configs/gulpfile.js tdd
