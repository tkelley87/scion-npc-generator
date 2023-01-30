variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  default     = ["us-east-1a", "us-east-1b"] # ADD back in for HA => , "us-east-1c"
}

variable "cidr" {
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

# variable "container_image" {
#   description = "ECR Image to use"
#   default     = "339352267472.dkr.ecr.us-east-1.amazonaws.com/scion-npc-gen-client"
# }

# variable "container_port" {
#   description = "Container port"
# }

# variable "container_cpu" {
#   description = "The number of cpu units used by the task"
#   default     = 256
# }

# variable "container_memory" {
#   description = "The amount (in MiB) of memory used by the task"
#   default     = 512
# }

variable "environment" {
  default = "test"
}

variable "health_check_path" {
  description = "URL path to health endpoint"
  default     = "/health"
  type        = string
}

variable "name" {
  default = "scion-npc-gen"
}

variable "public_subnets" {
  description = "List of CIDRs for public subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.16.0/20", "10.0.48.0/20"] # ADD back in for HA => , "10.0.80.0/20"
}

variable "private_subnets" {
  description = "List of CIDRs for private subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["10.0.0.0/20", "10.0.32.0/20"] # ADD back in for HA => , "10.0.64.0/20"
}

variable "region" {
  default = "us-east-1"
}

# variable "service_desired_count" {
#   description = "Number of tasks running in parallel"
#   default     = 1
# }

variable "scion_npc_gen_alb_arn" {
  default = "arn:aws:elasticloadbalancing:us-east-1:339352267472:loadbalancer/app/scion-npc-gen-alb-test/5e6bcf65b99e8518"
}
