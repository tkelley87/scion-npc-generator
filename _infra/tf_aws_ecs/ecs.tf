resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "${var.name}-cluster-${var.environment}"
}

resource "aws_ecs_cluster_capacity_providers" "scion-npc-gen" {
  cluster_name = aws_ecs_cluster.scion-npc-gen.name

  capacity_providers = ["FARGATE_SPOT", "FARGATE"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
  }
}

resource "aws_service_discovery_private_dns_namespace" "service" {
  name        = var.domain_name_internal
  description = "Domain for all of the services"
  vpc         = var.vpc_id
}
