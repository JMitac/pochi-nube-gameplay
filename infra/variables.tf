variable "subscription_id" {
  description = "ID de tu suscripción de Azure (az account show --query id -o tsv)."
  type        = string
}

variable "location" {
  description = "Región de Azure donde se crea todo."
  type        = string
  default     = "eastus2"
}

variable "project_name" {
  description = "Prefijo para nombrar los recursos."
  type        = string
  default     = "pochi-nube"
}

variable "container_image" {
  description = "Imagen del juego en GitHub Container Registry (debe ser pública)."
  type        = string
  default     = "ghcr.io/jmitac/pochi-nube-game"
}

variable "image_tag" {
  description = "Tag de la imagen. Cámbialo (por ejemplo v2) para que Azure despliegue una versión nueva."
  type        = string
  default     = "latest"
}

variable "budget_amount" {
  description = "Presupuesto mensual en USD para la alerta de costos."
  type        = number
  default     = 5
}

variable "alert_email" {
  description = "Correo que recibe la alerta cuando el gasto se acerca al presupuesto."
  type        = string
}
