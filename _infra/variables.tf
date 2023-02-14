variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  default     = ["us-east-1a", "us-east-1b"] # ADD back in for HA => , "us-east-1c"
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
  default = "us-east-1"
}

# TODO Need to store these vars in secrets.
variable "hosted_zone_id" {
  default = "Z01410081ZF8HDJEJP76I"
}

variable "scion_npc_gen_alb_arn" {
  description = "ALB arn"
  default     = "arn:aws:elasticloadbalancing:us-east-1:339352267472:loadbalancer/app/scion-npc-gen-alb-test/5e6bcf65b99e8518"
}

variable "alb_scion_cert_arn" {
  description = "ACM Certificate arn"
  default     = "arn:aws:acm:us-east-1:339352267472:certificate/8477bad7-9000-45cf-a477-004eb2917328"
}
