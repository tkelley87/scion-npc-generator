variable "container_cpu" {
  description = "The number of cpu units used by the task"
  default     = 256
}

variable "container_environment" {
  description = "The container environmnent variables"
  type        = list(any)
}

# TODO Move this var to secrets
variable "container_image" {
  description = "ECR Image to use"
  default     = "339352267472.dkr.ecr.us-east-1.amazonaws.com/scion-npc-gen-api"
}
variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
  default     = 512
}
variable "container_port" {
  description = "Container Port"
  default     = 5000
}

variable "cidr" {}
variable "ecs_cluster_id" {}
variable "ecs_sg_id" {}
variable "environment" {}
variable "health_check_path" {}
variable "service_name" {
  default = "flask-be"
}
variable "private_subnets" {}
variable "region" {}
variable "scion_npc_gen_alb_arn" {}
variable "service_discovery_namespace_id" {}
variable "vpc_id" {}
variable "container_secret_environment_variables" {
  description = "Container secret environment variables added to Fargate container definition"
}
