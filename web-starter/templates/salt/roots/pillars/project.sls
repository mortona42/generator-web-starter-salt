# Extra packages
extra_packages:
  - gcc
  - gcc-c++

## Define custom VCL for project in config/salt_templates/varnish/default.vcl, backends.vcl, secret, etc.
#varnish:
#  vcl: salt://salt_templates/varnish/

# Custom Solr config files - place in config/salt_templates/solr-conf
#solr:
#  conf: salt://salt_templates/solr-conf

# Custom nginx server variables
#nginx:
#  server:
#    config:
#      http:
#        sendfile: 'off'

# Define nginx template
include:
  - nginx.<%= platform %>
  
# To override or add php settings, uncomment/add values below
#php:
#  ng:
#    cli:
#      ini:
#        settings:
#          PHP:
#            memory_limit: 256M
