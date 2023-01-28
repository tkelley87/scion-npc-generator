

variable "health_check_path" {
  description = "URL path to health endpoint"
  default     = "/health"
  type        = string
}

variable "path_pattern" {
  description = "ALB path pattern to route requests to service"
  type        = string
}

variable "container_cpu" {
  description = "The number of cpu units used by the task"
  default     = 256
}
variable "container_image" {
  description = "ECR Image to use"
  default     = "339352267472.dkr.ecr.us-east-1.amazonaws.com/scion-npc-gen-client"
}
variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
  default     = 512
}
variable "container_port" {
  description = "Container Port"
  default     = 80
}
variable "ecs_cluster_id" {}
variable "environment" {}
variable "name" {}
varaible "private_subnets" {}
variable "scion_npc_gen_alb_arn" {}
variable "vpc_id" {}
