# Coolify + Euphoria-v2 Deployment

**Last updated:** 2026-09-19

## Server
- **Hostname:** euphoria
- **Public IP:** 141.179.5.69
- **OS:** Ubuntu 24.04.4 LTS
- **Docker:** 29.5.2

## Coolify
- **Version:** 4.3.23
- **URL:** http://141.179.5.69:8000
- **Data:** /data/coolify/source/
- **Env:** /data/coolify/source/.env

## Existing Docker Services
- temporal (port 7233)
- temporal-ui (port 8080)
- temporal-elasticsearch
- temporal-postgresql
- postiz (port 4007)

## GRC Ecosystem Deployments
| Version | Source File | Status |
|---------|-------------|--------|
| v1 | GRC Ecosystem v1.html | Pending |
| v2 | GRC Ecosystem v2.html | Pending |
| v3 | GRC Ecosystem v3.html | Pending |
| v4 | GRC Ecosystem.html | Pending |

## Security
- Passwordless sudo: /etc/sudoers.d/euphoria
- Coolify .env contains secrets — back up externally
- SSL not yet configured for Coolify dashboard
