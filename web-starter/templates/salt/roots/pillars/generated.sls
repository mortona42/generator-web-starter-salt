{% set mysql_base = salt['pillar.get']('mysql:mysql_version', 'mysql') %}
{% set php_base = salt['pillar.get']('php:ng:php_version', 'php') %}
{% set mysql_password = salt['pillar.get']('php:ng:php_version', 'php') %}

node:
  version: 4.4.1
  install_from_binary: True
  # Available versions can be found on nodejs.org/dist/
  # checksums are listed in the file SHASUMS256.txt in the respective version’s directory.
  # Package name to look for is nodejs-version-linux-x64.tar.gz
  checksum: f0a53527f52dbcab3b98921a6cfe8613e5fe26fb796624988f6d615c30305a95

java: java-1.8.0-openjdk
{{mysql_base}}: <% mysql_base %>
{{mysql_password}}: <% mysql_password %>
{{php_base}}: <% php_base %>

mysql:
  mysql_version: {{mysql_base}}
  database:
    - web
  user:
    web:
      password: {{mysql_password}}
      host: '%'
      databases:
        - database: web
          grants: ['all privileges']

php:
  ng:
    php_version: {{php_base}}

drush:
  version: '8.x'
