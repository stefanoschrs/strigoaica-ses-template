# [Strigoaica](https://github.com/strigoaica/strigoaica) - Amazon Simple Email Service (template) Strategy

## Configure
- Create a credentials file at ~/.aws/credentials on Mac/Linux or C:\Users\USERNAME\.aws\credentials on Windows
```
[your_profile]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

- Add your configuration to `strigoaica.yml`
```
ses-template:
  sourceEmail: string
  profile: string
  region: string
```

*ref: [https://aws.amazon.com/ses](https://aws.amazon.com/ses)*
