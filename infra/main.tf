locals {
  tags = {
    project = var.project_name
    managed = "terraform"
  }
}

# Agrupa todo lo del juego: borrar este grupo borra todo y deja de cobrar.
resource "azurerm_resource_group" "game" {
  name     = "rg-${var.project_name}"
  location = var.location
  tags     = local.tags
}

# Entorno de Container Apps en el plan de consumo (sin Log Analytics, para no generar costos de logs).
resource "azurerm_container_app_environment" "game" {
  name                = "env-${var.project_name}"
  location            = azurerm_resource_group.game.location
  resource_group_name = azurerm_resource_group.game.name
  tags                = local.tags
}

resource "azurerm_container_app" "game" {
  name                         = "${var.project_name}-game"
  container_app_environment_id = azurerm_container_app_environment.game.id
  resource_group_name          = azurerm_resource_group.game.name
  revision_mode                = "Single"
  tags                         = local.tags

  template {
    # 0 réplicas cuando nadie juega (no cobra) y como máximo 1:
    # las salas viven en la memoria del proceso, con 2 réplicas los jugadores no se verían.
    min_replicas = 0
    max_replicas = 1

    container {
      name   = "game"
      image  = "${var.container_image}:${var.image_tag}"
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name  = "PORT"
        value = "2567"
      }
    }
  }

  # HTTPS público. Los WebSockets de Colyseus funcionan sobre este mismo ingress.
  ingress {
    external_enabled = true
    target_port      = 2567
    transport        = "auto"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }
}

# Alerta por correo al 80 % y al 100 % del presupuesto mensual.
resource "azurerm_consumption_budget_resource_group" "game" {
  name              = "budget-${var.project_name}"
  resource_group_id = azurerm_resource_group.game.id
  amount            = var.budget_amount
  time_grain        = "Monthly"

  time_period {
    start_date = formatdate("YYYY-MM-01'T'00:00:00Z", timestamp())
  }

  notification {
    enabled        = true
    threshold      = 80
    operator       = "GreaterThanOrEqualTo"
    contact_emails = [var.alert_email]
  }

  notification {
    enabled        = true
    threshold      = 100
    operator       = "GreaterThanOrEqualTo"
    contact_emails = [var.alert_email]
  }

  lifecycle {
    # La fecha de inicio se fija al crearlo; sin esto Terraform la cambiaría en cada apply.
    ignore_changes = [time_period]
  }
}
