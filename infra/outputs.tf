output "game_url" {
  description = "Abre esta URL para jugar."
  value       = "https://${azurerm_container_app.game.ingress[0].fqdn}"
}

output "resource_group" {
  description = "Grupo de recursos creado."
  value       = azurerm_resource_group.game.name
}
