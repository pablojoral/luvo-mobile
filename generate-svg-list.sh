#!/usr/bin/env bash
# Generates a TypeScript module that imports all SVGs in a folder
# and exports them as a typed object.
# Usage: ./generate-svg-list.sh ./src/icons > ./src/icons/images.ts

set -e

FOLDER="${1:-.}"  # Default to current folder if none passed

# Header
echo "import type { SvgProps } from 'react-native-svg';"
echo

# Loop over all .svg files in the given folder
# shellcheck disable=SC2045
for FILE in $(ls "$FOLDER"/*.svg 2>/dev/null | sort); do
  BASENAME=$(basename "$FILE")                # e.g. laundry-image-small.svg
  NAME_NO_EXT="${BASENAME%.svg}"              # e.g. laundry-image-small
  # Convert kebab case to PascalCase for import variable
  IMPORT_NAME=$(echo "$NAME_NO_EXT" | sed -E 's/(^|-)([a-z])/\U\2/g')
  echo "import $IMPORT_NAME from './$BASENAME';"
done

echo
echo "export const images = {"

# Map each kebab key to PascalCase variable
for FILE in $(ls "$FOLDER"/*.svg 2>/dev/null | sort); do
  BASENAME=$(basename "$FILE")
  NAME_NO_EXT="${BASENAME%.svg}"
  IMPORT_NAME=$(echo "$NAME_NO_EXT" | sed -E 's/(^|-)([a-z])/\U\2/g')
  echo "  '$NAME_NO_EXT': $IMPORT_NAME,"
done

echo "} as const;"
echo
echo "export type ImageName = keyof typeof images;"
echo "export type ImageComponent = React.FC<SvgProps>;"
