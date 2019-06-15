#!/bin/bash

BASEDIR=$(dirname "$0")

node --max-old-space-size=8192 $BASEDIR/../src/index.js "./../samples/config.json"