# Infraestructura en Azure (Terraform)

Crea todo lo necesario para que el juego corra en **Azure Container Apps** (plan de consumo):

| Recurso | Para qué |
| --- | --- |
| `rg-pochi-nube` | Grupo de recursos que agrupa todo |
| `env-pochi-nube` | Entorno de Container Apps |
| `pochi-nube-game` | El juego: 0.25 vCPU, 0.5 GiB, de 0 a 1 réplica, HTTPS público |
| `budget-pochi-nube` | Alerta por correo al 80 % y 100 % de $5 al mes |

## Requisitos

- [Terraform](https://developer.hashicorp.com/terraform/install) 1.6 o superior (`winget install Hashicorp.Terraform`)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) con la sesión iniciada: `az login`
- La imagen `ghcr.io/jmitac/pochi-nube-game` publicada y **pública** en GitHub

## Uso

```powershell
cd infra
copy terraform.tfvars.example terraform.tfvars   # y completa subscription_id y alert_email
terraform init
terraform plan
terraform apply
```

Al terminar muestra `game_url`: ábrela y a jugar.

Tu `subscription_id` lo obtienes con:

```powershell
az account show --query id -o tsv
```

## Publicar una versión nueva del juego

Terraform no se entera si vuelves a subir la imagen con el mismo tag `latest`. Usa un tag nuevo:

```powershell
docker build -t ghcr.io/jmitac/pochi-nube-game:v2 .
docker push ghcr.io/jmitac/pochi-nube-game:v2
cd infra
terraform apply -var="image_tag=v2"
```

## Borrar todo (deja de cobrar)

```powershell
terraform destroy
```

## Notas

- El archivo de estado (`terraform.tfstate`) queda en tu PC. No lo borres ni lo subas a git: ahí Terraform recuerda qué creó.
- No se crea Log Analytics para no pagar por logs. Si necesitas ver logs, usa `az containerapp logs show -n pochi-nube-game -g rg-pochi-nube --follow`.
