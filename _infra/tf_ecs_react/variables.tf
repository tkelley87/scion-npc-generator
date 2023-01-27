

variable "health_check_path" {
  description = "URL path to health endpoint"
  default     = "/health"
  type        = string
}

variable "path_pattern" {
  description = "ALB path pattern to route requests to service"
  type        = string
}

variable "aws_alb_target_group_arn" {}
variable "container_port" {
  description = "Container Port"
  default     = 80
}
variable "ecs_cluster_id" {}
variable "environment" {}
variable "name" {}
variable "vpc_id" {}
