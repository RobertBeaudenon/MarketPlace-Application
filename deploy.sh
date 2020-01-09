#!/bin/bash
ng build 
aws s3 cp ./dist s3://hlprfrontend --recursive