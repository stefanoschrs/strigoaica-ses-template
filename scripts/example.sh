#!/bin/bash

curl \
  http://0.0.0.0:13987/send \
  -v \
  -X POST \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "templateId": "MyTemplate",
  "strategies": "ses-template",
  "data": {
    "to": "alejandro.rosalez@example.com",
    "payload": {
      "name": "Alejandro",
      "favoriteanimal": "zebra"
    }
  }
}
EOF
