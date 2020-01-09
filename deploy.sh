#!/bin/bash
ng build --outputPath=./dist
aws s3 cp ./dist s3://hlprfrontend --recursive