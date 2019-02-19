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
    "from": "strigoaica@example.com",
    "to": "alejandro.rosalez@example.com"
  }
}
EOF
