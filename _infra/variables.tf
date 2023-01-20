variable "region" {
  default = "us-east-1"
}

# variable "container_environment_variables" {
#   description = "Container environment variables added to Fargate container definition"
# }

variable "cidr" {
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of CIDRs for public subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.16.0/20", "10.0.48.0/20", "10.0.80.0/20"]
}

variable "private_subnets" {
  description = "List of CIDRs for private subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.0.0/20", "10.0.32.0/20", "10.0.64.0/20"]
}

// INJECTED AT BUILD TIME VARIABLES

# variable "stack_name" {}
# variable "docker_name" {}
# variable "docker_version" {}
