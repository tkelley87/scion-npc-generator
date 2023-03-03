variable "alb_scion_cert_arn" {}
variable "cidr" {}
variable "container_cpu" {
  description = "The number of cpu units used by the task"
  default     = 256
}

variable "container_environment" {
  description = "The container environmnent variables"
  type        = list(any)
}

variable "container_image" {}
variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
  default     = 512
}
variable "container_port" {
  description = "Container Port"
  default     = 80
}

variable "dns_name" {}
variable "ecs_cluster_id" {}
variable "ecs_sg_id" {}
variable "environment" {}
variable "health_check_path" {}
variable "hosted_zone_id" {}
variable "service_name" {
  default = "react-fe"
}
variable "private_subnets" {}
variable "region" {}
variable "scion_npc_gen_alb_arn" {}
variable "scion_npc_gen_alb_dns_name" {}
variable "scion_npc_gen_alb_hosted_zone_id" {}
variable "service_discovery_namespace_id" {}
variable "vpc_id" {}
