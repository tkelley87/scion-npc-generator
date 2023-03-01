variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  default     = ["us-west-2a", "us-west-2b"] # ADD back in for HA => , "us-east-1c"
}

variable "cidr" {
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "domain_name_internal" {
  default = "sng.net"
}

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
  default = "us-west-2"
}
