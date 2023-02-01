resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "${var.name}-cluster-${var.environment}"
}

resource "aws_service_discovery_private_dns_namespace" "service" {
  name        = var.domain_name_internal
  description = "Domain for all of the services"
  vpc         = var.vpc_id
}