#!/bin/bash

# Drop this script in the directory of your input file, or
# Add the absolute path to the variable.


# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install it."
    exit
fi

# IMPORTANT CHANGE input_file & json_key
# FOR SCRIPT TO WORK!
input_file="~~~~ CHANGE JSON FILE NAME HERE ~~~~"
json_key="~~~ ADD JSON KEY HERE ~~~"

output_file="./transformed.json"
temp_file="./temp.json"

# Copy input to temp file
cp $input_file $temp_file

# Get a list of all paths in the JSON that lead to an "Innate Power" key.
paths=$(jq "path(recurse | select(has(\"${json_key}\"))?) | join(\".\")" $temp_file)

# Loop through each path and update the value at that path to be an array.
while read -r path; do
    constructed_filter=".${path}.\"$json_key\" = [.${path}.\"$json_key\"]"
    jq "$constructed_filter" $temp_file > $output_file
    cp $output_file $temp_file
done <<< "$paths"

# Cleanup
rm $temp_file && sleep 1

# Renaming & Goodbye
mv $input_file $input_file.bak && mv $output_file $input_file
echo "Thanks for coming by!"