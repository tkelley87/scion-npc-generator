variable "container_environment_variables" {
  description = "Container environment variables added to Fargate container definition"
}

// INJECTED AT BUILD TIME VARIABLES

variable "stack_name" {}
variable "docker_name" {}
variable "docker_version" {}
variable "region" {}
