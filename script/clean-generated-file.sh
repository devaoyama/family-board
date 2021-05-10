#!/usr/bin/env bash

find . -type f ! -path  '*node_modules*' ! -path '*.git*' | while read FILE
do
  # ファイルパスを表示
  if [[ $FILE =~ "__generated__" ]]
  then
    rm ${FILE}
    echo "Removed ${FILE}"
  fi
done
